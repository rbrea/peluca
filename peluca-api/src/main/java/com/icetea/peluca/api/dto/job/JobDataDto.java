package com.icetea.peluca.api.dto.job;

import com.icetea.peluca.api.dto.BasicDto;

public class JobDataDto
    extends BasicDto {

    private static final long serialVersionUID = 1L;

    private String jobName;
    private String serverName;
    private Integer count;
    private String lastExecutionDate;
    private Double durationAverage;

    public JobDataDto() {
        super();
    }

    public JobDataDto(String jobName, String serverName, Integer count, String lastExecutionDate, Double durationAverage) {
        super();
        this.jobName = jobName;
        this.serverName = serverName;
        this.count = count;
        this.lastExecutionDate = lastExecutionDate;
        this.durationAverage = durationAverage;
    }

    public String getJobName() {
        return this.jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getServerName() {
        return this.serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public Integer getCount() {
        return this.count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getLastExecutionDate() {
        return this.lastExecutionDate;
    }

    public void setLastExecutionDate(String lastExecutionDate) {
        this.lastExecutionDate = lastExecutionDate;
    }

    public Double getDurationAverage() {
        return this.durationAverage;
    }

    public void setDurationAverage(Double durationAverage) {
        this.durationAverage = durationAverage;
    }

}
