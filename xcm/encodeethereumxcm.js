const { ApiPromise, WsProvider } = require("@polkadot/api");
const {BigNumber} = require("bignumber.js");
const { Keyring } = require('@polkadot/keyring');
const { stringToHex, u8aToString, hexToString,u8aToHex } = require("@polkadot/util");

const transact = async () => {
    //console.log(process.env.MOONBASE_RPC_URL);
    const moonbaseProvider = new WsProvider("wss://wss.api.moonbase.moonbeam.network");
    const moonbaseApi = await ApiPromise.create({ provider: moonbaseProvider });

    //const relayProvider = new WsProvider("wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network");
    //const relayApi = await ApiPromise.create({ provider: relayProvider });

    //console.log(moonbaseProvider);

    const tx = moonbaseApi.tx.ethereumXcm.transact({
        V2: {
          gasLimit: 71000,
          action: {
            Call: "0xa72f549a1a12b9b49f30a7f3aeb1f4e96389c5d8"
          },
          value: 0,
          input: "0xd09de08a",
          accessList: null
        }
      });

    const encodedCalldata = tx?.method.toHex();
    console.log(encodedCalldata);

    
}

transact().catch(err => {
  console.log(err)
}).finally(() => process.exit());