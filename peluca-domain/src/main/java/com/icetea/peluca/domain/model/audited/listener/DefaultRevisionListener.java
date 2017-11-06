package com.icetea.peluca.domain.model.audited.listener;

import org.hibernate.envers.RevisionListener;

import com.icetea.peluca.domain.model.audited.AuditedRevisionEntity;
import com.icetea.peluca.domain.security.SecurityContext;

public class DefaultRevisionListener implements RevisionListener {

	@Override
	public void newRevision(Object revisionEntity) {
		AuditedRevisionEntity e = (AuditedRevisionEntity)revisionEntity;
        e.setUsername(SecurityContext.getUsername());
	}

}
