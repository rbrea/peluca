package com.icetea.peluca.domain.job;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.SchedulerException;
import org.slf4j.Logger;

import com.newrelic.api.agent.NewRelic;

public abstract class AbstractQuartzJob
    implements Job {

    protected abstract Logger getLogger();

    @Override
    public final void execute(JobExecutionContext context) throws JobExecutionException {
        final String jobName = this.getJobName();

        boolean isEnabled = this.isEnabled();
        if (!isEnabled) {
            this.getLogger().trace(String.format("quartz job %s no habilitado.", jobName));
            return;
        }
        this.getLogger().info(String.format("comenzando con el quartz job %s", jobName));
        final Date initial = new Date();
        String status = "OK";
        try {
            this.preAction(context);
            this.doExecute(context);
        } catch (Exception e) {
            NewRelic.noticeError(e);
            this.getLogger().error(String.format("Error en quartz job %s. Mensaje: %s", jobName, e.getMessage()), e);
            status = "ERROR";
        } finally {
            this.doFinally(jobName, initial, status);
            this.getLogger().info(String.format("finalizando con el quartz job %s", jobName));
        }
    }

    protected boolean isEnabled() {
        return true;
    }

    protected abstract void doExecute(JobExecutionContext context);

    protected void preAction(JobExecutionContext context) throws SchedulerException {
    }

    public abstract String getJobName();

    protected void doFinally(final String jobName, final Date initial, String status) {
        // do nothing
    }

}
