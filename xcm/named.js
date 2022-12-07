const hex = require("string-hex");
var args = process.argv;

const val = args[2];
const val2hex = hex(val);
console.log("0x"+val2hex);