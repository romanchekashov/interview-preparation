package java.tutorials.concurrency;

import java.util.concurrent.Semaphore;

class Philosopher extends Thread {

    private Semaphore sem;

    // Did the philosopher eat?
    private boolean full = false;

    private String name;

    Philosopher(Semaphore sem, String name) {
        this.sem = sem;
        this.name = name;
    }

    public void run() {
        try {
            // If the philosopher has not eaten
            if (!full) {
                // Ask the semaphore for permission to run
                sem.acquire();
                System.out.println(name + " takes a seat at the table");

                // The philosopher eats
                sleep(300);
                full = true;

                System.out.println(name + " has eaten! He leaves the table");
                sem.release();

                // The philosopher leaves, making room for others
                sleep(300);
            }
        } catch (InterruptedException e) {
            System.out.println("Something went wrong!");
        }
    }

    public static void main(String[] args) {

        Semaphore sem = new Semaphore(2);
        new Philosopher(sem, "Socrates").start();
        new Philosopher(sem, "Plato").start();
        new Philosopher(sem, "Aristotle").start();
        new Philosopher(sem, "Thales").start();
        new Philosopher(sem, "Pythagoras").start();
    }
}
