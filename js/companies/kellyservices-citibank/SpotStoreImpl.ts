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

// =========================
const store = new SpotStoreImpl();
const ccypair = 'USDRUB';
for (let i = 0; i < 10; i++) {
    store.add(ccypair, i, i * 2);
}

console.log(store.get(ccypair, 15));
