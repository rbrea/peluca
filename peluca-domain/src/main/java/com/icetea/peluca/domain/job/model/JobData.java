package com.icetea.peluca.domain.job.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.icetea.peluca.domain.model.Identifiable;

@Entity
@Table(name = "JOB_DATA")
public class JobData
    extends Identifiable {

    private static final long serialVersionUID = 1L;

    @Column(name = "CREATION_DATE", columnDefinition = "DATETIME")
    private Date creationDate;
    @Column(name = "JOB_NAME", length = 50)
    private String jobName;
    @Column(name = "DURATION")
    private int duration;
    @Column(name = "SERVER_NAME", length = 50)
    private String serverName;
    @Column(name = "STATUS", length = 50)
    private String status;

    public JobData() {
        super();
    }

    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getJobName() {
        return this.jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public int getDuration() {
        return this.duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getServerName() {
        return this.serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
