package com.icetea.peluca.domain.xls;

public class ExcelException
    extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ExcelException() {
        super();
    }

    public ExcelException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public ExcelException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExcelException(String message) {
        super(message);
    }

    public ExcelException(Throwable cause) {
        super(cause);
    }

}
