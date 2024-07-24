const fs = require('fs');
const readline = require('readline');

const partsOfSpeech = [
    'english level',
    'exclamation (exclam.)',
    'preposition (prep.)',
    'indefinite article',
    'definite article',
    'determiner (det.)',
    'adjectives (adj.)',
    'noun (n.)',
    'pronoun (pron.)',
    'adverbs (adv.)',
    'infinitive marker',
    'verb (v.)',
    'modal verb(v.)',
    'auxiliary verb(v.)',
    'conjunction (conj.)',
    'number',
];
const partsOfSpeechCounters = Array.from(
    { length: partsOfSpeech.length },
    (_, i) => 0
);

(async function processLineByLine() {
    const fileStream = fs.createReadStream('prod/oxfort_words_3000.csv');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    const levelsOfEnglish = new Set(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
    let data = [
        [
            'english level',
            'exclam.',
            'prep.',
            'indefinite article',
            'definite article',
            'det.',
            'adj.',
            'n.',
            'pron.',
            'adv.',
            'infinitive marker',
            'v.',
            'modal v.',
            'auxiliary v.',
            'conj.',
            'number',
        ],
    ];
    // data.push(Array(data[0].length).fill([])); // using same reference to array

    let start = false;
    let wordCounter = 0;

    for await (const line of rl) {
        // Each line in the file will be successively available here as `line`.
        // console.log(`Line from file: ${line}`);
        const parts = line.split(',');
        if (levelsOfEnglish.has(parts[1])) {
            if (wordCounter > 0) {
                data[data.length - 2][0] += ` (${wordCounter})`;
            }
            data.push([parts[1]]);
            data.push(Array.from({ length: data[0].length }, (_, i) => []));
            partsOfSpeechCounters[0]++;
            wordCounter = 0;
            start = true;
        } else if (start) {
            for (let i in data[0]) {
                if (
                    line.includes(',' + data[0][i]) ||
                    line.includes('/' + data[0][i])
                ) {
                    data[data.length - 1][i].push(parts[0]);
                    partsOfSpeechCounters[i]++;
                }
            }
            wordCounter++;
        }
    }

    if (wordCounter > 0) {
        data[data.length - 2][0] += ` (${wordCounter})`;
    }

    writeToCSV(data);
})();

const writeToCSV = (data) => {
    console.log(data);
    let csvContent = '';

    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            csvContent +=
                partsOfSpeech
                    .map((v, j) => `${v} (${partsOfSpeechCounters[j]})`)
                    .join(',') + '\n';
        } else if (data[i].length === 1) {
            csvContent += data[i].join(',') + '\n';
        } else {
            const max_length = Math.max(...data[i].map((el) => el.length));
            for (let j = 0; j < max_length; j++) {
                const row = data[i].map((el) => el[j] || '');
                csvContent += row.join(',') + '\n';
            }
        }
    }
    fs.writeFileSync('oxfort_words_3000_group_part_of_speech.csv', csvContent);
};
