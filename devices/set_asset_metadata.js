const { ApiPromise, WsProvider } = require("@polkadot/api");
const {BigNumber} = require("bignumber.js");
const { Keyring } = require('@polkadot/keyring');
var args = process.argv;

const metadata = async () => {
    const wsProvider = new WsProvider(process.env.RPC_URL);
    const api = await ApiPromise.create({ provider: wsProvider });
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');
    //console.log(alice.address);
    const assetId = args[2];
    const name = args[3];
    const symbol = args[4];
    const decimals = 9;
    //console.log(assetId,admin,minBalance);

    //const res = await api.query.assets.asset(assetId);
    //console.log(res);

    const transaction = api.tx.assets.setMetadata(assetId,name,symbol,decimals);

    await transaction.signAndSend(alice, result => {
        if (result.status.isInBlock) {
          console.log('in a block');
        } else if (result.status.isFinalized) {
          console.log('finalized');
        }
      });
    
}

metadata().catch(err => {
    console.log(err)
}).finally(() => process.exit());