package com.icetea.peluca.service.security.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.inject.Inject;
import javax.inject.Named;

import org.jasypt.util.password.BasicPasswordEncryptor;
import org.jasypt.util.password.PasswordEncryptor;

import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.icetea.peluca.api.dto.UserDto;
import com.icetea.peluca.api.dto.UserRegistrationDto;
import com.icetea.peluca.domain.dao.UserDao;
import com.icetea.peluca.domain.exception.IdentifiableExceptionConditions;
import com.icetea.peluca.domain.exception.IncorrectUserLoginException;
import com.icetea.peluca.domain.exception.PasswordIncorrectException;
import com.icetea.peluca.domain.model.User;
import com.icetea.peluca.domain.service.BasicService;
import com.icetea.peluca.domain.transformer.UserDtoModelTransformer;
import com.icetea.peluca.domain.utils.DateUtils;
import com.icetea.peluca.domain.utils.StringUtils;
import com.icetea.peluca.domain.utils.mail.MailHelper;
import com.icetea.peluca.service.security.transformer.UserRegistrationDtoModelTransformer;

@Named
public class AuthenticationService extends BasicService<UserDto> {

	private final UserDao userDao;
	
	private final UserDtoModelTransformer userDtoModelTransformer;
	private final UserRegistrationDtoModelTransformer userRegistrationDtoModelTransformer;

	private final MailHelper mailHelper;
	
	@Inject
	public AuthenticationService(UserDao userDao,
			UserDtoModelTransformer userDtoModelTransformer,
			UserRegistrationDtoModelTransformer userRegistrationDtoModelTransformer,
			MailHelper mailHelper) {
		super();
		this.userDao = userDao;
		this.userDtoModelTransformer = userDtoModelTransformer;
		this.userRegistrationDtoModelTransformer = userRegistrationDtoModelTransformer;
		this.mailHelper = mailHelper;
	}

	public UserDto register(UserRegistrationDto userRegistration){
		
		Preconditions.checkArgument(
				StringUtils.isNotBlank(userRegistration.getPassword()), 
				"El password es requerido");
		
		User found = this.userDao.find(userRegistration.getUsername());
		
		if(found != null){
			throw new RuntimeException("El nombre de usuario ya existe. Por favor elija otro.");
		}
		
		PasswordEncryptor passwordEncryptor = new BasicPasswordEncryptor();
		String encryptedPassword = passwordEncryptor.encryptPassword(userRegistration.getPassword());
		
		User user = this.createUser(userRegistration, encryptedPassword);
		
		this.userDao.saveOrUpdate(user);
		
		return this.userDtoModelTransformer.transform(user);
	}

	protected User createUser(UserRegistrationDto userRegistration,
			String encryptedPassword) {
		User user = new User();
		user.setDocumentNumber(userRegistration.getDocumentNumber());
		user.setDocumentType(userRegistration.getDocumentType());
		user.setName(userRegistration.getName());
		user.setEmail(userRegistration.getEmail());
		user.setUsername(userRegistration.getUsername());
		user.setPassword(encryptedPassword);
		user.setToken(UUID.randomUUID().toString());
		user.setAdmin(userRegistration.isAdmin());
		
		return user;
	}
	
	public UserDto login(String username, String password){
		
		User user = this.userDao.find(username);
		if(user == null){
			throw new IncorrectUserLoginException("No existe usuario con el username indicado");
		}
		PasswordEncryptor passwordEncryptor = new BasicPasswordEncryptor();
		if(!passwordEncryptor.checkPassword(password, user.getPassword())){
			throw new PasswordIncorrectException("password invalido. Por favor intente nuevamente.");
		}
		
		return this.userDtoModelTransformer.transform(user);
	}
	
	public UserDto validateAccessToken(String accessToken) {
		return this.userDtoModelTransformer.transform(this.userDao.findByAccessToken(accessToken));
	}

	public List<UserRegistrationDto> getUserRegistration(Long id, String username){
		if(id == null && StringUtils.isBlank(username)){
			return this.userRegistrationDtoModelTransformer.transformAllTo(this.userDao.findAll());
		}
		User user = null;
		if(id != null){
			user = this.userDao.findById(id);
		} else if(StringUtils.isNotBlank(username)){
			user = this.userDao.find(username); 
		}
		return Lists.newArrayList(this.userRegistrationDtoModelTransformer.transform(user));
	}

	public UserDto editUser(UserRegistrationDto userRegistration) {
		User user = this.userDao.findById(userRegistration.getId());
		
		if(user == null){
			throw new RuntimeException("error usuario no existe");
		}
		
		user.setName(userRegistration.getName());
		user.setDocumentNumber(userRegistration.getDocumentNumber());
		user.setEmail(userRegistration.getEmail());
		user.setAdmin(userRegistration.isAdmin());
		
		return this.userDtoModelTransformer.transform(user);
	}
	
	public boolean removeUser(Long id) {
		User user = this.userDao.findById(id);
		
		if(user == null){
			throw new RuntimeException("error usuario no existe");
		}
	
		return this.userDao.delete(user);
	}
	
	public UserDto search(String username){
		
		return this.userDtoModelTransformer.transform(this.userDao.find(username));
	}
	
	public UserRegistrationDto resetPassword(String username){
		
		final User user = this.userDao.find(username);
		
		return this.resetPassword(user);
	}
	
	public UserRegistrationDto resetPassword(Long id){
		
		final User user = this.userDao.findById(id);
		
		return this.resetPassword(user);
	}

	public UserRegistrationDto resetPassword(User user){
		
		IdentifiableExceptionConditions.checkArgument(user != null, "No se ha encontrado el usuario solicitado para resetear el password");
		
		IdentifiableExceptionConditions.checkArgument(StringUtils.isNotBlank(user.getEmail()), "email del usuario requerido");
		
		final String verificationCode = UUID.randomUUID().toString();
		final Date expirationDate = DateUtils.addDays(DateUtils.now(), 1);
		
		user.setResetPasswordVerificationCode(verificationCode);
		user.setResetPasswordExpiration(expirationDate);
		
		StringBuffer bf = new StringBuffer();
		
		String name = user.getName();
		if(StringUtils.isBlank(name)){
			name = "No Especificado";
		}
		
		bf.append("Estimado/a ").append(StringUtils.upperCase(name)).append("\n");
		bf.append("Usted ha solicitado el reseteo de su contraseña para acceder al sistema de Gestión de Pago Diario.\n");
		bf.append("A continuación se le otorga un código de Verificaci&oacute;n; "
				+ "sea tan amable de ingresar el mismo en el lugar indicado.\n");
		bf.append("\n\nCÓDIGO DE VERIFICACIÓN: ").append(verificationCode).append("\n\n");
		bf.append("\nTenga en cuenta que el mismo expirará luego de las 24hs de generado. Por lo que tendrá que volver a generarlo.\n");
		bf.append("\nMuchas gracias!");
		
		final String text = bf.toString();
		
		IdentifiableExceptionConditions.checkArgument(StringUtils.isNotBlank(user.getEmail()), "El email del usuario no esta ingresado.");
		
		this.mailHelper.send(user.getEmail(), "Reseteo de contraseña", text);
		
		this.userDao.saveOrUpdate(user);
		
		return this.userRegistrationDtoModelTransformer.transform(user);
	}
	
	public UserRegistrationDto checkVerificationCode(String verificationCode, String newPassword){
		
		IdentifiableExceptionConditions.checkArgument(StringUtils.isNotBlank(verificationCode), 
				"Código de verificación requerido");
		IdentifiableExceptionConditions.checkArgument(StringUtils.isNotBlank(newPassword),
				"Nueva contraseña requerida");
		
		User user = this.userDao.findByVerificationCode(verificationCode);
		
		IdentifiableExceptionConditions.checkArgument(user != null, 
				"Usuario no encontrado con código de verificación: " + verificationCode);
		
		IdentifiableExceptionConditions.checkArgument(user.getResetPasswordExpiration().after(DateUtils.now()), 
				"El código de verificación ha expirado. Por favor generar uno nuevo.");
		
		PasswordEncryptor passwordEncryptor = new BasicPasswordEncryptor();
		String encryptedPassword = passwordEncryptor.encryptPassword(newPassword);
		user.setPassword(encryptedPassword);
		user.setResetPasswordExpiration(null);
		user.setResetPasswordVerificationCode(null);
		
		this.userDao.saveOrUpdate(user);
		
		return this.userRegistrationDtoModelTransformer.transform(user);
	}
	
}
