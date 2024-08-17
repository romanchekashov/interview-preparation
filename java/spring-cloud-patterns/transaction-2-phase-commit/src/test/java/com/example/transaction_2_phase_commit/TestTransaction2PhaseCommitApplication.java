package com.example.transaction_2_phase_commit;

import org.springframework.boot.SpringApplication;

public class TestTransaction2PhaseCommitApplication {

	public static void main(String[] args) {
		SpringApplication.from(Transaction2PhaseCommitApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
