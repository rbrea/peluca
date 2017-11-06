package com.icetea.peluca.api.dto;

public class AuditedDto<T extends BasicDto>
    extends BasicDto {

    private static final long serialVersionUID = 1L;

    private int rev;

    private String revType;

    private String revDate;

    private String username;

    private final T dto;

    public AuditedDto(T dto) {
        super();
        this.dto = dto;
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

    public final T getDto() {
        return this.dto;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}

