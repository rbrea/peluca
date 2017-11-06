package com.icetea.peluca.domain.exception;

public class IdentifiableExceptionConditions {

	public static boolean checkArgument(boolean condition){
		if(!condition){
			throw new IdentifiableRuntimeException("Se ha producido un rrror no manejado. Por favor comuniquese con el administrador.");
		}
		
		return true;
	}
	
	public static boolean checkArgument(boolean condition, String message){
		if(!condition){
			throw new IdentifiableRuntimeException(message);
		}
		
		return true;
	}
	
}
