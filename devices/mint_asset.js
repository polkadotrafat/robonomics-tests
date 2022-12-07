const { ApiPromise, WsProvider } = require("@polkadot/api");
const {BigNumber} = require("bignumber.js");
const { Keyring } = require('@polkadot/keyring');
var args = process.argv;

const mint = async () => {
    const wsProvider = new WsProvider(process.env.RPC_URL);
    const api = await ApiPromise.create({ provider: wsProvider });
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');
    const cd = await api.registry.chainDecimals;
    console.log("chain decimals",cd);
    const UNIT = Math.pow(10,parseInt(cd.toString()));
    //console.log(alice.address);
    const assetId = args[2];
    const amount = args[3] || 1000;
    const beneficiary = args[4] || alice.address;

    let t1 = new BigNumber(amount);
    let t2 = t1.multipliedBy(UNIT).toFixed();

    const transaction = api.tx.assets.mint(assetId,beneficiary,t2);

    await transaction.signAndSend(alice, result => {
        if (result.status.isInBlock) {
          console.log('in a block');
        } else if (result.status.isFinalized) {
          console.log('finalized');
        }
    });
}

mint().catch(err => {
    console.log(err)
}).finally(() => process.exit());