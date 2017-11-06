package com.icetea.peluca.domain.dao;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import javax.inject.Named;

import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.RevisionType;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;

import com.google.common.collect.ComparisonChain;
import com.google.common.collect.Lists;
import com.icetea.peluca.domain.bo.AuditedBO;
import com.icetea.peluca.domain.model.Identifiable;
import com.icetea.peluca.domain.model.audited.AuditedRevisionEntity;
import com.icetea.peluca.domain.utils.DateUtils;

@Named
public abstract class AuditedDao<E extends Identifiable, B extends AuditedBO<E>>
    extends BasicIdentificableDao<E> {

    @SuppressWarnings("unchecked")
    public List<B> findRevisions(Long id) {

        List<B> result = Lists.newArrayList();

        AuditReader reader = AuditReaderFactory.get(this.getCurrentSession());

        AuditQuery query = reader.createQuery().forRevisionsOfEntity(this.getEntityClass(), false, true)
            .add(AuditEntity.id().eq(id)).addOrder(AuditEntity.revisionNumber().asc());

        List<Object[]> rawResults = query.getResultList();

        if (rawResults == null) {
            return Lists.newArrayList();
        }

        for (Object[] data : rawResults) {
            // data[0] == this.getEntityClass instance
            // data[1] == DefaultRevisionEntity instance
            // data[2] == RevisionType instance
            int rev = ((AuditedRevisionEntity) data[1]).getId();
            Date revDate = ((AuditedRevisionEntity) data[1]).getRevisionDate();
            String username = ((AuditedRevisionEntity) data[1]).getUsername();
            String revType = ((RevisionType) data[2]).name();
            result.add(this.createBo((E) data[0], rev, revDate, revType, username));
        }

        return result;
    }

    @SuppressWarnings("unchecked")
    public List<B> findRevisions() {

        List<B> result = Lists.newArrayList();

        AuditReader reader = AuditReaderFactory.get(this.getCurrentSession());

        AuditQuery query = reader.createQuery().forRevisionsOfEntity(this.getEntityClass(), false, true)
            .addOrder(AuditEntity.revisionNumber().asc());

        List<Object[]> rawResults = query.getResultList();

        if (rawResults == null) {
            return Lists.newArrayList();
        }

        for (Object[] data : rawResults) {
            // data[0] == this.getEntityClass instance
            // data[1] == DefaultRevisionEntity instance
            // data[2] == RevisionType instance
            int rev = ((AuditedRevisionEntity) data[1]).getId();
            Date revDate = ((AuditedRevisionEntity) data[1]).getRevisionDate();
            String username = ((AuditedRevisionEntity) data[1]).getUsername();
            String revType = ((RevisionType) data[2]).name();
            result.add(this.createBo((E) data[0], rev, revDate, revType, username));
        }

        Collections.sort(result, new Comparator<B>() {
            @Override
            public int compare(B o1, B o2) {
                return ComparisonChain.start().compare(o2.getRev(), o1.getRev()).result(); // Integer.valueOf(o2.getRev()).compareTo(o1.getRev());
            }
        });

        Collections.sort(result, new Comparator<B>() {
            @Override
            public int compare(B o1, B o2) {
                return ComparisonChain.start().compare(o1.getRevType(), o2.getRevType()).result(); // Integer.valueOf(o2.getRev()).compareTo(o1.getRev());
            }
        });

        return result;
    }

    @SuppressWarnings("unchecked")
    public List<B> findRevisionsByCode(String code, String field) {

        List<B> result = Lists.newArrayList();

        AuditReader reader = AuditReaderFactory.get(this.getCurrentSession());

        AuditQuery query = reader.createQuery().forRevisionsOfEntity(this.getEntityClass(), false, true)
            .add(AuditEntity.property(field).eq(code)).addOrder(AuditEntity.revisionNumber().asc());

        List<Object[]> rawResults = query.getResultList();
        if (rawResults == null) {
            return Lists.newArrayList();
        }

        for (Object[] data : rawResults) {
            // data[0] == this.getEntityClass instance
            // data[1] == DefaultRevisionEntity instance
            // data[2] == RevisionType instance
            int rev = ((AuditedRevisionEntity) data[1]).getId();
            Date revDate = ((AuditedRevisionEntity) data[1]).getRevisionDate();
            String username = ((AuditedRevisionEntity) data[1]).getUsername();
            String revType = ((RevisionType) data[2]).name();
            result.add(this.createBo((E) data[0], rev, revDate, revType, username));
        }

        return result;
    }

    @SuppressWarnings("unchecked")
    public List<B> findRevisionsByCodeInteger(int code, String field) {

        List<B> result = Lists.newArrayList();

        AuditReader reader = AuditReaderFactory.get(this.getCurrentSession());

        AuditQuery query = reader.createQuery().forRevisionsOfEntity(this.getEntityClass(), false, true)
            .add(AuditEntity.property(field).eq(code)).addOrder(AuditEntity.revisionNumber().asc());

        List<Object[]> rawResults = query.getResultList();

        if (rawResults == null) {
            return Lists.newArrayList();
        }

        for (Object[] data : rawResults) {
            // data[0] == this.getEntityClass instance
            // data[1] == DefaultRevisionEntity instance
            // data[2] == RevisionType instance
            int rev = ((AuditedRevisionEntity) data[1]).getId();
            Date revDate = ((AuditedRevisionEntity) data[1]).getRevisionDate();
            String username = ((AuditedRevisionEntity) data[1]).getUsername();
            String revType = ((RevisionType) data[2]).name();
            result.add(this.createBo((E) data[0], rev, revDate, revType, username));
        }

        return result;
    }


    protected abstract B getBoInstance(E entity);

    protected B createBo(E entity, int rev, Date revDate, String revType, String username) {
        B bo = this.getBoInstance(entity);
        this.fillBo(bo, rev, revDate, revType, username);

        return bo;
    }

    protected boolean fillBo(B bo, int rev, Date revDate, String revType, String username) {
        bo.setRev(rev);
        bo.setRevDate(DateUtils.toDate(revDate));
        bo.setRevType(revType);
        bo.setUsername(username);

        return true;
    }

    @SuppressWarnings("unchecked")
    public List<B> findRevisionsByRelated(Long relatedId, String relatedPropertyName) {

        List<B> result = Lists.newArrayList();

        AuditReader reader = AuditReaderFactory.get(this.getCurrentSession());

        AuditQuery query = reader.createQuery().forRevisionsOfEntity(this.getEntityClass(), false, true)
            .add(AuditEntity.relatedId(relatedPropertyName).eq(relatedId)).addOrder(AuditEntity.revisionNumber().asc());

        List<Object[]> rawResults = query.getResultList();

        if (rawResults == null) {
            return Lists.newArrayList();
        }

        for (Object[] data : rawResults) {
            // data[0] == this.getEntityClass instance
            // data[1] == DefaultRevisionEntity instance
            // data[2] == RevisionType instance
            int rev = ((AuditedRevisionEntity) data[1]).getId();
            Date revDate = ((AuditedRevisionEntity) data[1]).getRevisionDate();
            String username = ((AuditedRevisionEntity) data[1]).getUsername();
            String revType = ((RevisionType) data[2]).name();
            result.add(this.createBo((E) data[0], rev, revDate, revType, username));
        }

        return result;
    }

    @SuppressWarnings("unchecked")
    public List<B> findRevisionsByRelated(String relatedId, String relatedPropertyName) {

        List<B> result = Lists.newArrayList();

        AuditReader reader = AuditReaderFactory.get(this.getCurrentSession());

        AuditQuery query = reader.createQuery().forRevisionsOfEntity(this.getEntityClass(), false, true)
            .add(AuditEntity.relatedId(relatedPropertyName).eq(relatedId)).addOrder(AuditEntity.revisionNumber().asc());

        List<Object[]> rawResults = query.getResultList();

        if (rawResults == null) {
            return Lists.newArrayList();
        }

        for (Object[] data : rawResults) {
            // data[0] == this.getEntityClass instance
            // data[1] == DefaultRevisionEntity instance
            // data[2] == RevisionType instance
            int rev = ((AuditedRevisionEntity) data[1]).getId();
            Date revDate = ((AuditedRevisionEntity) data[1]).getRevisionDate();
            String username = ((AuditedRevisionEntity) data[1]).getUsername();
            String revType = ((RevisionType) data[2]).name();
            result.add(this.createBo((E) data[0], rev, revDate, revType, username));
        }

        return result;
    }

}
