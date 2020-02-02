// https://nodejs.org/api/vm.html#vm_vm_runinnewcontext_code_sandbox_options


const util = require('util');
const vm = require('vm');

const sandbox = {
  animal: 'cat',
  count: 2,
  x: { count: 10 },
  f: function() {
    console.log('x.count in f', x.count);
    x.count *= 2;
    return x.count;
  }
};

const result = vm.runInNewContext('count += 1; name = "kitty"', sandbox);
console.log('result', result);
const result2 = vm.runInNewContext('count += 1; name = "kitty"', sandbox);
console.log('result', result);
console.log('result2', result2);
console.log(util.inspect(sandbox));

// { animal: 'cat', count: 3, name: 'kitty' }
