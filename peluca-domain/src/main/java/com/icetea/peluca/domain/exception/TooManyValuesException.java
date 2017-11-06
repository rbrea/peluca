package com.icetea.peluca.domain.exception;

import java.util.Collection;

public class TooManyValuesException extends IdentifiableRuntimeException {

	private static final long serialVersionUID = 1L;

	public TooManyValuesException() {
		super();
	}

	public TooManyValuesException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public TooManyValuesException(String message, Throwable cause) {
		super(message, cause);
	}

	public TooManyValuesException(String message) {
		super(message);
	}

	public TooManyValuesException(Throwable cause) {
		super(cause);
	}
	
	public static void doThrowIf(Collection<?> input){
		doThrowIf(input, "Se han encontrado mas de 1 elemento para la condicion dada.");
	}
	
	public static void doThrowIf(Collection<?> input, String message){
		if(input != null && input.size() > 1){
			throw new TooManyValuesException(message);
		}
	}
	
}
