package com.icetea.peluca.domain.service;

import java.io.Serializable;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.commons.collections4.CollectionUtils;

import com.google.common.base.Preconditions;
import com.icetea.peluca.domain.dao.BasicDao;
import com.icetea.peluca.domain.model.Model;
import com.icetea.peluca.domain.transformer.DtoModelTransformer;

@Transactional
public abstract class BasicTransactionalService<M extends Model, D extends Serializable, DAO extends BasicDao<M>, T extends DtoModelTransformer<D, M>> 
	extends BasicService<D> {

	private transient final T transformer;
	private transient final DAO dao;
	
	public BasicTransactionalService(T transformer, DAO dao) {
		super();
		this.transformer = transformer;
		this.dao = dao;
	}

	public List<D> searchAll(){
		return this.transformer.transformAllTo(
				this.dao.findAll());
	}
	
	public List<D> searchAll(Integer maxResults){
		return this.transformer.transformAllTo(
				this.dao.findAll(maxResults));
	}
	
	protected DAO getDao() {
		return dao;
	}
	
	protected T getTransformer() {
		return transformer;
	}	
	
	public boolean insert(D dto){
		M model = this.transformer.transform(dto);
		this.doInsert(model);
		
		return this.dao.save(model);
	}
	
	public boolean update(D dto){
		Preconditions.checkArgument(dto != null, "Error inesperado al querer actualizar");
		
		return this.dao.saveOrUpdate(this.transformer.transform(dto));
	}
	
	protected void doInsert(M model){
		// do nothing
	}
	
	public List<D> getAll() {
        return this.getTransformer().transformAllTo(this.getDao().findAll());
    }
	
	public void deleteAll() {
        List<M> list = this.getDao().findAll();
		if(CollectionUtils.isNotEmpty(list)){
			list.stream().forEach(this.getDao()::delete);
		}
        this.getDao().flush();
    }
	
}
