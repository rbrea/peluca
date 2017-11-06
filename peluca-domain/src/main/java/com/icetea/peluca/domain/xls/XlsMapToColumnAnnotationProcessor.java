package com.icetea.peluca.domain.xls;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;

import javax.inject.Named;

import ma.glasnost.orika.MappingException;

@Named
public class XlsMapToColumnAnnotationProcessor {

    @SuppressWarnings("rawtypes")
    public <T extends ColumnMapable> void process(T obj, Object value, int columnNumber) {
        Class clazz = obj.getClass();
        for (Field field : clazz.getDeclaredFields()) {
            for (Annotation a : field.getAnnotations()) {
                if (a.annotationType() == XlsMapToColumn.class) {
                    XlsMapToColumn x = (XlsMapToColumn) a;
                    int column = x.column();
                    if (columnNumber == column) {
                        try {
                            field.setAccessible(true);
                            field.set(obj, value);
                            field.setAccessible(false);
                            break;
                        } catch (IllegalArgumentException | IllegalAccessException e) {
                            throw new MappingException(
                                "unhandled exception when it tried to process XlsMapToColumn annotations", e);
                        }
                    }
                }
            }
        }
    }
}
