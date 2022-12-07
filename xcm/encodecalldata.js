const Web3 = require("web3");

const web3 = new Web3(process.env.WEB3_PROVIDER);

const data = web3.eth.abi.encodeFunctionCall({
    name: 'increment',    type: 'function'
   });

console.log(web3);