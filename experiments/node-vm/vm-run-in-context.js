// https://nodejs.org/api/vm.html#vm_vm_runincontext_code_contextifiedsandbox_options

const util = require('util');
const vm = require('vm');

// const sandbox = { globalVar: 1 };
// const result = vm.createContext(sandbox);
const sandbox = vm.createContext();

console.log(
  'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
console.log(`sandbox`, sandbox, typeof(sandbox));
// console.log(`result`, result, typeof(result));
console.log(
  'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');

vm.runInContext('globalVar = 1', sandbox)

for (let i = 0; i < 10; ++i) {
  vm.runInContext('globalVar *= 2;', sandbox);
}
console.log(util.inspect(sandbox));

// { globalVar: 1024 }
