LoginData = function(username, password, roles, objects, environmentProd){
	this.username = username;
	this.password = password;
	this.roles = roles;
	this.objects = objects;
	this.environmentProd = environmentProd;
	
	return;
}

LoginData.MANAGER = new Object(); 
