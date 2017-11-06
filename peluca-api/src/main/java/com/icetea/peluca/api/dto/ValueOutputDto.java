package com.icetea.peluca.api.dto;

public class ValueOutputDto extends BasicOutputDto {

	private static final long serialVersionUID = 1L;

	private String value;
	
	public ValueOutputDto() {
		super();
	}
	
	public ValueOutputDto(String value) {
		super();
		this.value = value;
	}

	public ValueOutputDto(Integer status, String message, String cause) {
		super(status, message, cause);
	}

	public ValueOutputDto(Integer status) {
		super(status);
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
}
