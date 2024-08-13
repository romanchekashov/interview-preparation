package com.example.cqrs.ms.user.command.service;

import com.example.cqrs.ms.user.command.entity.UserEntity;

public interface UserService {

    public UserEntity createUser(UserEntity user);

    public boolean deleteUserById(String id);

}
