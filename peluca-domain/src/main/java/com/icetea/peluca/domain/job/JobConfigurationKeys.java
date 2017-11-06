package com.icetea.peluca.domain.job;

public class JobConfigurationKeys {

    public static final String ENABLING_CONFIGURATION_PATH = "job.enabled.%s";
    public static final String JOB_PRODUCER_PERIOD = "job.producer.period.%s";
    public static final String JOB_PRODUCER_MAX_QUEUE = "job.producer.queue.maxsize";
    public static final String JOB_PRODUCER_PERIOD_FACTOR = "job.producer.period.factor";
    public static final String BASE_ENABLED_CONFIG_NAME = "job.enabled.";

    public static String getEnablingConfigurationPath(String processName) {
        return String.format(ENABLING_CONFIGURATION_PATH, processName.toLowerCase());
    }

    public static String getProcessProducerPeriod(String processName) {
        return String.format(JOB_PRODUCER_PERIOD, processName.toLowerCase());
    }

}
