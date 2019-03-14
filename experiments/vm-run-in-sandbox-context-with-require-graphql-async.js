// https://nodejs.org/api/vm.html#vm_example_running_an_http_server_within_a_vm

'use strict';
const vm = require('vm');
const util = require('util');

const GQL_EXAMPLE =
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

async function run(code) {
  const sandbox = vm.createContext();

  const result = await vm.runInContext(code, sandbox)(require);

  console.log(
    'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
  console.log(`result`, result);
  console.log(`typeof(result)`, typeof (result));
  console.log(
    'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
  return result;
}

// This is an error, which is good
// console.log(`testGlobal is ${testGlobal}`);
const result = run(GQL_EXAMPLE);
console.log(`finished, result is ${result}`);
