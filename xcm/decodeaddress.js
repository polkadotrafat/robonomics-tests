const { decodeAddress } = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");
var args = process.argv;

const main = async () => {
    const val = args[2];
    address = decodeAddress(val);
    console.log(u8aToHex(address));
}

main();