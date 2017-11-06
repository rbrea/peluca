package com.icetea.peluca.domain.bo;

import com.icetea.peluca.domain.model.Model;

public abstract class AuditedBO<T extends Model>
    extends BasicAuditedBO {

    private static final long serialVersionUID = 1L;

    private final T entity;

    private int rev;

    private String revType;

    private String revDate;
    private String username;

    public AuditedBO(T entity) {
        this.entity = entity;
    }

    public final T get() {
        return this.entity;
    }

    public int getRev() {
        return this.rev;
    }

    public void setRev(int rev) {
        this.rev = rev;
    }

    public String getRevType() {
        return this.revType;
    }

    public void setRevType(String revType) {
        this.revType = revType;
    }

    public String getRevDate() {
        return this.revDate;
    }

    public void setRevDate(String revDate) {
        this.revDate = revDate;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
