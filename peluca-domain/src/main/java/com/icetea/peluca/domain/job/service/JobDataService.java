package com.icetea.peluca.domain.job.service;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.icetea.peluca.api.dto.job.JobDataDto;
import com.icetea.peluca.domain.exception.IdentifiableExceptionConditions;
import com.icetea.peluca.domain.job.dao.JobDataDao;
import com.icetea.peluca.domain.job.model.JobData;
import com.icetea.peluca.domain.service.TransactionalService;
import com.icetea.peluca.domain.utils.DateUtils;
import com.icetea.peluca.domain.utils.StringUtils;

@Service
public class JobDataService
    extends TransactionalService<JobDataDto> {

    private final JobDataDao jobDataDao;

    @Inject
    public JobDataService(JobDataDao jobDataDao) {
        super();
        this.jobDataDao = jobDataDao;
    }

    public boolean insert(final String jobName, final String status, final int duration, final String serverName) {

        IdentifiableExceptionConditions.checkArgument(StringUtils.isNotBlank(jobName), "jobName is required");
        IdentifiableExceptionConditions.checkArgument(StringUtils.isNotBlank(status), "status is required");
        IdentifiableExceptionConditions.checkArgument(StringUtils.isNotBlank(serverName), "serverName is required");

        JobData jobData = new JobData();
        jobData.setJobName(jobName);
        jobData.setServerName(serverName);
        jobData.setStatus(status);
        jobData.setDuration(duration);
        jobData.setCreationDate(new Date());

        this.jobDataDao.save(jobData);

        return true;
    }

    public JobData getJobLastExecution(final String jobName) {
        IdentifiableExceptionConditions.checkArgument(StringUtils.isNotBlank(jobName), "jobName is required");
        return this.jobDataDao.findLastExecution(jobName);
    }

    public List<JobDataDto> getBetweenDates(final String dateFrom, final String dateTo) {

        Date from = DateUtils.parseDate(dateFrom, DateUtils.FRENCH_PATTERN);
        Date to = DateUtils.parseDate(dateTo, DateUtils.FRENCH_PATTERN);

        return this.jobDataDao.findBetweenCreationDateGrouped(from, to);
    }

}
