const { ApiPromise, WsProvider } = require("@polkadot/api");
const {BigNumber} = require("bignumber.js");
const { Keyring } = require('@polkadot/keyring');
var args = process.argv;

const schedule = async () => {
    const wsProvider = new WsProvider(process.env.RPC_URL);
    const api = await ApiPromise.create({ provider: wsProvider });
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');
    const cd = await api.registry.chainDecimals;
    console.log("chain decimals",cd);
    const UNIT = Math.pow(10,parseInt(cd.toString()));
    //console.log(alice.address);
    const scheduleId = args[2];
    const assetId = args[3];
    const amount = args[4];
    const beneficiary = args[5];
    const start = args[6];
    const p = args[7];
    const c = args[8];
    const priority = 7;

    let t1 = new BigNumber(amount);
    let t2 = t1.multipliedBy(UNIT).toFixed();

    const transaction = api.tx.assets.transfer(assetId,beneficiary,t2);
    const scheduler = api.tx.scheduler.scheduleNamed(scheduleId,start,(p,c),priority,{"Value":api.tx.assets.transfer(assetId,beneficiary,t2)});

    await scheduler.signAndSend(alice, result => {
        if (result.status.isInBlock) {
          console.log('in a block');
        } else if (result.status.isFinalized) {
          console.log('finalized');
        }
    });

}

schedule().catch(err => {
    console.log(err)
}).finally(() => process.exit());