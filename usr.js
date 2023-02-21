import { callClick, ContractIns } from "./web3.js";
import Web3 from "web3";
import fs from 'fs'
import _ from 'lodash'

const RUN_ = 1
const GET_ = 2

const run = async () =>{
    const contractAddr = _.get(JSON.parse(fs.readFileSync('./addr.json')), 'contractAddress')

    ContractIns.options.address = contractAddr;
    
    const num = process.argv[3] ?? Number.parseInt(Math.random()*100)
    const ind = process.argv[4] ?? Number.parseInt(Math.random()*100) % 10
    
    console.log(num, ind);

    await callClick(num, ind)
    process.exit();
}

const getNum = async () => {
    const contractAddr = _.get(JSON.parse(fs.readFileSync('./addr.json')), 'contractAddress')

    ContractIns.options.address = contractAddr;

    const ret = await ContractIns.methods.getNum().call();
    console.log(ret);
    process.exit();
}

if(process.argv[2] == RUN_) run();
else if(process.argv[2] == GET_) getNum()



