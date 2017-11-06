package com.icetea.peluca.domain.exception;

import java.util.Collection;

import org.apache.commons.collections.CollectionUtils;

public class NotFoundException extends IdentifiableRuntimeException {

	private static final long serialVersionUID = 1L;

	public NotFoundException() {
		super();
	}

	public NotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public NotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public NotFoundException(String message) {
		super(message);
	}

	public NotFoundException(Throwable cause) {
		super(cause);
	}
	
	public static void doThrowIf(Object object){
		doThrowIf(object, "Elemento no encontrado");
	}
	
	public static void doThrowIf(Object object, String message){
		if(object == null){
			throw new NotFoundException(message);
		}
	}
	
	public static void doThrowIf(Collection<?> collection){
		doThrowIf(collection, "Elemento no encontrado");
	}
	
	public static void doThrowIf(Collection<?> collection, String message){
		if(CollectionUtils.isEmpty(collection)){
			throw new NotFoundException("Elemento no encontrado");
		}
	}

}
