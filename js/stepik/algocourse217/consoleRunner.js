// put your javascript (node.js) code here
const run = (solutionFn) => {
    process.stdin.on('data', (buffer) => {
        console.log(solutionFn(buffer.toString('utf8')));
        process.exit(0);
    });
};

module.exports = { run };
