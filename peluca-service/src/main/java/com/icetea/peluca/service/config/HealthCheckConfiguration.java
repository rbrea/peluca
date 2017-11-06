package com.icetea.peluca.service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.despegar.library.healthcheck.controller.HealthCheckController;
import com.despegar.library.runtime.RuntimeActivityLifecycleEvaluator;

@Configuration
public class HealthCheckConfiguration {

    @Bean
    public HealthCheckController healthCheckController() {
        HealthCheckController instance = new HealthCheckController();
        instance.setLifecycleEvaluator(new RuntimeActivityLifecycleEvaluator());

        return instance;
    }

}
