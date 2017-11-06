package com.icetea.peluca.domain.dao;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import javax.inject.Inject;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Projections;
import org.springframework.transaction.annotation.Transactional;

import com.despegar.ankaa.commons.persistence.dao.AbstractDAO;
import com.icetea.peluca.domain.model.Model;

@Transactional
public abstract class BasicDao<E extends Model> {

    @Inject
    private SessionFactory sessionFactory;

    public BasicDao() {
        super();
    }

    protected Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }
    
    protected Criteria createCriteria() {
		return this.getCurrentSession().createCriteria(this.getEntityClass());
	}
    
    public boolean save(E e) {
        if (e == null) {
            return false;
        }
        this.getCurrentSession().save(e);

        return true;
    }

    public boolean saveOrUpdate(E e) {
        return this.saveOrUpdate(e, false);
    }

    public boolean saveOrUpdate(E e, boolean flush) {
        if (e == null) {
            return false;
        }
        this.getCurrentSession().saveOrUpdate(e);

        if (flush) {
            this.getCurrentSession().flush();
        }
        return true;
    }

    public boolean delete(E e) {
        if (e == null) {
            return false;
        }
        this.getCurrentSession().delete(e);

        return true;
    }
    
    public List<E> findByCriteria(Criterion criterion) {
        return this.findByCriteria(criterion, null);
    }

    @SuppressWarnings("unchecked")
    public List<E> findByCriteria(Criterion criterion, Integer maxResults) {
        Criteria criteria = this.getCurrentSession().createCriteria(this.getEntityClass());
        if (maxResults != null && maxResults > 0) {
            criteria.setMaxResults(maxResults);
        }
        criteria.add(criterion);

        return criteria.list();
    }

    @SuppressWarnings("unchecked")
    public E findUniqueByCriteria(Criterion criterion) {
        Criteria criteria = this.getCurrentSession().createCriteria(this.getEntityClass());
        criteria.add(criterion);

        return (E) criteria.uniqueResult();
    }
    
    @SuppressWarnings("unchecked")
    public E findUniqueSecureByCriteria(Criterion criterion) {
        Criteria criteria = this.getCurrentSession().createCriteria(this.getEntityClass());
        criteria.add(criterion);

        return (E) criteria.uniqueResult();
    }
    
    private boolean isParameterizedAbstractDaoType(Type type) {
        if (type instanceof ParameterizedType) {
            final ParameterizedType parameterizedType = (ParameterizedType) type;
            return parameterizedType.getRawType() == AbstractDAO.class;
        }
        return false;
    }

    @SuppressWarnings("unchecked")
	protected Class<E> getEntityClass(){
    	Type type = this.getClass().getGenericSuperclass();

        while (!this.isParameterizedAbstractDaoType(type) && type instanceof Class) {
            final Class<E> typeClass = (Class<E>) type;
            type = typeClass.getGenericSuperclass();
        }
        final ParameterizedType parameterizedType = (ParameterizedType) type;
        
        return (Class<E>) parameterizedType.getActualTypeArguments()[0];
    }

    @SuppressWarnings("unchecked")
    public List<E> findAll() {
        Criteria criteria = this.createCriteria();

        return criteria.list();
    }

    @SuppressWarnings("unchecked")
    public List<E> findAll(Integer maxResults) {
        Criteria criteria = this.getCurrentSession().createCriteria(this.getEntityClass());
        if (maxResults != null && maxResults > 0) {
            criteria.setMaxResults(maxResults);
        }

        return criteria.list();
    }

    protected void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public boolean refresh(E e) { 
    	this.getCurrentSession().refresh(e);
    	
    	return true;
    }

    public boolean flush(){
    	this.getCurrentSession().flush();
    	
    	return true;
    }

    protected Integer count(Criterion criterion){
    	Criteria criteria = this.createCriteria();
    	criteria.add(criterion);
    	criteria.setProjection(Projections.rowCount());
    	
    	Number n = (Number)criteria.uniqueResult();
    	
		return (n != null) ? n.intValue() : null;
    }
    
}
