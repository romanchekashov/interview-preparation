package com.example.springbase;


import com.example.springbase.config.ConditionalOnBeanTestConfig;
import com.example.springbase.service.BadHashDistribution;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@ContextConfiguration(classes = ConditionalOnBeanTestConfig.class)
@SpringBootTest(properties = {"my.custom.value=false"})
public class ConditionalOnMissingEasyQuestionsIT {
    @Autowired
    private BadHashDistribution bean;

    @Value("${my.custom.value}")
    private String value;

    @Test
    public void conditionalOn_Demo(){
        System.out.println(value);
        Assertions.assertEquals("Condition 2", bean.getName());
    }
}
