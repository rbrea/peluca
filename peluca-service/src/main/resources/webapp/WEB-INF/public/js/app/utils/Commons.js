Commons = function(){}

Commons.isValid = function(input){
	if(input === undefined || input == "" || input == null){
		return false;
	}
	
	return true;
}

Commons.isNotValid = function(input){
	return !Commons.isValid(input);
}

Commons.loadAccount = function(accountKeyUrl,status){
	if (status=="INACTIVE"){
		return;
	}
	window.location.href = accountKeyUrl
}

Commons.formatDate = function(d){
	var day = d.getDate();
	var month = d.getMonth()+1;
	var year = d.getFullYear();
	var hour = d.getHours();
	var min = d.getMinutes();
	
	if (day<10){
		day="0"+day;
	}
	if (month<10){
		month="0"+month;
	}
	var defaultDateFormat = day+"/"+month+"/"+year;
	var defaultTimeFormat = hour + ":" + min;
	return defaultDateFormat+" "+defaultTimeFormat;	
}

Commons.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Commons.fillCombo = function(list, wantedValue){
	list.each(function(){
		if(this.value == wantedValue){
			$(this).prop("selected", true);
			$(this).change();
			return true;
		}
		
		return;
	});

	return;
}

Commons.nullToEmpty = function(input){
	
	return Commons.nullToValue(input, "");
}

Commons.nullToValue = function(input, value){
	var temp = input;
    if(temp == null){
    	temp = value;
    }
    
	return temp;
}

Commons.maxValue = function(list){
	if(list == null){
		return 0;
	}
	var m = 0;
	$.each(list, function(){
		var n = parseInt(this);
		if(n > m){
			m = n;
		}
		
		return;
	});
	
	return m;
}

Commons.hasWhitespace = function(val){
	
	var i;
	var whitespace = " \t\n\r";

    for (i = 0; i < val.length; i++)
    {
         var c = val.charAt(i);
         if (whitespace.indexOf(c) != -1) return true;
    }

    return false;    
}

Commons.addOrRemoveRequired = function(value, formGroupId, labelId){
	if(value == null || value == ""){
		$("#" + formGroupId).addClass("has-error");
		$("#" + labelId).removeClass("hide");
		
		return true;
	}
	$("#" + formGroupId).removeClass("has-error");
	$("#" + labelId).addClass("hide");
	
	return false;
}

Commons.booleanToSiNo = function(input){
	
	return Commons.booleanToValue(input, "Si", "No");
}

Commons.booleanToValue = function(input, valueTrue, valueFalse){
	if(input == "true" || input == true){
		return valueTrue;
	}
	
	return valueFalse;
}

Commons.SiNoToBoolean = function(input){
	return "Si" == input;
}

Commons.startWith = function(string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

Commons.sortJson = function(a,b){
    return a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1;
};

Commons.removeWhitespaces = function(input){
	
	if(Commons.isNotValid(input)){
		return input;
	}
	
	return input.replace(/ /g,'');
}

Commons.buildUrlQueryString = function(urlQueryString, param, value){
	
	if(Commons.isValid(value)){
		if(urlQueryString != ""){
			urlQueryString += "&";
		} else {
			urlQueryString += "?";
		}
		urlQueryString += param + "=" + value;
	}
	
	return urlQueryString;
}

Commons.syntaxHighlight = function(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

Commons.getIcon = function(booleanValue){
	if(booleanValue){
		return '<span class="glyphicon glyphicon-ok-sign" style="color:green" title="Procesado"></span>';
	}
	
	return '<span class="glyphicon glyphicon-remove-sign" style="color:red" title="Error"></span>';
}

Commons.selectAllText = function(id){
	
	var element = $("#" + id)[0];
	
	if (element.select) {
		element.select();
	} else if (document.selection) {
		document.selection.empty();
		var range = document.body.createTextRange();
		range.moveToElementText(element);
		range.select();
	} else if (window.getSelection) {
		if (window.getSelection().empty) {  // Chrome
			window.getSelection().empty();
		} else if (window.getSelection().removeAllRanges) {  // Firefox
			window.getSelection().removeAllRanges();
		}
		var range = document.createRange();
		range.selectNode(element);
		window.getSelection().addRange(range);
	}
	
	return;
}

Commons.isBlank = function(value){
	
	return value == null || value == "" || value.trim() == "";
}

Commons.isNotBlank = function(value){
	
	return !Commons.isBlank(value);
}

Commons.isAllValid = function(list){
	
	if(list == null || list.length == 0){
		return false;
	}
	for(var i=0;i<list.length;i++){
		if(Commons.isNotValid(list[i])){
			return false;
		}
	}
	
	return true;
}

Commons.isSomeValid = function(list){
	
	if(list == null || list.length == 0){
		return false;
	}
	for(var i=0;i<list.length;i++){
		if(Commons.isValid(list[i])){
			return true;
		}
	}
	
	return false;
}

/**
* Converts a string to either underscore-case or camel-case or
*   to pascal-case. 
* @param {string} toChange
* @param {string} [toCase='toUnderscoreCase'] - Options: 
*   'toUnderscoreCase' | 'toCamelCase' | 'toPascalCase'  
* @returns {string} according toCase-param.
*   Returns an empty string in case of error.
*/

Commons.changeCase = function(toChange, toCase) {
  var needle = null;
  var funct = null;
  var needleChangingUpperLower = /[a-z0-9]_[a-z0-9]/g;
  var needleToUnderscore = /(([a-zA-Z0-9]*?)(([a-z0-9][A-Z]))|([a-zA-Z0-9]*)$)/g;  

  toCase = toCase || 'toUnderscoreCase'

  if ( !toChange || 
      typeof toChange !== 'string' || 
      toChange.length < 2 ) {
    return '';
  }

  if (toChange.search(/[^\w]/g) > -1) {
    return '';
  }

  function toChangingUpperLower(match) {
    var chars = match.split('_');

    return chars[0] + chars[1].toUpperCase();
  }

  function toUnderscore(match, wordComplete, wordTruncated, wordChange) {
    var ret = '';

    if (wordChange) {

      var chars = wordChange.split('');

      ret += wordTruncated.toLowerCase() + chars[0] + '_' + chars[1].toLowerCase();
    } else {
      ret = wordComplete.toLowerCase();
    }

    return ret;
  }

  switch (toCase) {
    case 'toCamelCase':
      needle = needleChangingUpperLower;

      toChange = toChange.slice(0, 1).toLowerCase() + toChange.slice(1);

      funct = toChangingUpperLower;

      break;
    case 'toPascalCase':
      needle = needleChangingUpperLower;

      toChange = toChange.slice(0, 1).toUpperCase() + toChange.slice(1);

      funct = toChangingUpperLower;

      break;
    case 'toUnderscoreCase':
      needle = needleToUnderscore;

      funct = toUnderscore;

      break;
    default:
      return '';
  }

  return toChange.replace(needle, funct);
}

Commons.toJsonSnakeCase = function(object){
	
	var $json = JSON.stringify(object, function (key, value) {
		if(value instanceof Array){
			return value;
		} else if (value && typeof value === 'object') {
			var replacement = {};
		    for (var k in value) {
		    	if (Object.hasOwnProperty.call(value, k)) {
		    		replacement[Commons.changeCase(k && k.charAt(0).toLowerCase() + k.substring(1), 'toUnderscoreCase')] = value[k];
		    	}
		    }
		   
		    return replacement;
		}
		return value;
	});
	
	return $json;
}

Commons.makeSubmitUrl = function(name, value, formId) {

    if (value == null || value == "" || value === undefined) {
        return false;
    }
    var frmElement = $(formId).find("input[name='" + name + "']");

    if (frmElement.length == 0) {
        $('<input />').attr('type', 'hidden')
            .attr('name', name)
            .attr('value', value)
            .appendTo(formId);
    } else {
        frmElement.attr('value', value);
    }

    return true;
}

Commons.setOptionValueByDescription = function(elementId, valueToSelect){
	var optCountries = $("#" + elementId + " > option");
	   
	$.each(optCountries, function(){
		   
		if($(this).html().trim() == valueToSelect){
			$(this).prop("selected",true);
			   
			return false;
		}
		   
		return;
	});
	$("#" + elementId).multiselect("refresh");
	   
	return;
}

Commons.setOptionValue = function(elementId, valueToSelect){
	var optCountries = $("#" + elementId + " > option");
	   
	$.each(optCountries, function(){
		   
		if($(this).val() == valueToSelect){
			$(this).prop("selected",true);
			   
			return false;
		}
		   
		return;
	});
	$("#" + elementId).multiselect("refresh");
	   
	return;
}

Commons.setMultiselectOptionValue = function(elementId, valueToSelect){
	Commons.setOptionValue(elementId, valueToSelect);
	$("#" + elementId).multiselect("refresh");
	   
	return;
}

Commons.textIn = function(text, values){
	if(Commons.isBlank(text) || values == null || values == "" || values.length == 0){
		return false;
	}
	for(var i=0;i<values.length;i++){
		if(text == values[i]){
			return true;
		}
	}
	
	return false;
}

Commons.replaceAll = function(input, valueToReplace, replaceValue){
	return input.split(valueToReplace).join(replaceValue);
}

Commons.setComboValue = function(elementId, valueToSelect){
	var optCountries = $("#" + elementId + " > option");
	   
	$.each(optCountries, function(){
		   
		if($(this).val() == valueToSelect){
			$(this).prop("selected",true);
			   
			return false;
		}
		   
		return;
	});
	   
	return;
}

Commons.buildIdList = function(list){
	
	if(list == null || list == "" || list === undefined){
		return "";
	}
	
	var idList = "";
	var flag = true;
	$.each(list, function(){
		if(flag){
			idList += ""+this;
			flag = false;
		} else {
			idList += ","+this;
		}
	});
	
	return idList;
}

Commons.contains = function(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    
    return false;
}

Commons.isTrue = function(input){
	return input == true || input == "true";
}


Commons.chunkString = function(str, length) {
	if(str == null){
		return null;
	}
	return str.match(new RegExp('.{1,' + length + '}', 'g'));
}
