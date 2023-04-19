const { assert, measurePerformance } = require('./../../../Utils');

/**
 *
 * interface Quantum {
 *     id: string; // идентификатор кванта
 *     priority: number; // приоритет переноса - сначала переносим кванты с наибольшим приоритетом
 *     transfer: () => Promise<Quantum[]>; // асинхронная функция, которая перемещает квант и возвращает список квантов, на которые разделился исходный, либо null
 * }
 *
 * function transferQuantums(quantums: Quantum[], n: Number): Promise<string[]>;
 *
 * @param {{
 *     id: string,
 *     priority: number,
 *     transfer: () => Promise<Quantum[]>
 * }[]} quantums
 * @param {number} n
 * @return {number} max sum branch
 */
async function transferQuantums(quantums, n) {
    const transferedIds = []

    const transferQuantumsHelper = async (quantums) => {
        quantums.sort((a, b) => b.priority - a.priority)

        while (quantums.length > 0) {
            const transferQueueMaxNSize = [];

            while (transferQueueMaxNSize.length < n && quantums.length > 0) {
                transferQueueMaxNSize.push(quantums.shift());
            }

            const transfered = await Promise.all(transferQueueMaxNSize.map(q => q.transfer()));

            const needTransfer = []
            for (let i = 0; i < transferQueueMaxNSize.length; i++) {
                const result = transfered[i];
                if (result) { // Quantum[]
                    needTransfer.push(result);
                } else {
                    transferedIds.push(transferQueueMaxNSize[i].id);
                }
            }

            for (const qlist of needTransfer) {
                await transferQuantumsHelper(qlist)
            }
        }
    }

    await transferQuantumsHelper(quantums)

    return transferedIds;
}

async function transferQuantums2(quantums, n) {
    const transferedIds = []
    let resendQueue = []

    quantums.sort((a, b) => b.priority - a.priority)

    while (quantums.length > 0 || resendQueue.length > 0) {
        const transferQueueMaxNSize = [];

        while (transferQueueMaxNSize.length < n && resendQueue.length > 0) {
            transferQueueMaxNSize.push(resendQueue.shift());
        }

        while (transferQueueMaxNSize.length < n && quantums.length > 0) {
            transferQueueMaxNSize.push(quantums.shift());
        }

        const transfered = await Promise.all(transferQueueMaxNSize.map(q => q.transfer()));

        for (let i = 0; i < transferQueueMaxNSize.length; i++) {
            const result = transfered[i];
            if (result) { // Quantum[]
                for (const q of result) {
                    resendQueue.push(q);
                }
            } else {
                transferedIds.push(transferQueueMaxNSize[i].id);
            }
        }

        resendQueue.sort((a, b) => b.priority - a.priority);
    }

    return transferedIds;
}

const solutions = [transferQuantums];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        solution([
            {id: '1', priority: 1, transfer: () => Promise.resolve(null)},
            {id: '2', priority: 1, transfer: () => Promise.resolve(null)},
            {id: '3', priority: 1, transfer: () => Promise.resolve(null)},
            {id: '4', priority: 2, transfer: () => Promise.resolve(null)}
        ], 2).then(console.log)
    });
});
