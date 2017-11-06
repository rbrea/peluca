package com.icetea.peluca.api.dto;

public class CodeDescriptionDto extends BasicDto {

	private static final long serialVersionUID = 1L;

	private String code;
	private String description;
	
	public CodeDescriptionDto() {
		super();
	}
	
	public CodeDescriptionDto(String code, String description) {
		super();
		this.code = code;
		this.description = description;
	}

	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
}
