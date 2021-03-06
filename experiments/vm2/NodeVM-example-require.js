const { NodeVM } = require("vm2");
const vm = new NodeVM({
  require: {
    external: true
  }
});

vm.run(
  `
    var request = require('request');
    debugger;
    request('http://www.google.com', function (error, response, body) {
        console.error(error);
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
        }
    })
`,
  "vm.js"
);
