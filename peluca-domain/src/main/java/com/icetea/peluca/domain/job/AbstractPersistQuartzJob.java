package com.icetea.peluca.domain.job;

import static org.quartz.DateBuilder.futureDate;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import org.quartz.DateBuilder.IntervalUnit;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.JobExecutionContext;
import org.quartz.PersistJobDataAfterExecution;
import org.quartz.SchedulerException;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;

import com.icetea.peluca.domain.config.EnvironmentKeys;

@DisallowConcurrentExecution
@PersistJobDataAfterExecution
public abstract class AbstractPersistQuartzJob
    extends AbstractQuartzJob {

    public static final String JOB_DATA_MAP_KEY_FRECUENCY = "job.data.map.key.frecuency";

    @Override
    protected void preAction(JobExecutionContext context) throws SchedulerException {
        super.preAction(context);
    }

    protected String getFrecuencyPrefix() {
        return EnvironmentKeys.UPDATE_PROVIDER_PREFIX_PERIOD + this.getJobName();
    }

    protected String getEnabledPrefix() {
        return EnvironmentKeys.UPDATE_PROVIDER_PREFIX_ENABLED + this.getJobName();
    }

    protected Trigger getNewTrigger(int frecuency) {
        SimpleTrigger newTrigger = newTrigger().startAt(futureDate(1, IntervalUnit.SECOND))
            .withSchedule(simpleSchedule().repeatForever().withIntervalInSeconds(frecuency)).build();
        return newTrigger;
    }

}
