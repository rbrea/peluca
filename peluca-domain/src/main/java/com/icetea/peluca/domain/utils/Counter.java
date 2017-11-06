package com.icetea.peluca.domain.utils;

public final class Counter {
	int value = 0;
	
	public Counter() {
		super();
	}
	
	public static Counter instance(){
		return new Counter();
	}
	
	public final int increment(){
		return ++this.value;
	}
	
	public final int get(){
		return this.value;
	}
	
}
