package com.icetea.peluca.api.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

public class FormatterUtils {

    private static final Pattern NON_NUMERIC = Pattern.compile("\\D");

    // FIXME Es igual a sanitizeIdWithAmp, salvo por &. Verificar si se puede unificar en uno solo
    public static String sanitizeId(String id) {
        return (id == null ? null : id.replaceAll("[^A-Za-z0-9 ]", StringUtils.EMPTY));
    }

    public static String sanitizeIdWithAmp(String id) {
        return (id == null ? null : id.replaceAll("[^A-Za-z0-9 &]", StringUtils.EMPTY));
    }

    public static String sanitizeCustomerInfo(String field) {
        if (StringUtils.isNotBlank(field)) {
            return field.replaceAll("[\"<>/&]", StringUtils.EMPTY);
        }
        return field;
    }

    public static String sanitizeTaxPayerId(String id) {
        return (id == null ? null : id.replaceAll("[^a-zA-Z0-9]", StringUtils.EMPTY));
    }

    public static String sanitizePaxId(String id) {
        return (id == null ? null : id.replaceAll("[^0-9]", StringUtils.EMPTY));
    }

    public static String sanitizeZipCode(String field) {
        if (StringUtils.isNotBlank(field)) {
            return field.replaceAll("[-/. ]", StringUtils.EMPTY);
        }
        return field;
    }

    public static List<String> sanitizeIdList(List<String> idList) {
        if (CollectionUtils.isEmpty(idList)) {
            return idList;
        }
        List<String> sanitizedList = new ArrayList<String>();
        for (String id : idList) {
            sanitizedList.add(sanitizeId(id));
        }
        return sanitizedList;
    }

    public static String sanitizeJustNumeric(String text) {
        if (text != null) {
            return NON_NUMERIC.matcher(text).replaceAll(StringUtils.EMPTY);
        }
        return text;
    }

    public static String removeSymbolsFromId(String id) {
        return id.replaceAll("\\\"", StringUtils.EMPTY).replaceAll("[\\\\]", StringUtils.EMPTY);
    }

}
