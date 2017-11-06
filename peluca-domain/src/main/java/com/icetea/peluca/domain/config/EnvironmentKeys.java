package com.icetea.peluca.domain.config;

public interface EnvironmentKeys {

    String NOTIFIER_MAIL_FROM_ADDRESS = "notifier.mail.from.address";
    String NOTIFIER_MAIL_TO = "notifier.mail.to";
    String NOTIFIER_APP_ENVIRONMENT = "notifier.app.environment";
    String ATP3_ENDPOINT = "atp3.endpoint";
    String ATP3_URI_CALLBACK_HOST = "atp3.callback.host";
    String ATP3_URI_CALLBACK_CONTEXT_ROOT = "atp3.callback.context-root";
    String SERVICE_ENVIRONMENT = "mixer.service.environment";
    String ATP_SERVICE_FILTER_PATTERNS = "atp.service.filterPatterns";

    String UPDATE_PROVIDER_PREFIX_PERIOD = "job.producer.period.";
    String UPDATE_PROVIDER_PREFIX_ENABLED = "job.enabled.";

    String JOB_NAME_BROADCAST = "broadcast";
    String JOB_NAME_LEGAL_ENTITY = "legal-entity-oas-oracle";
    String JOB_NAME_EVENT_REPORT = "event-report";

    String MIGRATION_HOST = "mixer.migration.host";
    String MIGRATION_TOKEN = "mixer.migration.token";

    String ENVIRONMENT_PROD_VALUE = "environment.prod.value";
    String EVENT_REPORT_MAX_DAYS = "event.report.max.days";

}
