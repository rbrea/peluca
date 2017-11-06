package com.icetea.peluca.domain.exception;

public class DuplicatedRuntimeException extends IdentifiableRuntimeException {

	private static final long serialVersionUID = 1L;

	public DuplicatedRuntimeException() {
		super();
	}

	public DuplicatedRuntimeException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public DuplicatedRuntimeException(String message, Throwable cause) {
		super(message, cause);
	}

	public DuplicatedRuntimeException(String message) {
		super(message);
	}

	public DuplicatedRuntimeException(Throwable cause) {
		super(cause);
	}
	
}
