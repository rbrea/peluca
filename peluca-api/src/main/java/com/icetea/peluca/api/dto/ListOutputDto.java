package com.icetea.peluca.api.dto;

import java.util.List;

import com.google.common.collect.Lists;

public class ListOutputDto<T extends BasicDto> extends BasicOutputDto {

	private static final long serialVersionUID = 1L;
	
	private List<T> list = Lists.newArrayList();

	public ListOutputDto() {
		super();
	}

	public ListOutputDto(Integer status, String message, String cause) {
		super(status, message, cause);
	}

	public ListOutputDto(Integer status) {
		super(status);
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}
	
	public void add(T t){
		if(t != null){
			this.list.add(t);
		}
	}
	
}
