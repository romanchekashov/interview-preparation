/**
 * Here is interface you need to implement.
 * Please use only single .ts file for solution. Please make sure it can be compiled on Tyepscript 4 without
 * any additional steps and 3rd-party libs. Please use comments to describe your solution.
 *
 * This is spot provider, it stores information about ticking spots, and provide ability to requests like : what was the spot
 * at any given point in time.
 * CCYPAIR  is combination of two 3-chars currencies like "EURUSD" or "JPYRUB" and so on.  Always in uppercase.
 * SPOT is ticking value of given ccypair  like for "USDRUB" it can be 76.45 then 76.46 then 76.44 ...
 *
 * We can assume that all data fits in memory, so we don't need to store it anywhere.
 * But there is a  "SUPER" task to have some persisting logic. It is not mandatory task. So, up to you.
 *
 *
 * Please don't spend more then one hour on this task.
 * And one more hour on "SUPER" task, if you are ready to spend this time on it.(not mandatory)
 */

interface SpotStore {
    /**
     * We are connected to other system that feed us ticks from different markets.
     * When we receive new tick we call add() method to store it. So later we can use this information in get method.
     * Note that time is increasing at each tick for given ccypair.
     *
     * Time complexity:  add() should work faster than O(logN)
     *
     * @param ccypair always 6 chars uppercase, only valid CCY codes. maximum number of different strings is 100X100
     * @param spot just a double value for spot that changed at this tickTime
     * @param tickTime  time when this spot ticks.
     */
    add(ccypair: string, spot: number, tickTime: number): void;

    /**
     * This is the place where we try to understand what was the spot at some point in time.
     * Like  what was the spot at 5pm Moscow for "EURRUB".  Note that there can be no spot at exact given time,
     * so you need to return latest at this time.
     * @param ccypair always 6 chars uppercase, only valid CCY codes. maximum number of different strings is 100X100
     * @param dateTime point in time.
     * @return spot value at this given time
     */
    get(ccypair: string, dateTime: number): number;
}

/**
 * Data type to hold ticks and spots
 */
interface SpotsTicks {
    ticks: number[];
    spots: number[];
}

class SpotStoreImpl implements SpotStore {
    // store association of ccypair with spots and ticks
    ccypairSpotsTicksMap: Map<string, SpotsTicks>;

    constructor() {
        this.ccypairSpotsTicksMap = new Map();
    }

    add(ccypair: string, spot: number, tickTime: number): void {
        // set initial spots ticks if it not exists for ccypair
        if (!this.ccypairSpotsTicksMap.has(ccypair)) {
            this.ccypairSpotsTicksMap.set(ccypair, {
                ticks: [],
                spots: [],
            });
        }

        const ccypairData = this.ccypairSpotsTicksMap.get(ccypair);
        // tickTime and spot has same index in array, add to end of array O(1) - amortizied complexity
        ccypairData.ticks.push(tickTime);
        ccypairData.spots.push(spot);
    }

    get(ccypair: string, dateTime: number): number {
        // if no spots and ticks for ccypair just return -1
        if (!this.ccypairSpotsTicksMap.has(ccypair)) return -1;

        const ccypairData = this.ccypairSpotsTicksMap.get(ccypair);
        const latestSpotIdx = this._indexOfLatestTick(
            ccypairData.ticks,
            dateTime
        );

        return ccypairData.spots[latestSpotIdx];
    }

    /**
     * Binary search(O(logN)) with slight modification
     * in order to get index of tick which is not greater then dateTime
     * @param ticks ordered array of timestamps
     * @param dateTime point in time
     * @returns index of latests tick not greater then dateTime
     */
    _indexOfLatestTick(ticks: number[], dateTime: number): number {
        let mid = 0;
        let low = 0;
        let high = ticks.length - 1;

        while (low <= high) {
            // get middle index with integer division
            mid = Math.floor((low + high) / 2);

            if (ticks[mid] > dateTime) {
                high = mid - 1;
            } else if (ticks[mid] < dateTime) {
                low = mid + 1;
            } else {
                return mid;
            }
        }

        // check the tick at found index isn't greater than dateTime because they could be unequal
        return ticks[mid] > dateTime ? mid - 1 : mid;
    }
}

/**
 * "SUPER" task.  It is not mandatory task. So, up to you.
 *
 * Let assume that our service is implemented in Reactor pattern (@see https://en.wikipedia.org/wiki/Reactor_pattern)
 * and we need to implement a processor of the requests that wiil be in front of our SpotStore.
 * In reactor pattern processor is just a loop that handles the quueue of the requests. But we don't want to loose
 * any "add price message" and also want to handle them as soon as possible.
 *
 * To sort it out we will use 2 queues of messages:
 * 1) for add requests 2) for get requests. Also we have a monitoring system that allows us to make some alerts if the processor
 * too slow. The alerting is triggered if the processor doesn't send a heart beet for 30 ms. So you need to implement queue
 * processor so that it will handle all requests "add" queue as soon as possible, requests from "get" queue with any reasonable
 * speed and send a heart beat at least once per 40 ms.
 * Note: Processing of "add" requests is more important than monitoring. Also please add an example of unit test or any other demo
 * of service
 */
interface AddRequest {
    ccypair: string;
    spot: number;
    tickTime: number;
}

interface GetRequest {
    ccypair: string;
    dateTime: number;
    /** When you handle this request don't forget to call @param cb passing the result */
    cb: (value: number) => void;
}

interface MonitoringService {
    sendHeartBeat(): void;
}

/** Reactor will add "Add" request to the end of this queue */
const addRequestQueue: AddRequest[] = [];

/** Reactor will add "Get" request to the end of this queue */
const getRequestQueue: GetRequest[] = [];

/**
 * A monitoring system that allows us to make some alerts if the processor too slow.
 */
class MonitoringServiceImpl implements MonitoringService {
    timestamp: number;
    name: string;
    timeoutInMs: number;

    constructor(name: string, timeoutInMs: number) {
        this.name = name;
        this.timeoutInMs = timeoutInMs;
    }

    /**
     * should be triggered each {timeoutInMs} ms or alert will be invoked
     */
    sendHeartBeat(): void {
        const now = new Date().getTime();
        const took = now - this.timestamp;
        if (this.timestamp && took > this.timeoutInMs) {
            console.log(`ALERT: ${this.name} is too slow. Ping is ${took} ms`);
        }

        this.timestamp = now;
    }
}

/**
 * queue processor so that it will handle all requests "add" queue as soon as possible,
 * requests from "get" queue with any reasonable speed and send a heart beat at least once per 40 ms.
 */
class Processor {
    spotStore: SpotStore;
    addMonitoring: MonitoringService;
    getMonitoring: MonitoringService;

    constructor(
        spotStore: SpotStore,
        addMonitoring: MonitoringService,
        getMonitoring: MonitoringService
    ) {
        this.spotStore = spotStore;
        this.addMonitoring = addMonitoring;
        this.getMonitoring = getMonitoring;
    }

    /**
     * Starts processing the queues
     * addRequestQueue checked more often then getRequestQueue
     */
    run(): void {
        console.log('Processor is running...');

        // checks addRequestQueue every 1 ms and handle AddRequests
        setInterval(() => {
            this.addMonitoring.sendHeartBeat();
            // console.log(`addRequestQueue.length[${addRequestQueue.length}]`);
            if (addRequestQueue.length > 0) {
                addRequestQueue
                    .splice(0)
                    .forEach(({ ccypair, spot, tickTime }) => {
                        this.spotStore.add(ccypair, spot, tickTime);
                    });
            }
        }, 1);

        // checks getRequestQueue every 10 ms and handle GetRequest
        setInterval(() => {
            this.getMonitoring.sendHeartBeat();
            // console.log(`getRequestQueue.length[${getRequestQueue.length}]`);
            if (getRequestQueue.length > 0) {
                getRequestQueue
                    .splice(0)
                    .forEach(({ ccypair, dateTime, cb }) => {
                        cb(this.spotStore.get(ccypair, dateTime));
                    });
            }
        }, 10);
    }
}

// fill addRequestQueue, getRequestQueue with data for testing
const NUM_OF_CCYPAIR = 100;
const getPseudoCcypair = (): string =>
    Math.floor(Math.random() * NUM_OF_CCYPAIR).toString();
let lastAddRequestTick = 0;
setInterval(() => {
    const REQ_NUM = 1000;
    for (let i = 0; i < REQ_NUM; i++) {
        addRequestQueue.push({
            ccypair: getPseudoCcypair(),
            tickTime: lastAddRequestTick++,
            spot: lastAddRequestTick,
        });
    }
}, 1);

let lastGetRequestTick = 0;
setInterval(() => {
    const REQ_NUM = 1000;
    for (let i = 0; i < REQ_NUM; i++) {
        getRequestQueue.push({
            ccypair: getPseudoCcypair(),
            dateTime: lastGetRequestTick++,
            cb: (value: number) => {
                // console.log(value);
            },
        });
    }
}, 1);

// test run
new Processor(
    new SpotStoreImpl(), // data store
    new MonitoringServiceImpl('Add', 30), // to handle Add requests the heart beet is 30 ms
    new MonitoringServiceImpl('Get', 40) // to handle Get requests the heart beet is 40 ms
).run();
