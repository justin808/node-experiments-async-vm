// https://nodejs.org/api/vm.html#vm_script_runinthiscontext_options

const vm = require('vm');

global.globalVar = 0;

const script = new vm.Script(
  ` 
  (
    function() { 
      console.log('global.counter', global.counter);
      setTimeout(()=> {
        globalVar += 1;
        console.log('timeout done!, globalVar is ', globalVar)
      }, global.counter * 1000);
      return globalVar;
    }()
  )    
  `,
  { filename: 'myfile.vm' });

for (let i = 0; i < 10; ++i) {
  global.counter = i;
  script.runInThisContext();
}

const result = script.runInThisContext();

console.log('result =', result);

// 1000
