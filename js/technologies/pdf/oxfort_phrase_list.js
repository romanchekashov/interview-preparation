const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync(
    '/Users/romanchekashov/Downloads/Oxford Phrase List.pdf'
);

pdf(dataBuffer).then(function (data) {
    // Extract all words
    // let words = data.text.split(/\s+/);
    let words = data.text.split(/\n/);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].trim();
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
    fs.writeFileSync('oxford_phrase_list.csv', csvContent);
};
