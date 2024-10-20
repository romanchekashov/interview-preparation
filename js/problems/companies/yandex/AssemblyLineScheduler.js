const { clear } = require('console');
const { assert, measurePerformance, TimeMeasure } = require('../../../Utils');

/*
 * B. Сборочная линия

Ограничение времени	10 секунд
Ограничение памяти	1024.0 Мб
Ввод	input.json
Вывод	output.json

Вы устроились на продвинутый сборочный цех айти-разнорабочим, чтобы стать помощником главного инженера.

Задача цеха — автоматизированно выполнять предоставленные клиентами заказы по сборке.

В цеху есть N линий сборки, работающих одновременно. Каждая линия сборки работает беспрерывно до тех пор, пока есть актуальные задачи на сегодня. Задачи по сборке цех принимает каждый день, но все задачи поступившие во время рабочего дня, откладываются на следующий. У задач может быть приоритетность, она учитывается при распределении задач на линиях сборки, задача с самым большим приоритетом — идет первой в работу (если есть 2 задачи с одинаковым приоритетом, будет выполнена сначала первая добавленная).

Сейчас распределение заказов между линиями сборки выполняет планировщица Зинаида, непревзойденный мастер, но она скоро выходит на пенсию. Ваш новый начальник хочет чтобы завод продолжил работать также оптимально и понял, что это отличный момент для автоматизации. Звучит как идеальная задача для новичка. Вам поручили сделать новую программу для управления сборочными линиями, которая также будет ежедневно генерировать список отчетов о проделанной работе для каждой линии сборки.

Формат ввода
Необходимо реализовать класс AssemblyLineScheduler. Конструктор получает n (1 ≤ n ≤ 1024) — количество сборочных линий.

Заказы добавляются методом appendJob. В рамках одного теста может быть не более 10^5 вызовов этого метода.

У заказа есть уникальный строковый идентификатор id (1 ≤ id.length ≤ 10), приоритет priority (1 ≤ priority ≤ 10^9) и метод execute, запускающий его исполнение. Этот метод возвращает promise, который который будет resolved или rejected через время t мс (1 ≤ t ≤ 1024). Resolved, если контроль качества пройден и rejected в противном случае.

В начале каждого дня вызывается метод start. Он должен исполнить пул заказов предыдущего дня и вернуть статистику использования каждой линии - сколько времени линия была загружена (в мс), какие задачи исполнила, сколько из них прошли контроль качества и сколько не прошли. В рамках одного теста метод start будет вызван p раз (1 ≤ p ≤ 10).

Формат вывода
В результате решения могут быть обозначены следующие вердикты:
OK — верный ответ.
WrongAnswer (WA) — неправильный ответ.
TimeLimitExceeded (TL) — превышено максимальное время выполнения проверки задачи.
MemoryLimitExceeded (ML) — превышено ограничение на оперативную память.
RuntimeError (RE) — программа завершила работу с ненулевым кодом возврата или тип возвращаемых данных не соответствует ожидаемому (проверьте, что результат start соответствует сигнатуре в jsdoc).
Crash — запуск программы завершился ошибкой.

*/

/**
 * @typedef Job
 * @property {string} id Уникальный идентификатор задачи, 1 ≤ id.length ≤ 10.
 * @property {number} priority Приоритет задачи, 1 ≤ priority ≤ 10^9. Чем выше число, тем выше приоритет.
 * @property {() => Promise<undefined>} execute Функция, выполняющая задание.
 * Может быть resolved или rejected через длительное время.
 */
class Job {
    /**
     * @param {string} id
     * @param {number} priority
     * @param {() => Promise<undefined>} execute
     */
    constructor(id, priority, execute) {
        this.id = id;
        this.priority = priority;
        this.execute = execute;
    }
}

/**
 * @typedef JobReport
 * @property {number} qcPassed Общее количество выполненных успешно задач.
 * @property {number} qcFailed Общее количество невыполненных задач.
 * @property {string[]} jobIds Идентификаторы взятых в работу заказов.
 * @property {number} timeSpent Количество проведённых в работе миллисекунд.
 */
class JobReport {
    constructor() {
        this.qcPassed = 0;
        this.qcFailed = 0;
        this.jobIds = [];
        this.timeSpent = 0;
    }
}

/**
 * n - линий сборки, работают одновременно. (1 <= n <= 1024)
 * линия сборки обрабатывает актуальные задачи на сегодня.
 * задачи принятые сегодня, обрабатываются завтра. - appendJob - max calls 10^5 = 100000 times
 * задача с большим приоритетом выполняется раньше. - order {uniueId (1 <= id.length <= 10), priority (1 <= priority <= 10^9), execute() => Promise<t (1 <= t <= 1024) ms> - start task: resolve() or reject()}
 * задачи с одинаковым приоритетом выполняются в порядке добавления.
 * нужно ежедневно генерировать отчёты о выполненных задачах для каждой линии сборки отдельно.
 * start() - в начале дня запускает обработку задач из пула и выдаёт список отчётов. - max calls 10 times
 *
 */
class AssemblyLineScheduler {
    #tommorowJobs = [];
    #todayJobs = [];
    #assemblyLines = [];

    /**
     * @param {number} n Число сборочных линий, 1 ≤ n ≤ 1024
     */
    constructor(n) {
        this.#assemblyLines = Array.from({ length: n }, (_, _i) => ({
            qcPassed: 0,
            qcFailed: 0,
            jobIds: [],
            timeSpent: 0,
        }));
    }

    /**
     * Добавляет задачу в пул задач следующего дня.
     * В рамках одного теста может быть не более 10^5 вызовов этого метода.
     * @param {Job} job
     */
    appendJob(job) {
        this.#tommorowJobs.push(job);
    }

    /**
     * Запускает обработку задач из пула и выдаёт список отчётов.
     * В рамках одного теста может быть не более 10 вызовов этого метода.
     * @returns {Promise<JobReport[]>}
     */
    async start() {
        this.#setTodayJobs();
        const chunk = this.#assemblyLines.length;
        const jobs = [];
        // console.log('this.#assemblyLines', this.#assemblyLines);

        for (let i = 0; i < this.#todayJobs.length; i++) {
            const job = this.#todayJobs[i];

            jobs.push(job);
            if (jobs.length === chunk) {
                await this.#processJobs(jobs);
                jobs.length = 0;
            }
        }

        if (jobs.length > 0) await this.#processJobs(jobs);

        return this.#assemblyLines;
    }

    async #processJobs(jobs) {
        const times = [];
        return Promise.allSettled(
            jobs.map((job) => {
                const start = Date.now();
                return job.execute().finally(() => {
                    times.push(Date.now() - start);
                });
            })
        ).then((data) => {
            for (const i in data) {
                if (data[i].status === 'rejected') {
                    this.#assemblyLines[i].qcFailed++;
                } else {
                    this.#assemblyLines[i].qcPassed++;
                }
                this.#assemblyLines[i].timeSpent += times[i];
                this.#assemblyLines[i].jobIds.push(jobs[i].id);
            }
        });
    }

    #setTodayJobs() {
        this.#todayJobs = this.#tommorowJobs.sort(
            (a, b) => b.priority - a.priority
        );
        this.#tommorowJobs = [];
    }
}

class AssemblyLineScheduler2 {
    #tommorowJobs = [];
    #todayJobs = [];
    #assemblyLines = [];

    /**
     * @param {number} n Число сборочных линий, 1 ≤ n ≤ 1024
     */
    constructor(n) {
        this.#assemblyLines = Array.from({ length: n }, (_, _i) => ({
            qcPassed: 0,
            qcFailed: 0,
            jobIds: [],
            timeSpent: 0,
        }));
    }

    /**
     * Добавляет задачу в пул задач следующего дня.
     * В рамках одного теста может быть не более 10^5 вызовов этого метода.
     * @param {Job} job
     */
    appendJob(job) {
        this.#tommorowJobs.push(job);
    }

    /**
     * Запускает обработку задач из пула и выдаёт список отчётов.
     * В рамках одного теста может быть не более 10 вызовов этого метода.
     * @returns {Promise<JobReport[]>}
     */
    async start() {
        this.#setTodayJobs();
        // console.log('this.#assemblyLines', this.#assemblyLines);
        return new Promise((resolve, reject) => {
            let i = 0;
            let size = 0;

            const nextJob = () => {
                size++;

                if (this.#todayJobs[i]) {
                    // console.log('nextJob', i, this.#todayJobs[i]);
                    this.#processJob(
                        i % this.#assemblyLines.length,
                        this.#todayJobs[i],
                        nextJob
                    );
                    i++;
                } else if (i === size) {
                    // console.log(
                    //     'nextJob: this.#assemblyLines',
                    //     this.#assemblyLines
                    // );

                    resolve(this.#assemblyLines);
                }
            };

            for (; i < this.#assemblyLines.length; i++) {
                if (this.#todayJobs[i]) {
                    this.#processJob(i, this.#todayJobs[i], nextJob);
                }
            }
        });
    }

    #processJob(i, job, callback) {
        // console.log(i, 'job', job);
        const start = Date.now();

        job.execute()
            .then((value) => {
                this.#assemblyLines[i].qcPassed++;
            })
            .catch((reason) => {
                this.#assemblyLines[i].qcFailed++;
            })
            .finally(() => {
                // console.log('finally', i, job.id);
                this.#assemblyLines[i].timeSpent += Date.now() - start;
                this.#assemblyLines[i].jobIds.push(job.id);
                callback();
            });
    }

    #setTodayJobs() {
        this.#todayJobs = this.#tommorowJobs.sort(
            (a, b) => b.priority - a.priority
        );
        this.#tommorowJobs = [];
    }
}

module.exports = { AssemblyLineScheduler, AssemblyLineScheduler2 };

/**
 * Test cases
 * input:
{
    "linesCount": 3,
    "jobsBatches": [
        [
            {
                "id": "1",
                "priority": 344327634,
                "time": 69,
                "resolve": false,
                "async": false
            },
            {
                "id": "2",
                "priority": 439182113,
                "time": 68,
                "resolve": false,
                "async": false
            },
            {
                "id": "3",
                "priority": 267746535,
                "time": 83,
                "resolve": true,
                "async": false
            },
            {
                "id": "4",
                "priority": 412201989,
                "time": 61,
                "resolve": true,
                "async": false
            },
            {
                "id": "5",
                "priority": 211178799,
                "time": 94,
                "resolve": true,
                "async": false
            }
        ]
    ]
}

output:
[
    [
        [0,1,["1"],69],
        [2,0,["4","3"],144],
        [1,1,["2","5"],162]
    ]
]
 *
 */

/**
 * Примечания
 * Для измерения времени используйте Date.now() — в тестах будет использована библиотека @sinonjs/fake-timers, которая обеспечит измерение времени без погрешности.
 * Версия Node.js, используемая при запуске кода, — 20.10.0.
 *
 * Примерный код теста:
 */
// (async () => {
//     const generateJob = () =>
//         function () {
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     Math.random() > 0.8 ? resolve() : reject();
//                 }, 1 + Math.floor(Math.random() * 100));
//             });
//         };

//     const scheduler = new AssemblyLineScheduler(3);
//     const reports = [];
//     for (let day = 0; day < 2; day += 1) {
//         for (let i = 0; i < 10; i += 1) {
//             // это лишь примерный код, задачи могут также быть добавлены прямо во время работы (в процессе исполнения start асинхронно)
//             scheduler.appendJob({
//                 id: String(i),
//                 priority: 10,
//                 execute: generateJob(),
//             });
//         }

//         reports.push(await scheduler.start());
//     }

//     console.log(JSON.stringify(reports, null, 4));
// })();

(async () => {
    const generateJob = {
        linesCount: 3,
        jobsBatches: [
            [
                {
                    id: '1',
                    priority: 344327634,
                    time: 69,
                    resolve: false,
                    async: false,
                },
                {
                    id: '2',
                    priority: 439182113,
                    time: 68,
                    resolve: false,
                    async: false,
                },
                {
                    id: '3',
                    priority: 267746535,
                    time: 83,
                    resolve: true,
                    async: false,
                },
                {
                    id: '4',
                    priority: 412201989,
                    time: 61,
                    resolve: true,
                    async: false,
                },
                {
                    id: '5',
                    priority: 211178799,
                    time: 94,
                    resolve: true,
                    async: false,
                },
            ],
        ],
    };

    const solutions = [AssemblyLineScheduler, AssemblyLineScheduler2];

    for (const solution of solutions) {
        const measure = new TimeMeasure();
        measure.start();
        const scheduler = new solution(generateJob.linesCount);
        const reports = [];

        generateJob.jobsBatches.forEach((jobs) => {
            jobs.forEach((job) => {
                scheduler.appendJob({
                    id: job.id,
                    priority: job.priority,
                    execute: () =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                job.resolve ? resolve() : reject();
                            }, job.time);
                        }),
                });
            });
        });

        reports.push(
            (await scheduler.start()).map((v) => [
                v.qcPassed,
                v.qcFailed,
                v.jobIds,
                v.timeSpent,
            ])
        );

        console.log(JSON.stringify(reports, null, 4));

        const measureResult = measure.stop();
        measure.log(measureResult);
    }
})();
