package com.example.sync;

import org.springframework.boot.SpringApplication;

public class TestSyncApplication {

	public static void main(String[] args) {
		SpringApplication.from(SyncApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
