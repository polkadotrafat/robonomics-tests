const { ApiPromise, WsProvider } = require("@polkadot/api");
const {BigNumber} = require("bignumber.js");
const { Keyring } = require('@polkadot/keyring');
var args = process.argv;

const create = async () => {
    const wsProvider = new WsProvider(process.env.RPC_URL);
    const api = await ApiPromise.create({ provider: wsProvider });
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');
    //console.log(alice.address);
    const assetId = args[2];
    const minBalance = args[3] || 1000;
    const admin = args[4] || alice.address;
    //console.log(assetId,admin,minBalance);

    //const res = await api.query.assets.asset(assetId);
    //console.log(res);

    const transaction = api.tx.assets.create(assetId,admin,minBalance);

    await transaction.signAndSend(alice, result => {
        if (result.status.isInBlock) {
          console.log('in a block');
        } else if (result.status.isFinalized) {
          console.log('finalized');
        }
      });
    
}

create().catch(err => {
    console.log(err)
}).finally(() => process.exit());