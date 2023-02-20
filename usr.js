import { callClick, ContractIns } from "./web3.js";
import Web3 from "web3";
import fs from 'fs'
import _ from 'lodash'


const run = async () =>{
    const contractAddr = _.get(JSON.parse(fs.readFileSync('./addr.json')), 'contractAddress')

    ContractIns.options.address = contractAddr;
    
    const num = process.argv[2] ?? Number.parseInt(Math.random()*100)
    const ind = process.argv[3] ?? Number.parseInt(Math.random()*100) % 10
    
    await callClick(num, ind)
    process.exit();
}

run();



