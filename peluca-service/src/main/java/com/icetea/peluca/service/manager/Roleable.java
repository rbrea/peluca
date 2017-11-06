package com.icetea.peluca.service.manager;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.despegar.cfa.library.utils.StringUtils;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Roleable {

    String object() default StringUtils.EMPTY;

    String[] permissions() default RoleableManager.PERMISO_LECTURA;

}
