RuleCatalogService = function(){}

RuleCatalogService.initCounter = function(){
	
	return RuleCatalogService.get(function(data){
		
		if(data != null){
			$("#initCatalogsCounter").html(data.catalogs);
			$("#initRulesCounter").html(data.rules);
		}
		
		return;
	}); 
}

RuleCatalogService.get = function(handler){
	
	var settings = {
			"handler" : handler,
			"url" : "rule-catalogs"
	};
	
	return RestConnector.get(settings);
}