ButtonsRulesAction = function(){}

ButtonsRulesAction.getInfoRuleStatus = function (ruleName, buttonApproval) {
	$.ajax({
		type: "GET",
		url: Constants.CONTEXT_ROOT + "/app/service/release-version-log/lastVersion?type=" + ruleName + "&activated=false",
		dataType: 'json',
		contentType: "application/json;",
		success: function (data) {
			switch (data.rule_status) {
				case "EDITION":
					ButtonsRulesAction.showEditionOptions(buttonApproval);
					RuleStateMessage.showEditionMessage();
					break;

				case "WATING_APPROVAL":
					ButtonsRulesAction.showWatingApprovalOptions(buttonApproval);
					RuleStateMessage.showWaitingMessage(data.version);
					break;

				default:
					ButtonsRulesAction.showEditionOptions(buttonApproval);
					RuleStateMessage.showEditionMessage();
					break;
			}

		},
		error: function (data) {
			console.log(data);
		}
	});

} 

ButtonsRulesAction.updateRuleStatus = function(ruleName, buttonApproval,status){
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/status?ruleName=" + ruleName + "&status=" + status,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       if(data){
		   ButtonsRulesAction.showNoty("Estado de regla Actualizada Con Exito !!!", "topCenter", "information");
		   ButtonsRulesAction.getInfoRuleStatus(ruleName, buttonApproval);
	       }     
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
    
} 

ButtonsRulesAction.showEditionOptions = function(buttonApproval){
    ButtonsRulesAction.showNoty("Regla En estado de: 'Edicion'!!", "topCenter", "information");
    $("#btnSendToApproval").show();
    $("#btnBackToEdition").hide();
    $("#"+buttonApproval).hide();
    
    $.each($(".Edition"), function(){
	$(this).show();
    });
    $.each($(".Wating"), function(){
	$(this).hide();
    });
 
}

ButtonsRulesAction.showButton = function (buttonSelector,show) {
	if(show != undefined && !show){
		$(buttonSelector).hide();
	}else{
		$(buttonSelector).show();
	}
};

ButtonsRulesAction.showAddButton = function (show) {
	ButtonsRulesAction.showButton("#btnAddRule",show);
};

ButtonsRulesAction.showSubscritNotificationButton = function(show) {
	ButtonsRulesAction.showButton("#btnSubscritNotification",show)
};

ButtonsRulesAction.showLoadRuleButton = function (show) {
	ButtonsRulesAction.showButton("#btnImport",show);
};

ButtonsRulesAction.showRuleExportButton = function (show) {
	ButtonsRulesAction.showButton("#btnRuleExport",show);
};

ButtonsRulesAction.showMakeCommentButton = function (show) {
	ButtonsRulesAction.showButton("#btnMakeComment",show);
};

ButtonsRulesAction.showRevisionAuditedButton = function (show) {
	ButtonsRulesAction.showButton("#btnRevisionAudited",show);
};

ButtonsRulesAction.showWatingApprovalOptions = function(buttonApproval){
    ButtonsRulesAction.showNoty("Regla En estado de: 'Espera de Aprobacion'!!", "topCenter", "warning");
    $("#btnSendToApproval").hide();
    $("#btnBackToEdition").show();
    $("#"+buttonApproval).show();
    
    $.each($(".Edition"), function(){
	$(this).hide();
    });
    $.each($(".Wating"), function(){
	$(this).show();
    });
}

ButtonsRulesAction.showNoty = function(title, positionNoty, typeNoty, confirm, action){
    var butonsConfrim = null;
    if(confirm){
	butonsConfrim =[
		{addClass: 'btn btn-success sm', text: 'Cambiar Estado', onClick: function($noty) {
		    var versionDate = $("#spNewVersionDate").children('input').val();
		    action();
		    $noty.close();
		}
		},
		{addClass: 'btn btn-default sm', text: 'Cancelar', onClick: function($noty) {
				$noty.close();
			}
		}
	];
    }
    
    noty(
		   {
			   text: '<strong>' + title + '</strong>',
			   layout: positionNoty ,
			   type:typeNoty,
			   timeout:4000,
			   animation: {
			        open: 'animated bounceInDown', // Animate.css class names
			        close: 'animated bounceOutUp', // Animate.css class names
			        easing: 'swing', // unavailable - no need
			        speed: 1000 // unavailable - no need
			   },
			   buttons: butonsConfrim
		   }
	);
}

ButtonsRulesAction.showCommentsRule = function(ruleName, statusRule, disableMakeComent){
    var urlComment = Constants.CONTEXT_ROOT + "/app/service/release-version-log/";
    switch(statusRule) {
    case "EDITION":
	urlComment = urlComment+ "lastVersion?type=" + ruleName + "&activated=false";
        break;
    case "PENDING":
	urlComment = urlComment+ "lastApproved?type=" + ruleName;
        break;
    case "ACTIVE":
	urlComment = urlComment+ "lastVersion?type=" + ruleName + "&activated=true";
        break;
    default:
	urlComment = urlComment+ "lastVersion?type=" + ruleName + "&activated=false"
    }
    
    $.ajax({ 
	   type    : "GET",
	   url     : urlComment,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       	RestConnector.appendTemplateResults(data.comment_list,"#commentsListBody", "#rowComment");
	   },
	   error:function(data){
	       console.log(data);
	   }
	});
    $("#sendComment").attr("data-rule", ruleName);

    $('#textComment').focus(function(){ 
	    $(this).animate({
	        width: '550px',
	        height: "5em" 
	      }, 500);
    });
    
    $('#textComment').blur(function(){ 
	    $(this).animate({
	         width: '250px',
	         height: "3em" 
	       }, 500);
    });
	    
    $('#textComment').keyup(function(e){
		    
	  if($(this).val().length === 0){
	    $("#sendComment").prop("disabled", true);
	    }else{
		$("#sendComment").prop("disabled", false);
	    }
    });
    	
    $("#sendComment").prop('onclick',null).off('click');
    $("#sendComment").on("click", function(){
	ButtonsRulesAction.makeComment(ruleName,  $('#textComment').val());
    });
    
    if(disableMakeComent == true){
	 $(".commentWritable").hide();
    }
};

ButtonsRulesAction.makeComment = function (nameRule, msg){
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/release-version-log/comment?type=" + nameRule + "&msg="+msg,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       ButtonsRulesAction.showNoty("Comentario Realizado con Exito!!", "topCenter", "success", false);
	       ButtonsRulesAction.showCommentsRule(nameRule);
	       $('#textComment').val("");
	       $("#sendComment").prop("disabled", true);
	   },
	   error:function(data){
	       ButtonsRulesAction.showNoty("Error al guardar el comentario", "topCenter", "error", false);
	   }
	});
};


ButtonsRulesAction.showSubcriptionOption = function (nameRule){

    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/values/notification-event/all",
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {

	       	RestConnector.appendTemplateResults(data,"#subscriptionAcction", "#rowSubcription");
	   },
	   error:function(data){
	       ButtonsRulesAction.showNoty("Error al obtener notificaciones", "topCenter", "error", false);
	   }
	});
     
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/values/entity-type/all",
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       $('#ruleSubrciptionList').children().remove();
	       $.each(data, function (i, item) {
		    $('#ruleSubrciptionList').append($('<option>', { 
		        value: item.code,
		        text : item.description 
		    }));
		});
	       $('#ruleSubrciptionList').val(nameRule);
	       	
	   },
	   error:function(data){
	       ButtonsRulesAction.showNoty("Error al obtener notificaciones", "topCenter", "error", false);
	   }
	});
    
    ButtonsRulesAction.fillSubcriptionOption(nameRule,LoginData.MANAGER.username);
};

ButtonsRulesAction.fillSubcriptionOption = function (nameRule, userName){

    $("#userInfoLabel").text("Usuario:  "+ userName);
    $('.checkNotification').prop('checked', false);
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/user?name=" + userName + "&nameRule=" + nameRule,
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
		   $("#inputEmail").val(data.mail);
        	       if(data.notificationeventlist.length > 0){
        
        		  
        		   $.each(data.notificationeventlist, function( index, value ) {
        		      $('#' + value.notificationeventcode).prop('checked', true);
        		     });
        	       }
        	   $(".checkNotification").prop('onclick',null).off('click');
        	   $(".checkNotification").on("click", function(){
        	   	ButtonsRulesAction.updateSubcriptionOption(nameRule, userName);
        	    });
        	   
        	   $("#btnRefreshMail").prop('onclick',null).off('click');
        	   $("#btnRefreshMail").on("click", function(){
        	   	ButtonsRulesAction.updateEmailUser(userName);
        	    });
        	   
        	   $("#ruleSubrciptionList").prop('onchange',null).off('change');
        	   $("#ruleSubrciptionList").on("change", function(){
        	       $('.checkNotification').prop('checked', false);
        	       ButtonsRulesAction.fillSubcriptionOption($(this).val(), userName);
        	    });
	   },
	   error:function(data){
	       ButtonsRulesAction.showNoty("Error al obtener info del usuario: " + userName, "topCenter", "error", false);
	   }
	});
};

ButtonsRulesAction.updateEmailUser = function(userName){
    $.ajax({ 
	   type    : "PUT",
	   url     : Constants.CONTEXT_ROOT + "/app/service/user/mail?userName="+ userName + "&mail=" + $("#inputEmail").val(),  
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       if(data.status == 0){
	       ButtonsRulesAction.showNoty("Direccion e-mail actualizada correctamente", "topCenter", "success", false);
	       }    
	   },
	   error:function(data){
	       console.log(data);
	       ButtonsRulesAction.showNoty("Error al actualizar info de: " + userName + ". " + data.responseJSON.cause, "topCenter", "error", false);
	   }
	});
};

ButtonsRulesAction.updateSubcriptionOption = function (nameRule, userName){
    listNotif= [];
    $.each($('.checkNotification'), function( index, value ) {
	if($(this).is(":checked")){
	    listNotif.push({
		'rulename': nameRule,
		'notificationeventcode': $(this).attr('id')
	    })
	}
    });
    
    postObj = {
	    'username': userName,
	    'mail': $("#inputEmail").val(),   
	    'notificationeventlist': listNotif
    }
    $.ajax({ 
	   type    : "POST",
	   url     : Constants.CONTEXT_ROOT + "/app/service/user?ruleName="+ nameRule,
	   dataType: 'json',
	   data: JSON.stringify(postObj),
	   contentType: "application/json;",
	   success:function(data) {
	       if(data.status == 0){
	       ButtonsRulesAction.showNoty("Subscripciones en: " + nameRule + " actualizada correctamente", "topCenter", "success", false);
	       }    
	   },
	   error:function(data){
	       console.log(data);
	       ButtonsRulesAction.showNoty("Error al actualizar info de: " + userName + " " + data.responseJSON.cause, "topCenter", "error", false);
	   }
	});
};



ButtonsRulesAction.showActiveAuditedInfo = function (nameRule, modal, table, resultTable, rowSheet){
    
    $("#"+modal).modal('show');
    $('.auditoria').width('90%');
    $("#" +table).DataTable().destroy();
	$("#" + resultTable).empty();
    $.ajax({ 
	   type    : "GET",
	   url     : Constants.CONTEXT_ROOT + "/app/service/audited/" + nameRule + "/all",
	   dataType: 'json',
	   contentType: "application/json;",
	   success:function(data) {
	       if(data != null){
	       RestConnector.appendTemplateResults(data,"#"+resultTable,"#"+rowSheet)
	       $("#" +table).DataTable({
		   "order":[[4,"desc"]]
	       });
	       }
	   },
	   error:function(data){
	       console.log(data);     
	   }
	});
};