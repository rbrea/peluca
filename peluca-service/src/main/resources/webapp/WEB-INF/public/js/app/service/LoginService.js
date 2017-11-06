LoginService = function(){}

LoginService.init = function(){
	
	$(document).keypress(function(e) {
		if(e.which == 13) {
			$('#btnLoginSubmit').trigger('click');
		}
		
		return;
	});

	$("#btnLoginSubmit").on("click", function(){
		LoginService.doLogin();
		
		return;
	});
	
	return;
}

LoginService.doLogin = function(){
	
	var loginData = new LoginData($("#inputUsername").val(), $("#inputPassword").val());
	
	var validator = $( "#frmLogin" ).validate();
	validator.element( "#inputUsername" );
	validator.element( "#inputPassword" );
	if(!validator.valid()){
		return false;
	}
	
	$.ajax({ 
	   type    : "POST",
	   url     : "login",
	   dataType: 'json',
	   data: JSON.stringify(loginData),
	   contentType: "application/json;",
	   success:function(data) {
		   if(data != null && data.status == 0){

			   window.location.replace(Constants.CONTEXT_ROOT + "/app/html/index");
			   
			   return;
		   }else{
			   noty(
					   {
						   text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
						   layout:'topRight',
						   type:'alert',
						   timeout:15000
					   }
			   );
		   }
		   
		   return;
	   },
	   error:function(data){
		   noty(
				   {
					   text: '<strong>Error al intentar login. Mensaje: ' + data.responseJSON.cause + '</strong>',
					   layout:'topRight',
					   type:'error',
					   timeout:15000,
					   animation: {
					        open: {height: 'toggle'}, // jQuery animate function property object
					        close: {height: 'toggle'}, // jQuery animate function property object
					        easing: 'swing', // easing
					        speed: 500 // opening & closing animation speed
					    }
				   }
		   );

		   return;
	   }
	});
	
	
	return;
}

LoginService.getUserData = function(){
	
	$.ajax({ 
	   type    : 	"GET",
	   url     :	Constants.CONTEXT_ROOT + "/app/atp/3/api/userData?nocache=" + Math.floor(Math.random()*12),
	   dataType: 	'json',
	   async:		false,
	   contentType: "application/json;",
	   success: function(data) {
		   if(data != null){
			   
			   $("#loggedUsernameContainer").html(data.username);
			   
			   var loginData = new LoginData(data.username, null, data.roles, data.objects, data.environment_prod);
			   
			   LoginData.MANAGER = loginData;
			   // [roher] inicializa los permisos tomados de los roles ...
			   PermissionService.initPermissions(LoginData.MANAGER);
			   // [roher] proceso los elementos con la clase roleables
			   PermissionService.doJobWithRoleables();
			   Environment.setEnvironment(data.environment_prod);
			   // [roher] si estoy en prod no tengo q mostrar elementos
			   if(data.environment_prod == true){
				   PermissionService.doHideOfProductionElements();
			   }
			   $("#btnMigration").addClass(data.display_migration_button_class);

			   return;
		   }else{
			   noty(
					   {
						   text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
						   layout:'topRight',
						   type:'alert',
						   timeout:15000
					   }
			   );
		   }
		   
		   return;
	   },
	   error:function(data){
		   noty(
				   {
					   text: '<strong>Error al intentar login. Mensaje: ' + data.responseJSON.cause + '</strong>',
					   layout:'topRight',
					   type:'error',
					   timeout:15000,
					   animation: {
					        open: {height: 'toggle'}, // jQuery animate function property object
					        close: {height: 'toggle'}, // jQuery animate function property object
					        easing: 'swing', // easing
					        speed: 500 // opening & closing animation speed
					    }
				   }
		   );

		   return;
	   }
	});
	
	return;
}

LoginService.doLogout = function(){
	
	$("#frmLogout").submit();
	
	return;
}
