package com.example.jpalocks;

import org.springframework.boot.SpringApplication;

public class TestJpalocksApplication {

	public static void main(String[] args) {
		SpringApplication.from(JpalocksApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
