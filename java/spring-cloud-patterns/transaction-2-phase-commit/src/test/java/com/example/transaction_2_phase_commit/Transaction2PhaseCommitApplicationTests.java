package com.example.transaction_2_phase_commit;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class Transaction2PhaseCommitApplicationTests {

	@Test
	void contextLoads() {
	}

}
