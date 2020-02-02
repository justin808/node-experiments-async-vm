// https://nodejs.org/api/vm.html#vm_script_runinnewcontext_sandbox_options

const util = require('util');
const vm = require('vm');

global.x = 1;
const script = new vm.Script('globalVar = "set"; global.x += 1');

const sandboxes = [{global: {}}, {global: {}}, {global: {}}];
sandboxes.forEach((sandbox) => {
  script.runInNewContext(sandbox);
});

console.log(util.inspect(sandboxes));
console.log('global.x', global.x);


// [{ globalVar: 'set' }, { globalVar: 'set' }, { globalVar: 'set' }]
