package com.example.springbase.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.ContextStartedEvent;
import org.springframework.context.event.EventListener;

public class ApplicationStartedEventListener  {
    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationStartedEventListener.class);
    @EventListener(classes = {ContextStartedEvent.class})
    public void onContextStarted() {
        LOGGER.info("ContextStartedEvent: APPLICATION STARTED AT PORT=1337");
    }
    @EventListener(classes = {ContextRefreshedEvent.class})
    public void onContextRefreshed() {
        LOGGER.info("ContextRefreshedEvent: APPLICATION STARTED AT PORT=1337");
    }
}
