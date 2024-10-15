package org.example.util.concurrent.blocking_queue;

import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

public class DelayedElement implements Delayed {
    private final long delayTime;
    private final long expireTime;
    private final String element;

    public DelayedElement(String element, long delayTime, TimeUnit unit) {
        this.element = element;
        this.delayTime = TimeUnit.MILLISECONDS.convert(delayTime, unit);
        this.expireTime = System.currentTimeMillis() + this.delayTime;
    }

    @Override
    public long getDelay(TimeUnit unit) {
        long remainingTime = expireTime - System.currentTimeMillis();
        return unit.convert(remainingTime, TimeUnit.MILLISECONDS);
    }

    @Override
    public int compareTo(Delayed o) {
        if (this.expireTime < ((DelayedElement) o).expireTime) {
            return -1;
        }
        if (this.expireTime > ((DelayedElement) o).expireTime) {
            return 1;
        }
        return 0;
    }

    @Override
    public String toString() {
        return "DelayedElement{" +
                "element='" + element + '\'' +
                ", delayTime=" + delayTime +
                ", expireTime=" + expireTime +
                '}';
    }
}
