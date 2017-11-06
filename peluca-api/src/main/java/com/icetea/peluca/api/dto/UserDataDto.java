package com.icetea.peluca.api.dto;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Lists;

public class UserDataDto
    extends BasicOutputDto {

    private static final long serialVersionUID = -5928297906913464896L;

    private String username;
    private boolean superUser;
    private List<String> roles = Lists.newArrayList();
    private boolean environmentProd;
    private String displayMigrationButtonClass = StringUtils.EMPTY;
    private String name;

    public static Optional<UserDataDto> create(String username, boolean environmentProd, String displayMigrationButtonClass,
        String name) {
        UserDataDto instance = new UserDataDto();
        instance.setUsername(username);
        instance.setEnvironmentProd(environmentProd);
        instance.setDisplayMigrationButtonClass(displayMigrationButtonClass);
        instance.setName(name);

        return Optional.of(instance);
    }

    public UserDataDto() {
        super();
    }

    public UserDataDto(Integer status, String message, String cause) {
        super(status, message, cause);
    }

    public UserDataDto(Integer status) {
        super(status);
    }

    public UserDataDto(String username, boolean isSuperUser) {
        super();
        this.username = username;
        this.superUser = isSuperUser;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isSuperUser() {
        return this.superUser;
    }

    public void setSuperUser(boolean superUser) {
        this.superUser = superUser;
    }

    public List<String> getRoles() {
        return this.roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public boolean isEnvironmentProd() {
        return this.environmentProd;
    }

    public void setEnvironmentProd(boolean environmentProd) {
        this.environmentProd = environmentProd;
    }

    public String getDisplayMigrationButtonClass() {
        return this.displayMigrationButtonClass;
    }

    public void setDisplayMigrationButtonClass(String displayMigrationButtonClass) {
        this.displayMigrationButtonClass = displayMigrationButtonClass;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
