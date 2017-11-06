package com.icetea.peluca.domain.exception;

import java.util.UUID;

import com.icetea.peluca.domain.utils.Utils;

public class IdentifiableRuntimeException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	private final String hostname = Utils.getHostName(); 
	private final String uuid = UUID.randomUUID().toString();

	public IdentifiableRuntimeException() {
		super();
	}

	public IdentifiableRuntimeException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public IdentifiableRuntimeException(String message, Throwable cause) {
		super(message, cause);
	}

	public IdentifiableRuntimeException(String message) {
		super(message);
	}

	public IdentifiableRuntimeException(Throwable cause) {
		super(cause);
	}

	public String getUuid() {
		return uuid;
	}
	
	public String getHostname() {
		return hostname;
	}
	
	public String getCustomMessage(){
		StringBuilder sb = new StringBuilder();
		return sb
				.append("Hostname: ")
				.append(this.getHostname())
				.append(", ID: ")
				.append(this.getUuid())
				.append(", message: ")
				.append(this.getMessage())
					.toString();
	}
	
}
