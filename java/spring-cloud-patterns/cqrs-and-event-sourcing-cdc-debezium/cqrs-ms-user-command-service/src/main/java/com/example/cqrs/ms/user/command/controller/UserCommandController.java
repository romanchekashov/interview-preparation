package com.example.cqrs.ms.user.command.controller;

import com.example.cqrs.ms.user.command.dto.UserInput;
import com.example.cqrs.ms.user.command.entity.UserEntity;
import com.example.cqrs.ms.user.command.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class UserCommandController {

    private final static Logger LOGGER = LoggerFactory.getLogger(UserCommandController.class);

    private final UserService userService;

    public UserCommandController(UserService userService) {
        this.userService = userService;
    }

    @MutationMapping
    public UserEntity createUser(@Argument UserInput user) {
        UserEntity userCreated = new UserEntity(UUID.randomUUID().toString(), user.firstName(), user.lastName(), user.dateOfBirth(), user.identityNumber());
        userService.createUser(userCreated);
        LOGGER.info("User created: {}", userCreated);
        return userCreated;
    }

    @MutationMapping
    public String deleteUser(@Argument String id) {
        userService.deleteUserById(id);
        LOGGER.info("User deleted: {}", id);
        return id;
    }

}
