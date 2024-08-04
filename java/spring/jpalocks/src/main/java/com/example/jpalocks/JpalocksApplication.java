package com.example.jpalocks;

import com.example.jpalocks.flights.DbService;
import com.example.jpalocks.flights.LockingDbService;
import org.apache.commons.lang3.function.FailableRunnable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@SpringBootApplication
public class JpalocksApplication implements CommandLineRunner {

	@Autowired
//	@Qualifier("dbService")
//	@Qualifier("pessimisticLockingDbService")
	@Qualifier("pessimisticLockingDeadlockDbService")
	private LockingDbService dbService;

	public static void main(String[] args) {
		SpringApplication.run(JpalocksApplication.class, args);
	}

	@Override
	public void run(String... args) {
		ExecutorService executor = Executors.newFixedThreadPool(2);
		executor.execute(safeRunnable(dbService::changeFlight1));
		executor.execute(safeRunnable(dbService::changeFlight2));
		executor.shutdown();
	}

	private Runnable safeRunnable(FailableRunnable<Exception> runnable) {
		return () -> {
			try {
				runnable.run();
			} catch (Exception e) {
				e.printStackTrace();
			}
		};
	}

}
