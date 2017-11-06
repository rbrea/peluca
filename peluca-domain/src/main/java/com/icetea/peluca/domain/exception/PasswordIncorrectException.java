package com.icetea.peluca.domain.exception;

public class PasswordIncorrectException extends IdentifiableRuntimeException {

	private static final long serialVersionUID = 1L;

	public PasswordIncorrectException() {
		super();
	}

	public PasswordIncorrectException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public PasswordIncorrectException(String message, Throwable cause) {
		super(message, cause);
	}

	public PasswordIncorrectException(String message) {
		super(message);
	}

	public PasswordIncorrectException(Throwable cause) {
		super(cause);
	}

}
