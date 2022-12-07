const { ApiPromise, WsProvider } = require('@polkadot/api');
const {Keyring} = require("@polkadot/keyring");
const {cryptoWaitReady} =  require("@polkadot/util-crypto");
const cron = require("node-cron");
const express = require("express");
const fs = require('fs');
var path = require('path')

require('dotenv').config();

const app = express();
const seed = process.env.DEVICE1_SEED;

const setup = async () => {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

    const sp = keyring.createFromUri(seed, { name: 'sr25519' });

    console.log(sp.meta.name, sp.address);
}

setup();

