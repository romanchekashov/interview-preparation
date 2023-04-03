let inputGenerator, outputGenerator

function* generateReadline(testCases) {
    const arr = testCases.split('\n').filter(s => s);
    const lastIndex = arr.length - 1

    for (let i = 0; i < lastIndex; i++) {
        yield arr[i]
    }

    return arr[lastIndex]
}

const inputData = (inputFile) => {
    inputGenerator = generateReadline(inputFile);
}

const outputData = (outputFile) => {
    outputGenerator = generateReadline(outputFile);
}

const readline = () => inputGenerator.next().value

const print = (str) => {
    if (outputGenerator) {
        const nextValue = outputGenerator.next().value
        if (str != nextValue) throw new Error(str + ' <-- Incorrect output line, should be --> ' + nextValue)
    }
    console.log(str)
}

module.exports = {
    inputData,
    outputData,
    readline,
    print
};
