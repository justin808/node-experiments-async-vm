const util = require('util');
const vm = require('vm');

global.globalVar = 100;

const sandbox = { globalVar: 1 };
vm.createContext(sandbox);

const result = vm.runInContext('globalVar *= 2; 69', sandbox);

console.log('result', util.inspect(result)); // { globalVar: 2 }
console.log(util.inspect(sandbox)); // { globalVar: 2 }

console.log(util.inspect(globalVar)); // 3
