CatalogueService = (function(){

	var init = function(){

		$("#btnAddCatalogueSave").on("click", function(){

			add();
		});

		$("#CatalogueSelectAll").on("click", function(){

			var isChecked = $(this).prop("checked");

			$("input[type='checkbox'][id*='selectedRow_']").each(function(){

				$(this).prop("checked", isChecked);

				return;
			});

		});

		$('#tCatalogueResult').on( 'page.dt', function () {

			LoginService.getUserData();

		} );

		CatalogueTypeService.get(null, null, catalogueTypeHandler);

		$("#btnCatalogueRemoveAll").on("click", function(){
			var list = [];

			var rows = $('#tCatalogueResult').dataTable().fnGetNodes();

			$.each(rows, function(index, value){
				var check = $(this).find("input[type='checkbox'][id*='selectedRow_']:checked");
				var id = check.parent().parent().data("catalogueid");

				if(Commons.isValid(id)){
					list.push(id);
				}
			});

			if(list.length > 0 ){
				remove(list);
			} else {
				noty(
					{
						text: '<strong>No ha seleccionado ningún elemento para borrar.</strong>',
						layout:'topRight',
						type:'warning',
						timeout:5000,
						animation: {
							open: 'animated bounceInDown', // Animate.css class names
							close: 'animated bounceOutUp', // Animate.css class names
							easing: 'swing', // unavailable - no need
							speed: 500 // unavailable - no need
						}
					}
				);
			}

			return;
		});

		$("#btnRevisionAudited").on("click", function(){
			$('.auditoria').width('80%');
			getAuditedByCode();
		});

		$('#filterSpCatalogueType').on('change', function(){
			get(handler);

			return;
		});

		$("#btnImport").tooltip();
		$("#btnCatalogueExport").tooltip();
		$("#btnAdd").tooltip();
		$("#btnRevisionAudited").tooltip();
		$("#btnMigration").tooltip();

		ButtonMigration.init("catalogue");

		$("#btnCatalogueExport").on("click", function(){

			$("#frmCatalogueExportXls").attr("action", Constants.CONTEXT_ROOT + "/app/service/catalogue/xls?catalogueTypeDescription=" + $('#filterSpCatalogueType :selected').text());
			$("#frmCatalogueExportXls").submit();

			return;
		});

		$("#labelSelectAll").on("click", function(){
			var rows = $('#tCatalogueResult').dataTable().fnGetNodes();
			$.each(rows, function(index, value){
				var check = $(this).find("input[type='checkbox'][id*='selectedRow_']");
				check.prop("checked", true);
			});
			$("#labelSelectAll").hide();
		});

		$("#CatalogueSelectAll").on("click", function(){
			var isChecked = $(this).prop("checked");
			var rows = $('#tCatalogueResult').dataTable().fnGetNodes();
			if(isChecked){
				if(rows.length > $('#tCatalogueResult').dataTable().fnSettings()._iDisplayLength){
					$("#labelSelectAll").show();
					$("#allCheckText").text("Seleccionar los "+ rows.length + " registros totales");
				};
				$("input[type='checkbox'][id*='selectedRow_']").each(function(){
					$(this).prop("checked", isChecked);
					return;
				});
			}else{
				$("#labelSelectAll").hide();
				$.each(rows, function(index, value){
					var check = $(this).find("input[type='checkbox'][id*='selectedRow_']");
					check.prop("checked", isChecked);
				});
			}
			return;
		});

	};


	var catalogueTypeHandler = function(catalogueTypeList){

		CatalogueTypeService.doComboFill($('#filterSpCatalogueType'), catalogueTypeList, true);
		CatalogueTypeService.doComboFill($('#spCatalogueType'), catalogueTypeList, true);
		$('#filterSpCatalogueType option:first').attr("selected", "selected");

		return;
	};

	var get = function(handler){

		var id = $("#filterSpCatalogueType :selected").text();

		if(id == undefined || id == ""){
			id = "0";
		}

		var urlQueryString = "";

		urlQueryString = Commons.buildUrlQueryString(urlQueryString, "catalogueTypeDescription", id);

		$.ajax({
			type    : "GET",
			url     : Constants.CONTEXT_ROOT + "/app/service/catalogue" + urlQueryString,
			dataType: 'json',
			contentType: "application/json;",
			success:function(data) {
				(data.length);
				if(data != null){

					$('#btnCatalogueExport').prop('disabled', !(data.length > 0));

					if(handler != null && handler != undefined && handler != ""){

						handler(data);
					}

					return;
				}else{
					noty(
						{
							text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
							layout:'topRight',
							type:'alert',
							timeout:10000,
							animation: {
								open: 'animated bounceInDown', // Animate.css class names
								close: 'animated bounceOutUp', // Animate.css class names
								easing: 'swing', // unavailable - no need
								speed: 500 // unavailable - no need
							}
						}
					);
				}

				return;
			},
			error:function(data){
				noty(
					{
						text: '<strong>Se ha producido un error, mensaje: ' + data.responseJSON.cause + '</strong>',
						layout:'topRight',
						type:'error',
						timeout:10000,
						animation: {
							open: 'animated bounceInDown', // Animate.css class names
							close: 'animated bounceOutUp', // Animate.css class names
							easing: 'swing', // unavailable - no need
							speed: 500 // unavailable - no need
						}
					}
				);

				return;
			}
		});
	};

	var handler = function(data){

		var idList = data.map(function(obj){
			return obj.id;
		}).join();

		var table = $("#tCatalogueResult").dataTable( {
			"fnInitComplete": function(){
				$('#tCatalogueResult tbody tr').each(function(){
					$(this).find('td:eq(2)').attr('nowrap', 'nowrap');
					$(this).find('td:eq(4)').attr('nowrap', 'nowrap');
					$(this).find('td:eq(7)').attr('nowrap', 'nowrap');
					$(this).find('td:eq(8)').attr('nowrap', 'nowrap');
					$(this).find('td:eq(9)').attr('nowrap', 'nowrap');

					return;
				});

				return;
			},
			"iDisplayLength": 50,
			"bDestroy" : true,
			responsive: false,
			"order": [[ 3, "asc" ]],
			"createdRow": function ( row, data, index ) {
				$(row).attr("id", "leRow_" + data.id);
				$(row).data('catalogueid', data.id);
				$(row).data('idlist', idList);

				$('td', row).eq(2).data("columnname", "description");

				return;
			},
			"data": data,
			"drawCallback": function() {
				LoginService.getUserData();
			},
			"columns": [
				{
					"className": 'centered',
					"orderable": false,
					"render": function ( data, type, row ) {

						return "<input type='checkbox' id='selectedRow_" + row.catalogueid + "' value='X'>";
					}
				},
				{
					"className": 'centered',
					"orderable": false,
					"data": "id"
				},
				{
					"className": 'centered',
					"orderable": true,
					"data": "code"
				},
				{
					"className": 'editable-field centered',
					"orderable": true,
					"data": "description"
				},
				{
					"className": 'centered',
					"orderable": false,
					"render": function (data, type, row) {

						return 	"<span id='showAudited_" + row.code + "' data-code=" + row.code + ">" +
							"<span id='showList_" + row.id + "'>" +
							"<a class='roleable ESCRITURA' href='javascript:void(0);' onclick='javascript:CatalogueService.removeOnly(" + row.id + ");' title='Remover fila'>" +
							"<i class='glyphicon glyphicon-trash'></i></a></span>";
					}
				}
			],
			"language": {
				"lengthMenu": "Mostrar _MENU_ registros por p&aacute;gina",
				"zeroRecords": "No se ha encontrado ningun elemento",
				"info": "P&aacute;gina _PAGE_ de _PAGES_ <b>(Total: _MAX_)</b>",
				"infoEmpty": "No hay registros disponibles",
				"infoFiltered": "", //"(filtrados de un total de _MAX_ registros)",
				"search": "Buscar: ",
				"paginate": {
					"previous": "<i class='glyphicon glyphicon-step-backward'></i>",
					"next": "<i class='glyphicon glyphicon-step-forward'></i>"
				}
			}
		});

		var valueTmp = "";

		table.$('td.editable-field').editable(Constants.CONTEXT_ROOT + "/app/service/catalogue", {
			"method": "PUT",
			"submit" : 'OK',
			"ajaxoptions": {
				"dataType": 'json',
				"contentType": "application/json;",
				"type": "PUT"
			},
			"callback": function( sValue, y ) {

				var aPos = table.fnGetPosition( this );
				var v = valueTmp;
				if(sValue.status == 0){
					v = sValue.value;
					noty(
						{
							text: '<strong>El Catalogo se ha actualizado correctamente!</strong>',
							layout:'topRight',
							type:'success',
							timeout:5000,
							animation: {
								open: 'animated bounceInDown', // Animate.css class names
								close: 'animated bounceOutUp', // Animate.css class names
								easing: 'swing', // unavailable - no need
								speed: 500 // unavailable - no need
							}
						}
					);
				} else {
					noty(
						{
							text: '<strong>Ups! Mensaje: ' + sValue.message + '</strong>',
							layout:'topRight',
							type:'error',
							timeout:10000,
							animation: {
								open: 'animated bounceInDown', // Animate.css class names
								close: 'animated bounceOutUp', // Animate.css class names
								easing: 'swing', // unavailable - no need
								speed: 500 // unavailable - no need
							}
						}
					);
				}
				table.fnUpdate(v, aPos[0], aPos[1] );

				return;
			},
			"submitdata": function ( value, settings ) {

				valueTmp = value;

				var rowId = this.parentNode.getAttribute('id');

				var catalogueId = $(this).parent().data('catalogueid');

				var tdList = $("#" + rowId).children();


				var changedColumnName = $(this).data('columnname');

				var code = tdList.eq(2).html().trim();
				var description = tdList.eq(3).html().trim();
				if(changedColumnName == tdList.eq(3).data('columnname')){
					description = $(this).children().children("input[name='value']").val();
				}else if (changedColumnName == tdList.eq(2).data('columnname')){
					code = $(this).children().children("input[name='value']").val();
				}

				var catalogueTypeId = $("#filterSpCatalogueType").val();
				var catalogueTypeDescription = $("#filterSpCatalogueType option:selected").text();

				var obj = new Object();
				obj.id = catalogueId;
				obj.code = code;
				obj.description = description;
				obj.catalogueTypeId = catalogueTypeId;
				obj.catalogueTypeDescription = catalogueTypeDescription;

				return obj;
			},

			"width": "90%",
			"height": "100%"
		} );

		LoginService.getUserData();

	};

	var removeOnly = function(id){
		return ButtonRemove.removeOnly(id.toString(),"catalogue","#tCatalogueResult","catalogueid",null);
	};

	var remove = function(idList){

		if(idList == null || idList === undefined || idList == "" || idList.length == 0){
			ButtonsRulesAction.showNoty("No se ha seleccionado ningún elemento para borrar" ,"topRight", "information", false);
			return false;
		}


		noty({
			text: 'Esta seguro que desea borrar los elementos seleccionados?',
			modal:true,
			layout: 'topCenter',
			type: "error",
			animation: {
				open: 'animated bounceIn', // Animate.css class names
				close: 'animated flipOutX', // Animate.css class names
				easing: 'swing', // unavailable - no need
				speed: 500 // unavailable - no need
			},
			buttons: [
				{addClass: 'btn btn-success', text: 'Aceptar', onClick: function($noty) {

					$noty.close();

					$.ajax({
						type    : "DELETE",
						url     : Constants.CONTEXT_ROOT + "/app/service/catalogue",
						dataType: 'json',
						data: JSON.stringify({"ids" : idList}),
						contentType: "application/json;",
						success:function(data) {
							if(data != null && data.status == 0){

								var table = $("#tCatalogueResult").DataTable();

								var rows = $('#tCatalogueResult').dataTable().fnGetNodes();

								$.each(rows, function () {
									var check = $(this).find("input[type='checkbox'][id*='selectedRow_']:checked");
									var id = check.parent().parent().data("catalogueid");
									if (idList.indexOf(id) > -1) {

										table
											.row($(this))
											.remove();
									}

								});

								table.draw();

								ButtonsRulesAction.showNoty("Los elementos seleccionados se han borrado con éxito!","topRight", "success", false);

								$("#CatalogueSelectAll").prop("checked", false);
								return;
							}else{
								ButtonsRulesAction.showNoty("Ups! Mensaje: " + data.message,"topRight", "alert", false);
							}

							return;
						},
						error:function(data){
							ButtonsRulesAction.showNoty("Error al intentar borrar. Mensaje: " + data.responseJSON.cause,"topRight", "error", false);
							return;
						}
					});

				}
				},
				{addClass: 'btn btn-default', text: 'Cancelar', onClick: function($noty) {
					$noty.close();
				}
				}
			]
		});

	};

	var add = function(){
		var validator = $("#frmAddCatalogue").validate();
		validator.element("#spCatalogueType");
		validator.element("#spCatalogueCode");
		validator.element("#spCatalogueDescription");

		if(!validator.valid()){
			return false;
		}
		var obj = new Object();

		obj.code = $("#spCatalogueCode").val();
		obj.description = $("#spCatalogueDescription").val();
		obj.catalogueTypeId = $("#spCatalogueType").val();
		obj.catalogueTypeDescription = $("#spCatalogueType option:selected").text();

		var $data = Commons.toJsonSnakeCase(obj);


		$.ajax({
			type    : "POST",
			url     : Constants.CONTEXT_ROOT + "/app/service/catalogue",
			dataType: 'json',
			data: $data,
			contentType: "application/json;",
			success:function(data) {
				if(data != null && data.status == 0){

					reset();
					$("#modalAddCatalogue").modal("hide");

					var table = $('#tCatalogueResult').DataTable();
					table.clear().draw();
					$('#filterSpCatalogueType option[value="' + obj.catalogueTypeId + '"]').prop('selected', true);
					get(handler);


					return;
				}else{
					noty(
						{
							text: '<strong>Ups! Mensaje: ' + data.message + '</strong>',
							layout:'topRight',
							type:'alert',
							timeout:10000,
							animation: {
								open: 'animated bounceInDown', // Animate.css class names
								close: 'animated bounceOutUp', // Animate.css class names
								easing: 'swing', // unavailable - no need
								speed: 500 // unavailable - no need
							}
						}
					);
				}

				return;
			},
			error:function(data){
				noty(
					{
						text: '<strong>Error al intentar dar de Alta. Mensaje: ' + data.responseJSON.cause + '</strong>',
						layout:'topRight',
						type:'error',
						timeout:10000,
						animation: {
							open: 'animated bounceInDown', // Animate.css class names
							close: 'animated bounceOutUp', // Animate.css class names
							easing: 'swing', // unavailable - no need
							speed: 500 // unavailable - no need
						}
					}
				);

				return;
			}
		});

		return;
	};

	var reset = function(){

		$("#spCatalogueCode").val("");
		$("#spCatalogueDescription").val("");
		$("#spCatalogueType option:selected").removeAttr("selected");

	};

	var getAuditedByCode = function(){

		$('#modalCatalogueAuditedTable').modal('show');
		$('.auditoria').width('80%');
		$.ajax({
			type    : "GET",
			url     : Constants.CONTEXT_ROOT + "/app/service/audited/catalogue",
			dataType: 'json',
			contentType: "application/json;",
			success:function(data) {

				$("#auditedCatalogueTable").DataTable().destroy();
				RestConnector.appendTemplateResults(data, "#auditedCatalogueTableBody", "#rowAuditedSheet");
				$("#auditedCatalogueTable").DataTable({
					"order":{
		       			   "columnDefs": [ {
		    		    	      "targets"  : 'no-sort',
		    		    	      "orderable": true,
		    		    	    }]
		    		   		}
				});
			},
			error:function(data){
				ButtonsRulesAction.showNoty("Ups! Mensaje: " + data.responseJSON.message, "topRight", "alert", false);				
			}
		});
	};

	var getCatalogueByType = function (type,handler,params) {
		var settings = new Object();
		settings.url = "catalogue";
		if(params == null || params === undefined){
			params = [];
		}
		params.push({"name" : "catalogueTypeDescription", "value": type});
		settings.params = params;
		settings.handler = handler;

		RestConnector.get(settings);
	};

	var getModel = function (handler,params) {
		getCatalogueByType("MODELO",handler,params);
	};

	var getSellType = function (handler,params) {
		getCatalogueByType("TIPO DE VENTA",handler,params);
	};
	
	var getProductType = function (handler,params) {
		getCatalogueByType("TIPO DE PRODUCTO",handler,params);
	};
	
	var getCountry = function (handler,params) {
		getCatalogueByType("PAIS",handler,params);
	};

	var getVCC = function (handler,params) {
		getCatalogueByType("VCC",handler,params);
	};

	return {
		init: init,
		removeOnly: removeOnly,
		reset: reset,
		getSellType: getSellType,
		getModel: getModel,
		getProductType: getProductType,
		getCountry: getCountry,
		getVCC: getVCC
	}
})();

