const {NodeVM, VMScript} = require('vm2');

const vm = new NodeVM({
  console: 'inherit',
  sandbox: {},
  require: {
    external: true,
    builtin: ['fs', 'path'],
    root: "./",
    mock: {
      fs: {
        readFileSync() { return 'Nice try!'; }
      }
    }
  }
});

const bundle = `
let sideEffect = 0;
module.exports.hello = function(who) {
  console.log(\`Incrementing sideEffect from \${sideEffect}\`);
  sideEffect += 1;
  return \`hello \${who}, sideEffect = \${sideEffect}\`;
};
`;

const compiledBundle = new VMScript(bundle)
const runSandboxed = (name) => {
  // Next line could be very slow if needed to do for every SSR request
  const moduleExports = vm.run(compiledBundle);
  return moduleExports.hello(name);
}

const run1 = runSandboxed('world');
console.log(`r1 is ${run1}`);

const run2 = runSandboxed('world second time');
console.log(`r2 is ${run2}`);
