package com.icetea.peluca.domain.job;

import java.util.Date;
import java.util.Optional;

import javax.inject.Inject;

import com.icetea.peluca.domain.job.model.JobData;
import com.icetea.peluca.domain.job.service.JobDataService;
import com.icetea.peluca.domain.utils.DateUtils;
import com.icetea.peluca.domain.utils.Utils;

public abstract class AbstractDbQuartzJob
    extends AbstractPersistQuartzJob {

    @Inject
    private JobDataService jobDataService;

    @Override
    protected void doFinally(String jobName, Date initial, String status) {
        super.doFinally(jobName, initial, status);
        final Date end = new Date();
        int duration = DateUtils.getDiffInMillis(initial, end);
        this.jobDataService.insert(jobName, status, duration, Utils.getHostName());
    }

    public void setJobDataService(JobDataService jobDataService) {
        this.jobDataService = jobDataService;
    }

    protected final Optional<JobData> getLastExecution() {
        return this.getLastExecution(this.getJobName());
    }

    protected final Optional<JobData> getLastExecution(final String jobName) {
        return Optional.ofNullable(this.jobDataService.getJobLastExecution(jobName));
    }

}
