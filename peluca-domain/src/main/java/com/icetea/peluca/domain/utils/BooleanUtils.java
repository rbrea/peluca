package com.icetea.peluca.domain.utils;

import com.icetea.peluca.domain.exception.IdentifiableRuntimeException;

public class BooleanUtils
    extends org.apache.commons.lang3.BooleanUtils {

    public static final String SPANISH_TRUE_WORD = "SI";
    public static final String SPANISH_FALSE_WORD = "NO";

    public static Boolean ynToBoolean(String input) {
        return ynToBoolean(input, StringUtils.EMPTY);
    }

    public static Boolean ynToBoolean(String input, String errorMessage) {
        if (StringUtils.isEmpty(input)) {
            return false;
        }
        if (StringUtils.equalsIgnoreCase(StringUtils.trim(input), "y")) {
            return true;
        } else if (StringUtils.equalsIgnoreCase(StringUtils.trim(input), "n")) {
            return false;
        }
        String message = String.format("input: %s incorrect. Please use y or n value.", input);
        if (StringUtils.isNotBlank(errorMessage)) {
            message = errorMessage;
        }
        throw new IdentifiableRuntimeException(message);
    }

}
