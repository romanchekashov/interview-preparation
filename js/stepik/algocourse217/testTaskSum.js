// put your javascript (node.js) code here
const stdin = process.stdin;
stdin.on('data', (data) => {
    const params = data.toString().split(' ');
    const a = parseInt(params[0]);
    const b = parseInt(params[1]);
    console.log(a + b);
    process.exit(0);
});
