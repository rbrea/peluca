package com.icetea.peluca.domain.model.audited;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.envers.DefaultRevisionEntity;
import org.hibernate.envers.RevisionEntity;

import com.icetea.peluca.domain.model.audited.listener.DefaultRevisionListener;

@Entity
@Table(name = "REVINFO")
@RevisionEntity(DefaultRevisionListener.class)
public class AuditedRevisionEntity
    extends DefaultRevisionEntity {

    private static final long serialVersionUID = 1L;

    @Column(name = "AUDITOR_USERNAME")
    private String username;

    public AuditedRevisionEntity() {
        super();
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
