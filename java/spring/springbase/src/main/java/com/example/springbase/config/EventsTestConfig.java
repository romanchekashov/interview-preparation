package com.example.springbase.config;


import com.example.springbase.service.ApplicationStartedEventListener;
import org.springframework.context.annotation.Bean;

/**
 * Read more
 * https://www.baeldung.com/spring-events
 */
public class EventsTestConfig {

    @Bean
    public ApplicationStartedEventListener applicationStartedEventListener(){
        return new ApplicationStartedEventListener();
    }
}
