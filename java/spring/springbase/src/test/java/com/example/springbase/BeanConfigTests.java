package com.example.springbase;

import com.example.springbase.config.BeanLifecycleBean;
import com.example.springbase.config.SimpleTestConfig;
import com.example.springbase.service.BadHashDistribution;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

/**
 * https://www.baeldung.com/spring-bean
 * https://www.baeldung.com/spring-application-context
 * https://www.baeldung.com/spring-beanfactory
 * https://www.baeldung.com/spring-annotations-resource-inject-autowire
 */
@ContextConfiguration(classes = SimpleTestConfig.class)
@SpringBootTest
public class BeanConfigTests {

    @Autowired
    private BeanFactory beanFactory;

    @Autowired
    private BeanLifecycleBean beanLifecycleBeanPrototype;

    @Autowired
    private BadHashDistribution badHashDistributionSingleton;

    @Test
    public void shouldInjectValue() {
        Assertions.assertNotNull(beanLifecycleBeanPrototype);
    }

    @Test
    public void shouldGetDifferentBeans() {
        BeanLifecycleBean bean = beanFactory.getBean(BeanLifecycleBean.class);
        Assertions.assertNotNull(beanLifecycleBeanPrototype);
        Assertions.assertNotEquals(bean, beanLifecycleBeanPrototype);
    }

    @Test
    public void shouldGetSameBeans() {
        BadHashDistribution bean = beanFactory.getBean(BadHashDistribution.class);
        Assertions.assertNotNull(badHashDistributionSingleton);
        Assertions.assertEquals(bean, badHashDistributionSingleton);
    }
}
