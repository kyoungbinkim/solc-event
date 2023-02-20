import readline from "readline";
import {
    deploy,
    subscribeCall,
    web3Ins,
    callClick
} from "./web3.js";

await deploy();

var subscribe = web3Ins.eth.subscribe('logs', (err, log) => {
    if(err) {console.log(err); return;}

    console.log("subscribe : ", log)
})


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("line", function (line) {
    console.log(line);
    rl.close();
}).on("close", function () {
    process.exit();
});

subscribe.unsubscribe();
