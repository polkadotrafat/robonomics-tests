const express = require('express');
const path = require('path');
const { ApiPromise, WsProvider } = require("@polkadot/api");
const { stringToHex, u8aToString, hexToString,u8aToHex } = require("@polkadot/util");
const {BigNumber} = require("bignumber.js");
const { Keyring } = require('@polkadot/keyring');
const cron = require("node-cron");
const schedule = require('node-schedule');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const TESTNET_RPC_URL = "wss://mercury.frontier.rpc.robonomics.network/";


let bn= 1000;
let dev = 1;
let min1 = 40;
let max1 = 60;
let min2 = 0.1;
let max2 = 0.5;
let totPow1 = 0;
let totPow2 = 0;

let obj = {
  "energy": 0,
  "gridcode": "GYE",
  "datetime": new Date().toISOString(),
  "energyacum": totPow1
};



const setup = async () => {
    const wsProvider = new WsProvider(process.env.RPC_URL);
    const api = await ApiPromise.create({ provider: wsProvider });
    return api;
}

const transact = async (transaction) => {
  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice');  
  console.log("Transaction called");
  await transaction.signAndSend(alice, result => {
    if (result.status.isInBlock) {
      console.log('in a block');
    } else if (result.status.isFinalized) {
      console.log('finalized');
    }
  });
}


schedule.scheduleJob("30 * * * * *", async () => {
  console.log(process.env.DEVICE1_SEED);
  const wsProvider = new WsProvider(TESTNET_RPC_URL);
  const api = await ApiPromise.create({ provider: wsProvider });
  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri(process.env.DEVICE1_SEED);  
  
  let pow1 = Math.random() * (max1 - min1) + min1;
  pow1 = pow1.toFixed(3)*1000;
  totPow1 += pow1;
  

  obj = {"energy": pow1,"gridcode": "GYE","datetime": new Date().toISOString(),"energyacum":totPow1};

  let strarr = JSON.stringify(obj);
  console.log(strarr);
  const transaction = api.tx.datalog.record(strarr);

  await transaction.signAndSend(alice, result => {
    if (result.status.isInBlock) {
      console.log('in a block');
    } else if (result.status.isFinalized) {
      console.log('finalized');
    }
  });

});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/robonomics', (req, res) => {
    res.header("Content-Type",'application/json');
    let json = JSON.stringify(obj);
    res.send(json);
    //res.sendFile(path.join(__dirname,'./data', 'robonomics.json'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
