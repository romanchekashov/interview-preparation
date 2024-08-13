package com.example.cqrs.ms.user.command.handler;

import com.example.cqrs.ms.user.dto.UserEvent;

public interface UserEventHandler {
    public boolean publishUserEvent(UserEvent event);
}
