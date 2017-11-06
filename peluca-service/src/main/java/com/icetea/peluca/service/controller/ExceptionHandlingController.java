package com.icetea.peluca.service.controller;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.icetea.peluca.api.dto.BasicOutputDto;
import com.icetea.peluca.api.dto.BasicOutputDto.BasicOutputType;
import com.icetea.peluca.domain.exception.IdentifiableRuntimeException;
import com.icetea.peluca.domain.exception.IncorrectUserLoginException;
import com.icetea.peluca.domain.exception.NotFoundException;
import com.icetea.peluca.domain.exception.TooManyValuesException;

public abstract class ExceptionHandlingController {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public @ResponseBody BasicOutputDto illegalArgumentError(HttpServletRequest req, Exception exception) {
        this.getOwnLogger().info("Url: " + req.getRequestURL() + " raised: " + exception.getMessage(), exception);

        BasicOutputDto dto = new BasicOutputDto(BasicOutputType.ILLEGAL_ARGUMENTS.getId());
        dto.setMessage("Bad Request, illegal arguments received.");
        dto.setCause(exception.getMessage());

        return dto;
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IncorrectUserLoginException.class)
    public @ResponseBody BasicOutputDto incorrectUserLoginException(HttpServletRequest req, Exception exception) {

        IncorrectUserLoginException eule = (IncorrectUserLoginException) exception;

        BasicOutputDto dto = new BasicOutputDto(BasicOutputType.UNHANDLED_ERROR.getId());
        dto.setMessage(eule.getMessage());
        dto.setCause(exception.getMessage());

        this.getOwnLogger().info("Algo ocurrio al qerer loguearse. Mensaje: " + eule.getMessage());

        return dto;
    }

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public @ResponseBody BasicOutputDto unhandledError(HttpServletRequest req, Exception exception) {
        this.getOwnLogger().error("Url: " + req.getRequestURL() + " raised: " + exception.getMessage(), exception);

        BasicOutputDto dto = new BasicOutputDto(BasicOutputType.UNHANDLED_ERROR.getId());
        dto.setMessage("An unhandled error has ocurred.");
        dto.setCause(exception.getMessage());

        return dto;
    }

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RuntimeException.class)
    public @ResponseBody BasicOutputDto unhandledRuntimeError(HttpServletRequest req, Exception exception) {
        this.getOwnLogger().error("Url: " + req.getRequestURL() + " raised: " + exception.getMessage(), exception);

        BasicOutputDto dto = new BasicOutputDto(BasicOutputType.UNHANDLED_ERROR.getId());
        dto.setMessage("An unhandled error has ocurred.");
        dto.setCause(exception.getMessage());

        return dto;
    }

    protected abstract Logger getOwnLogger();

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public @ResponseBody BasicOutputDto unhandledConstraintError(HttpServletRequest req, Exception exception) {
        ConstraintViolationException ce = (ConstraintViolationException) exception;
        this.getOwnLogger().info("Url: " + req.getRequestURL() + " raised: " + ce.getSQLException().getMessage(), exception);

        BasicOutputDto dto = new BasicOutputDto(BasicOutputType.SQL_CONSTRAINT_ERROR.getId());
        dto.setMessage(String.format(
            "Se ha producido un error de clave duplicada al querer insertar el proyecto. SQLState: %s", ce.getSQLState()));
        dto.setCause(ce.getSQLException().getMessage());

        return dto;
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public @ResponseBody BasicOutputDto notFound(HttpServletRequest req, Exception exception) {
        this.getOwnLogger().info("Url: " + req.getRequestURL() + " raised: " + exception.getMessage());

        BasicOutputDto dto = new BasicOutputDto(BasicOutputType.NOT_FOUND.getId());
        dto.setMessage(String.format("No se han encontrado datos con la clave ingresada."));
        dto.setCause(exception.getMessage());

        return dto;
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IdentifiableRuntimeException.class)
    public @ResponseBody BasicOutputDto identifiableRuntimeException(HttpServletRequest req, Exception exception) {

        IdentifiableRuntimeException e = (IdentifiableRuntimeException) exception;

        this.getOwnLogger().info("Url: " + req.getRequestURL() + " raised: " + e.getCustomMessage(), exception);


        BasicOutputDto dto = new BasicOutputDto(BasicOutputType.UNHANDLED_ERROR.getId());
        dto.setMessage(String.format("Error identificado id: %s. Consulte al administrador.", e.getUuid()));
        dto.setCause(e.getCustomMessage());

        return dto;
    }

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(TooManyValuesException.class)
    public @ResponseBody BasicOutputDto unhandledTooMany(HttpServletRequest req, Exception exception) {
        this.getOwnLogger().error("Url: " + req.getRequestURL() + " raised: " + exception.getMessage(), exception);

        BasicOutputDto dto = new BasicOutputDto(BasicOutputType.UNHANDLED_ERROR.getId());
        dto.setMessage("Too many values have been found");
        dto.setCause(exception.getMessage());

        return dto;
    }

}
