package com.icetea.peluca.domain.transformer;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.NotImplementedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.Lists;
import com.icetea.peluca.domain.exception.IdentifiableRuntimeException;
import com.icetea.peluca.domain.model.Model;

public abstract class DtoModelTransformer<D extends Serializable, E extends Model> {

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(DtoModelTransformer.class);
	
    protected static final String DEFAULT_USERNAME = "CFA-MIXER-DEFAULT";

    public E transform(D dto) {
        if (dto == null) {
            return null;
        }
        return this.doTransform(dto);
    }

    public D transform(E e) {
        if (e == null) {
            return null;
        }
        return this.doTransform(e);
    }

    protected E doTransform(D dto) {
        throw new NotImplementedException("method not implemented yet");
    }

    protected abstract D doTransform(E e);


    public final List<E> transformAllFrom(List<D> dtos) {
        if (dtos == null) {
            return Lists.newArrayList();
        }
        List<E> result = dtos.stream().map(d -> this.doTransform(d)).collect(Collectors.toList());

        return result;
    }

    public List<D> transformAllTo(List<E> entities) {
        if (entities == null) {
            return Lists.newArrayList();
        }
        List<D> result = entities.stream().map(e -> this.doTransform(e)).collect(Collectors.toList());

        return result;
    }
    
	protected D doTransform(E e, String timezone) {
		throw new IdentifiableRuntimeException("No implementado");
	}

	public final List<D> transformAllTo(List<E> entities, String timezone) {
        if (entities == null) {
            return Lists.newArrayList();
        }
        List<D> result = entities.stream().map(e -> this.doTransform(e, timezone)).collect(Collectors.toList());

        return result;
    }
	
	public final D transform(E e, String timezone) {
        if (e == null) {
            return null;
        }
        return this.doTransform(e, timezone);
    }

}
