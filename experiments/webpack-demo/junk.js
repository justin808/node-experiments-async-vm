// https://nodejs.org/api/vm.html#vm_example_running_an_http_server_within_a_vm

"use strict";
const vm = require("vm");
const http = require("http");
const util = require("util");
const fs = require("fs");
const bundle = fs.readFileSync("./dist/main.js");

/*
const code =
  `
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
*/
const context = vm.createContext(); //{ global: {a: 'b'} });

vm.runInContext("global = this; global.xml", context);

const result0 = vm.runInContext(bundle, context, { displayErrors: true });

const promiseResult0 = util.types.isPromise(result0);

console.log(
  "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
);
console.log(`result0,`, result0);
console.log(`promiseResult0`, promiseResult0);
console.log(`typeof(result0)`, typeof result0);
console.log(
  "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
);

const invocationCode = `
  this.invoker(this.fetchHnTopStories);  
`;

const result1 = vm.runInContext(invocationCode, context);
const promiseResult1 = util.types.isPromise(result1);

console.log(
  "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
);
console.log(`result1`, result1);
console.log(`promiseResult1`, promiseResult1);
console.log(`typeof(result1)`, typeof result1);
console.log(
  "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
);

result1(require, process)
  .then(result => {
    console.log(JSON.stringify(result.data));
  })
  .catch(e =>
    console.error("Caught error executing\n", invocationCode, "\n", e)
  );

console.log(`finished`);
