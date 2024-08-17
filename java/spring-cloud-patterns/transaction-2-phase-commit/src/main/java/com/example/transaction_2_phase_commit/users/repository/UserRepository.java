package com.example.transaction_2_phase_commit.users.repository;

import com.example.transaction_2_phase_commit.users.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
