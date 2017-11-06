package com.icetea.peluca.domain.exception;

import java.util.List;

import com.despegar.library.spenttimelogging.util.StringUtils;
import com.google.common.collect.Lists;

public class IncorrectUserLoginException extends IdentifiableRuntimeException {

	private static final long serialVersionUID = 1L;
	
	private List<String> messages = Lists.newArrayList();

	public IncorrectUserLoginException() {
		super();
	}

	public IncorrectUserLoginException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public IncorrectUserLoginException(String message, Throwable cause) {
		super(message, cause);
	}

	public IncorrectUserLoginException(String message) {
		super(message);
	}

	public IncorrectUserLoginException(Throwable cause) {
		super(cause);
	}
	
	public IncorrectUserLoginException(String message, List<String> messages) {
		super(message);
		this.messages = messages;
	}

	public List<String> getMessages() {
		return messages;
	}

	public void addMessage(String message) {
		if(StringUtils.isNotBlank(message)){
			this.messages.add(message);
		}
	}
	
	public void addAllMessages(List<String> messageList){
		if(messageList != null){
			messageList.stream().forEach(m -> messages.add(m));
		}
	}
	
}
