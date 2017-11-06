package com.icetea.peluca.domain.config;

import java.util.concurrent.ExecutorService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.despegar.library.threading.spring.TraceAwareExecutorServiceFactoryBean;

@Configuration
public class ThreadExecutorConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(ThreadExecutorConfiguration.class);

    @Bean(name = "threadExecutorTransformer")
    public ExecutorService getThreadExecutorTransformer(@Value("${job.transformer.executor.corepoolsize}") Integer corePoolSize,
    		@Value("${job.transformer.executor.maxpoolsize}") Integer maxPoolSize,
    				@Value("${job.transformer.executor.queuecapacity}") Integer queueCapacity) {

        TraceAwareExecutorServiceFactoryBean instance = new TraceAwareExecutorServiceFactoryBean();
        instance.setCorePoolSize(corePoolSize);
        instance.setMaxPoolSize(maxPoolSize);
        instance.setQueueCapacity(queueCapacity);

        try {
            instance.initialize();

            return instance.getObject();
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
        }

        return null;
    }

}
