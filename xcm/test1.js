const { ApiPromise, WsProvider } = require('@polkadot/api');
const  { u8aToHex, hexToU8a } = require('@polkadot/util');
const { decodeAddress } = require('@polkadot/util-crypto');

var args = process.argv;

const main = async () => {
    const address = args[2];
    const decode = u8aToHex(decodeAddress(address));
    console.log(address,decode);
}

main();