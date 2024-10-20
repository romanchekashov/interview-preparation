class CodeforcesTester {
    _inputGenerator
    _outputGenerator

    * _generateReadline(testCases) {
        const arr = testCases.split('\n').filter(s => s);
        const lastIndex = arr.length - 1

        for (let i = 0; i < lastIndex; i++) {
            yield arr[i]
        }

        return arr[lastIndex]
    }

    /**
     * @param {string} inputFileContent copy input data from problem
     * @return {CodeforcesTester}
     */
    inputData(inputFileContent) {
        this._inputGenerator = this._generateReadline(inputFileContent);
        return this
    }

    /**
     * @param {string} outputFileContent copy output data from problem
     * @return {CodeforcesTester}
     */
    outputData(outputFileContent) {
        this._outputGenerator = this._generateReadline(outputFileContent);
        return this
    }

    readline() {
        if (this._inputGenerator) return this._inputGenerator.next().value
        throw new Error('Input data was not set')
    }

    print(str) {
        if (this._outputGenerator) {
            const nextValue = this._outputGenerator.next().value
            if (str != nextValue) throw new Error(str + ' <-- Incorrect output line, should be --> ' + nextValue)
        }
        console.log(str)
    }
}
const tester = new CodeforcesTester()
module.exports = {
    inputData: tester.inputData,
    outputData: tester.outputData,
    readline: tester.readline,
    print: tester.print,
    CodeforcesTester
};
