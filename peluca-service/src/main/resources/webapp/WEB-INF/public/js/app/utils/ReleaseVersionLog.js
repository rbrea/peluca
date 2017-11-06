ReleaseVersionLog = function(){}

ReleaseVersionLog.initLastVersion = function(key, message, isActiveView){
	
	return Q($.ajax({ 
			   type    : "GET",
			   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastVersion?type=" + key + "&activated=true",
			   dataType: 'json',
			   contentType: "application/json;"
			})
		)
		.then(function(data){
			if(data != null){
				$("#versionBox").removeClass("hide");
				$("#headerVersion").text(data.version +".0");
				if(Commons.isTrue(isActiveView)){
					var date = "Fecha release: " + data.release_version_date;
					var usr = "Aprobado por: " + data.user_aproved;
					var jiraId = "";
					if(data.jira_id != null && data.jira_id != "" && data.jira_id != "NO INFORMADO"){
						jiraId = " - Jira ID: " + data.jira_id;
					}
					$("#headerPageVersion span").text(message + date + " - " + usr + jiraId);
				}
			}
		})
		.fail(function(error){
			console.error(error);
		}).done();
}