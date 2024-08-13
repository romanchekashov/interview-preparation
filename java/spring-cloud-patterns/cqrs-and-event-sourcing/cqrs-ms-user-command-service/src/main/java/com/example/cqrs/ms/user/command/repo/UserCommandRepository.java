package com.example.cqrs.ms.user.command.repo;

import com.example.cqrs.ms.user.command.entity.UserCommand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCommandRepository extends JpaRepository<UserCommand, String> {

}
