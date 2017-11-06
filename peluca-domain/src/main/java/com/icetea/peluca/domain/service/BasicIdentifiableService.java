package com.icetea.peluca.domain.service;

import java.util.List;

import org.hibernate.criterion.Restrictions;

import com.google.common.base.Preconditions;
import com.icetea.peluca.api.dto.IdentifiableDto;
import com.icetea.peluca.domain.dao.BasicIdentificableDao;
import com.icetea.peluca.domain.exception.NotFoundException;
import com.icetea.peluca.domain.model.Identifiable;
import com.icetea.peluca.domain.transformer.DtoModelTransformer;


public abstract class BasicIdentifiableService<M extends Identifiable, D extends IdentifiableDto, DAO extends BasicIdentificableDao<M>, T extends DtoModelTransformer<D, M>>
    extends BasicTransactionalService<M, D, DAO, T> {

    public BasicIdentifiableService(T transformer, DAO dao) {
        super(transformer, dao);
    }

    public D searchById(Long id) {
        return this.getTransformer().transform(this.getDao().findUniqueByCriteria(Restrictions.idEq(id)));
    }

    public boolean remove(Long id) {
        M e = this.getDao().findUniqueByCriteria(Restrictions.idEq(id));
        if (e == null) {
            return false;
        }

        return this.getDao().delete(e);
    }

    @Override
    public boolean update(D dto) {
        Preconditions.checkArgument(dto != null, "Error inesperado al querer actualizar");
        Preconditions.checkArgument(dto.getId() != null, "ID es requerido");

        M model = this.getDao().findById(dto.getId());
        if (model == null) {
            throw new NotFoundException("No se ha encontrado elemento con id: " + dto.getId());
        }
        this.fill(model, dto);

        return this.getDao().saveOrUpdate(model);
    }

    protected void fill(M model, D dto) {
    	if(model == null || dto == null){
    		return;
    	}
        model.setId(dto.getId());
    }

    protected List<D> transformAllTo(List<M> entities) {
        return this.getTransformer().transformAllTo(entities);
    }
    
    public boolean remove(List<Long> idList) {
        if (idList == null) {
            return false;
        }
        for (Long id : idList) {
            this.remove(id);
        }

        return true;
    }

}
