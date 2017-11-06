package com.icetea.peluca.domain.model;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.hibernate.envers.Audited;

@MappedSuperclass
@Audited
public abstract class Descriptible extends Identifiable {

    private static final long serialVersionUID = 1L;

    @Column(name = "DESCRIPTION", length = 255)
    private String description;
    
    public Descriptible() {
		super();
	}
    
	public Descriptible(String description) {
		super();
		this.description = description;
	}

	public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
