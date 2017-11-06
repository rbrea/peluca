package com.icetea.peluca.domain.config.quartz;

import java.io.IOException;
import java.util.Properties;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.quartz.Trigger;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import com.icetea.peluca.domain.config.EnvironmentKeys;

//@Configuration
public class QuartzConfiguration {

    // this data source points to the database that contains Quartz tables
    @Inject
    private DataSource dataSource;
    @Inject
    private PlatformTransactionManager transactionManager;
    @Inject
    private ApplicationContext applicationContext;
    @Inject @Value("${" + EnvironmentKeys.UPDATE_PROVIDER_PREFIX_PERIOD + EnvironmentKeys.JOB_NAME_BROADCAST + "}")
    private Long interval;

    @Bean(name = "quartzProperties")
    public Properties quartzProperties() {
        PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
        propertiesFactoryBean.setLocation(new ClassPathResource("quartz.properties"));
        Properties properties;

        try {
            propertiesFactoryBean.afterPropertiesSet();
            properties = propertiesFactoryBean.getObject();
        } catch (IOException e) {
            throw new RuntimeException("Unable to load quartz.properties", e);
        }

        return properties;
    }

    @Bean(name = "jobsQuartzScheduler")
    public SchedulerFactoryBean schedulerFactoryBean(@Qualifier("quartzProperties") Properties quartzProperties) {
        SchedulerFactoryBean quartzScheduler = new SchedulerFactoryBean();

        quartzScheduler.setQuartzProperties(quartzProperties);
        quartzScheduler.setDataSource(this.dataSource);
        quartzScheduler.setTransactionManager(this.transactionManager);
        quartzScheduler.setOverwriteExistingJobs(true);

        // Custom job factory of spring with DI support for @Autowired
        AutowiringSpringBeanJobFactory jobFactory = new AutowiringSpringBeanJobFactory();
        jobFactory.setApplicationContext(this.applicationContext);
        quartzScheduler.setJobFactory(jobFactory);

        Trigger[] triggers = {
            this.broadcastJobTrigger().getObject()};

        quartzScheduler.setTriggers(triggers);

        return quartzScheduler;
    }

    @Bean
    public JobDetailFactoryBean broadcastJobDetail() {
        JobDetailFactoryBean jobDetailFactory = new JobDetailFactoryBean();
//        jobDetailFactory.setJobClass(BroadcastJob.class);
        jobDetailFactory.setDurability(true);
        return jobDetailFactory;
    }

    @Bean
    public SimpleTriggerFactoryBean broadcastJobTrigger() {
        SimpleTriggerFactoryBean triggerFactoryBean = new SimpleTriggerFactoryBean();
        triggerFactoryBean.setJobDetail(this.broadcastJobDetail().getObject());

        long repeatInterval = interval * 1000L;

        triggerFactoryBean.setRepeatInterval(repeatInterval);

        return triggerFactoryBean;
    }

}
