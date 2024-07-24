const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync(
    '/Users/romanchekashov/Downloads/The_Oxford_3000_by_CEFR_level.pdf'
);

pdf(dataBuffer).then(function (data) {
    // Extract all words
    // let words = data.text.split(/\s+/);
    let words = data.text.split(/\n/);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i]
            .trim()
            .replace(/\s+/g, ',')
            .replace(/(\D+)(\d+)/g, '$1,$2');
    }
    console.log(words);
    writeToCSV(words);
});

const writeToCSV = (words) => {
    let csvContent = '';
    words.forEach((word) => {
        if (word.includes('Oxford')) return;
        csvContent += word + '\n';
    });
    fs.writeFileSync('oxfort_words_3000.csv', csvContent);
};
