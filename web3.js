import _ from 'lodash';
import Web3 from "web3";
import fs from 'fs';

export const web3Ins = new Web3();
web3Ins.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

export const ContractJson = JSON.parse(fs.readFileSync('./contracts/build/contracts/EventContract.json', 'utf-8'))
export const ContractIns = new web3Ins.eth.Contract(ContractJson.abi);

const keys = JSON.parse(fs.readFileSync('./contracts/keys.json'))
const addrs = (await web3Ins.eth.getAccounts());
const privKey = new Buffer.from(
    keys.addresses[addrs[0].toLocaleLowerCase()].secretKey.data, 'utf-8'
).toString('Hex')


export const deploy = async () => {
    const deployTx = ContractIns.deploy({
        data : ContractJson.bytecode,
    })

    const createTransaction = await web3Ins.eth.accounts.signTransaction({
        from    : `${addrs[0]}`,
        data    : deployTx.encodeABI(),
        gas     : await deployTx.estimateGas(),
        gasPrice: '0x1'
    },
    `${privKey}`
    );

    const createReceipt = await web3Ins.eth.sendSignedTransaction(createTransaction.rawTransaction);
    ContractIns.options.address = createReceipt.contractAddress;

    fs.writeFileSync('./addr.json',JSON.stringify({contractAddress: ContractIns.options.address}, null, 2) )
    return createReceipt;
}

export const callClick = async (num, ind) => {
    if(ContractIns.options.address === undefined){return undefined;}
    ContractIns.methods.click(num).send({
        from: `${addrs[ind]}`,
        gas: await ContractIns.methods.click(num).estimateGas(),
        gasPrice: `0x1`   
    })   
}

export const subscribeCall = web3Ins.eth.subscribe(
    'logs', 
    {address:ContractIns.options.address},
    (err, logs) => {
        if(err) {console.log(err); return;}
        console.log(logs);
    }
)