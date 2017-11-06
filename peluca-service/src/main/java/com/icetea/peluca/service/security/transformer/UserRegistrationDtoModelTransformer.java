package com.icetea.peluca.service.security.transformer;

import javax.inject.Named;

import com.icetea.peluca.api.dto.UserRegistrationDto;
import com.icetea.peluca.domain.model.User;
import com.icetea.peluca.domain.transformer.DtoModelTransformer;

@Named
public class UserRegistrationDtoModelTransformer extends
		DtoModelTransformer<UserRegistrationDto, User> {

	@Override
	protected UserRegistrationDto doTransform(User e) {
		UserRegistrationDto dto = new UserRegistrationDto();
		dto.setAdmin(e.isAdmin());
		dto.setDocumentNumber(e.getDocumentNumber());
		dto.setDocumentType(e.getDocumentType());
		dto.setEmail(e.getEmail());
		dto.setId(e.getId());
		dto.setName(e.getName());
		dto.setUsername(e.getUsername());
		
		return dto;
	}

}
