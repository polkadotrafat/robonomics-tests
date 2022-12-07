const { ApiPromise, WsProvider } = require("@polkadot/api");
const {BigNumber} = require("bignumber.js");
const { Keyring } = require('@polkadot/keyring');
var args = process.argv;

const transfer = async () => {
    const wsProvider = new WsProvider(process.env.RPC_URL);
    const api = await ApiPromise.create({ provider: wsProvider });
    const address = args[2];
    const amount = args[3];
    const cd = await api.registry.chainDecimals;
    console.log("chain decimals",cd);
    const UNIT = Math.pow(10,parseInt(cd.toString()));
    let t1 = new BigNumber(amount);
    let t2 = t1.multipliedBy(UNIT).toFixed();
    console.log(t2);
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');
    const transfer = api.tx.balances.transfer(address, t2);

    const hash = await transfer.signAndSend(alice);

    console.log('Transfer sent with hash', hash.toHex());
}

transfer().catch(err => {
    console.log(err)
}).finally(() => process.exit());