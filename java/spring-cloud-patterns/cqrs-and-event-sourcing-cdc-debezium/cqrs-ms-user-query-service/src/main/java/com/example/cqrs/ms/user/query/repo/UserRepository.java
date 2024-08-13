package com.example.cqrs.ms.user.query.repo;

import com.example.cqrs.ms.user.query.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {
}
