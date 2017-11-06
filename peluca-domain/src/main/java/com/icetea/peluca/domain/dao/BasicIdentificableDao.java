package com.icetea.peluca.domain.dao;

import com.icetea.peluca.domain.model.Identifiable;

public abstract class BasicIdentificableDao<E extends Identifiable> extends BasicDao<E> {

	@SuppressWarnings("unchecked")
    public E findById(Long id) {
        return (E) this.getCurrentSession().get(this.getEntityClass(), id);
    }
	
    public boolean deleteById(Long id) {
        E e = this.findById(id);
        if (e != null) {
            this.delete(e);
        
            return true;
        }
        
        return false;
    }
	
}
