package com.icetea.peluca.service.aspect.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.SerializationFeature;

@Service
@Aspect
public class LoggerAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggerAspect.class);
    private static final String LOG_FORMAT = "#%s.%s(%s): in %s[msec]s";

    private ObjectMapper mapper = new ObjectMapper().setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE)
        .configure(SerializationFeature.INDENT_OUTPUT, true);

    @Pointcut("execution(@Loggeable * com.despegar..*.*(..))")
    void log() {
        // Pointcut method
    }

    @Around("log()")
    public Object verify(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            final Object result = joinPoint.proceed();
            System.currentTimeMillis();
            this.mapper.writeValueAsString(result);
            return result;
        } catch (RuntimeException e) {
            System.currentTimeMillis();
            this.mapper.writeValueAsString(e);
            throw e;
        } finally {
            LOGGER
                .info(String.format(LOG_FORMAT, MethodSignature.class.cast(joinPoint.getSignature()).getDeclaringTypeName(),
                    MethodSignature.class.cast(joinPoint.getSignature()).getMethod().getName(), joinPoint.getArgs(),
                    System.currentTimeMillis() - start));
        }
    }

}
