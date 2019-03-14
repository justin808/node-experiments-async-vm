// https://nodejs.org/api/vm.html#vm_example_running_an_http_server_within_a_vm

'use strict';
const vm = require('vm');
const util = require('util');

const code =
  `
  var testGlobal = "foobar";
((require) => {
  const request = require("axios")
  
  const query = \`
  {
    hn {
      topStories {
        title
        id
        score
        descendants
      }
    }
  }
  \`;
  
  return request
    .get(
      'https://www.graphqlhub.com/graphql',
      {
        method: 'get',
        params: {
          query,
        },
      },
    );
    // Let's return a promise
    // .then(
    //   (result) => {
    //     console.log(JSON.stringify(result.data));
    //   }
    // );
})`;
const sandbox = vm.createContext();

const result = vm.runInContext(code, sandbox)(require);

const promiseResult = util.types.isPromise(result);

// const result = vm.runInThisContext(code, {displayErrors: true})(require);

console.log(
  'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
console.log(`result`, result);
console.log(`promiseResult`, promiseResult);
console.log(`typeof(result)`, typeof(result));
console.log(
  'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');

result.then(
  (result) => {
    console.log(JSON.stringify(result.data));
  }
);

// This is an error, which is good
// console.log(`testGlobal is ${testGlobal}`);
console.log(`finished`);


