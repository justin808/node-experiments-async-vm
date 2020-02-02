// https://nodejs.org/api/vm.html#vm_script_runincontext_contextifiedsandbox_options
const util = require('util');
const vm = require('vm');

const sandbox = {
  animal: 'cat',
  count: 2
};

global.x = 1;

const script = new vm.Script('count += 1; name = "kitty; global.x += 1";');

const context = vm.createContext(sandbox);
for (let i = 0; i < 10; ++i) {
  script.runInContext(context);
}

console.log(util.inspect(sandbox));
console.log('global.x', global.x);
// { animal: 'cat', count: 12, name: 'kitty' }
