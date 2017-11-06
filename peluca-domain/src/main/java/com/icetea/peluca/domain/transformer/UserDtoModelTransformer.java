package com.icetea.peluca.domain.transformer;

import javax.inject.Named;

import com.icetea.peluca.api.dto.UserDto;
import com.icetea.peluca.domain.model.User;

@Named
public class UserDtoModelTransformer extends DtoModelTransformer<UserDto, User> {

	@Override
	protected UserDto doTransform(User e) {
		UserDto d = new UserDto();
		d.setToken(e.getToken());
		d.setUsername(e.getUsername());
		d.setAdmin(e.isAdmin());
		if(e.isAdmin()){
			d.getRoles().add("ROLE_ADMIN");
		}
		d.setName(e.getName());
		
		return d;
	}

}
