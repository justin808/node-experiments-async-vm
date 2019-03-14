// https://nodejs.org/api/vm.html#vm_example_running_an_http_server_within_a_vm

/**
 * Must use, in webpack.config.js:
 *   target: 'async-node'
 */

"use strict";
const vm = require("vm");
const fs = require("fs");
const bundle = fs.readFileSync("./dist/main.js");

const options = { displayErrors: true };

// Initialize the vm
vm.runInThisContext(`
    global = this; 
    (require) => global.require = require;
  `)(require);

// Install the bundle. Without setting 'require', this fails
vm.runInThisContext(bundle, options);

const invocationCode = `
  fetchHnTopStories();  
`;

const promise = vm.runInThisContext(invocationCode, options);

promise
  .then(result => {
    console.log("PROMISE RESOLVED!");
    console.log(JSON.stringify(result.data));
  })
  .catch(e =>
    console.error("Caught error executing\n", invocationCode, "\n", e)
  );

console.log(`FINISHED (note, before the promise returns)`);
