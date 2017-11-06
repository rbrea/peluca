package com.icetea.peluca.domain.job.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.despegar.cfa.library.utils.StringUtils;
import com.google.common.collect.Lists;
import com.icetea.peluca.api.dto.job.JobDataDto;
import com.icetea.peluca.domain.dao.BasicDao;
import com.icetea.peluca.domain.job.model.JobData;

@Repository
public class JobDataDao
    extends BasicDao<JobData> {

    @SuppressWarnings("unchecked")
    public List<JobData> find(String jobName, String serverName, String status) {
        final Criteria criteria = super.createCriteria();

        if (StringUtils.isNotBlank(jobName)) {
            criteria.add(Restrictions.eq("jobName", jobName));
        }
        if (StringUtils.isNotBlank(serverName)) {
            criteria.add(Restrictions.eq("serverName", serverName));
        }
        if (StringUtils.isNotBlank(status)) {
            criteria.add(Restrictions.eq("status", status));
        }

        return criteria.list();
    }

    @SuppressWarnings("unchecked")
    public List<JobData> findFromTo(final Date from, final Date to) {
        final Criteria criteria = super.createCriteria();

        Date toUsed = to;
        if (toUsed != null) {
            toUsed = new Date();
        }
        criteria.add(Restrictions.between("creationDate", from, to));

        return criteria.list();
    }

    public JobData findLastExecution(final String jobName) {
        Criteria criteria = super.createCriteria();

        criteria.add(Restrictions.eq("jobName", jobName));

        criteria.addOrder(Order.desc("creationDate"));
        criteria.setMaxResults(1);

        return (JobData) criteria.uniqueResult();
    }

    @SuppressWarnings("unchecked")
    public List<JobDataDto> findBetweenCreationDateGrouped(final Date from, final Date to) {
        Criteria criteria = super.createCriteria();

        criteria.setProjection(Projections.projectionList().add(Projections.groupProperty("jobName"))
            .add(Projections.groupProperty("serverName")).add(Projections.count("jobName")).add(Projections.avg("duration"))
            .add(Projections.max("creationDate")));

        if (from != null) {
            criteria.add(Restrictions.ge("creationDate", from));
        }
        if (to != null) {
            criteria.add(Restrictions.le("creationDate", to));
        }
        List<Object[]> objectList = criteria.list();

        List<JobDataDto> result = Lists.newArrayList();

        for (Object[] item : objectList) {
            JobDataDto aux = new JobDataDto(item[0].toString(), item[1].toString(), Integer.valueOf(item[2].toString()),
                item[3].toString(), Double.valueOf(item[4].toString()));
            result.add(aux);
        }

        return result;
    }

}
