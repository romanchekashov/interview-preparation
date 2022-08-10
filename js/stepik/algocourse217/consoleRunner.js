// put your javascript (node.js) code here
const run = (solutionFn) => {
    process.stdin.on('data', (data) => {
        console.log(solutionFn(data));
        process.exit(0);
    });
}

module.exports = { run };
