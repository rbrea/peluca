package com.icetea.peluca.domain.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.StringUtils;

import com.google.common.base.Preconditions;
import com.icetea.peluca.domain.exception.IdentifiableRuntimeException;

public final class DateUtils
    extends org.apache.commons.lang3.time.DateUtils {

    public static final String DEFAULT_PATTERN = "dd/MM/yyyy HH:mm:ss";
    public static final String FRENCH_PATTERN = "dd/MM/yyyy";
    public static final String ISO8601_PATTERN = "yyyyMMdd'T'HHmmss'Z'";

    public static String toDate(Date date, String pattern, String timezone) {
        if (date == null) {
            return null;
        }
        Preconditions.checkArgument(StringUtils.isNotBlank(pattern), "pattern is required");

        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        if (StringUtils.isNotBlank(timezone)) {
            TimeZone tz = TimeZone.getTimeZone(timezone);
            sdf.setTimeZone(tz);
        }

        return sdf.format(date);
    }

    public static String toDate(Date date, String pattern) {
        return toDate(date, pattern, null);
    }

    public static String toDate(Date date) {
        return toDate(date, DEFAULT_PATTERN);
    }

    public static Date parseDate(String value, String pattern) {
        if (StringUtils.isBlank(value)) {
            return null;
        }

        try {
            return org.apache.commons.lang3.time.DateUtils.parseDate(value, pattern);
        } catch (ParseException e) {
            throw new RuntimeException("cannot parse to Date value: " + value, e);
        }
    }

    public static Date parseDate(String value) {
        return parseDate(value, DEFAULT_PATTERN);
    }

    public static String convertDateToTimeZone(String value, String timezone) {
        Date d = parseDate(value);

        return toDate(d, DateUtils.DEFAULT_PATTERN, timezone);
    }

    public static Date lastSecondOfDay(Date date) {
        if (date == null) {
            return null;
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);

        return calendar.getTime();
    }

    public static Date now() {
        return new Date();
    }

    public static Date validateAndNormalizeDates(Date startDate, Date endDate) {
        Date end = endDate;
        if (startDate != null) {

            if (endDate == null) {
                end = new Date();
            }
            if (startDate.after(end)) {
                throw new IdentifiableRuntimeException("La Fecha Desde debe ser menor que la Fecha Hasta");
            }

            long diff = end.getTime() - startDate.getTime();
            long days = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);

            if (days > 30) {
                throw new IdentifiableRuntimeException("El rango de fechas no puede superar los 30 días.");
            }
            // llevo la fecha hasta a 23:59:59 para tomar todo lo q este durante ese dia ...
            end = DateUtils.lastSecondOfDay(end);
        }

        return end;
    }

    public static Date truncate(Date date) {
        if (date == null) {
            return null;
        }
        return truncate(date, Calendar.DAY_OF_MONTH);
    }

    public static boolean isValidStringDate(String date) {

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        dateFormat.setLenient(false);
        try {
            dateFormat.parse(date.trim());
        } catch (ParseException pe) {
            return false;
        }
        return true;

    }

    public static boolean isSameOrGreater(Date firstDate, Date secondDate) {
        return DateUtils.isSameDay(firstDate, secondDate) || firstDate.compareTo(secondDate) > 0;
    }

    public static String currentDate() {
        return currentDate(DEFAULT_PATTERN);
    }

    public static String currentDate(String pattern) {
        return toDate(now(), pattern);
    }

    public static Date dateFromIso(String source) {
        if (StringUtils.isBlank(source)) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(ISO8601_PATTERN);
        try {
            return sdf.parse(source);
        } catch (ParseException e) {
        }

        return null;
    }

    public static String dateToIso(Date date) {
        if (date == null) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(ISO8601_PATTERN);

        return sdf.format(date);
    }

    public static Date dateFromBothParsing(String source) {
        Date dateToUse = null;
        try {
            dateToUse = DateUtils.parseDate(source, DateUtils.FRENCH_PATTERN);
        } catch (Exception e) {
            dateToUse = DateUtils.dateFromIso(source);
        }

        return dateToUse;
    }

    public static boolean isBefore(Date value, Date comparedValue) {
        if (value == null || comparedValue == null) {
            return false;
        }

        return value.before(comparedValue);
    }

    public static boolean isNotBefore(Date value, Date comparedValue) {
        return !isBefore(value, comparedValue);
    }

    public static int getDiffInHours(final Date from, final Date until) {
        return getDiffInMinutes(from, until) / 60;
    }

    public static int getDiffInMinutes(final Date from, final Date until) {
        return getDiffInSeconds(from, until) / 60;
    }

    public static int getDiffInSeconds(final Date from, final Date until) {
        if (from == null || until == null) {
            return -9999;
        }

        long secondsBetween = (until.getTime() - from.getTime()) / 1000;

        return NumberUtils.createInteger(String.valueOf(secondsBetween));
    }

    public static int getDiffInMillis(final Date from, final Date until) {
        if (from == null || until == null) {
            return -9999;
        }

        long millisBetween = until.getTime() - from.getTime();

        return NumberUtils.createInteger(String.valueOf(millisBetween));
    }
}
