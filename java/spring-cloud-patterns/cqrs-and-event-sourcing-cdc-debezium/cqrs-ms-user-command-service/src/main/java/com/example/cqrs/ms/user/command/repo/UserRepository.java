package com.example.cqrs.ms.user.command.repo;

import com.example.cqrs.ms.user.command.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {
}
