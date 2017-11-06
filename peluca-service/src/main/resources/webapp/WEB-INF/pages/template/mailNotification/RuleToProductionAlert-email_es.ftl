<#macro from_address>
    cfa-mixer@despegar.com
</#macro>

<#macro from_name>
    Cfa-Mixer - ${environment}
</#macro>

<#macro subject>
    Mixer - ${environment} - Notificación Pasaje a Produccion - Regla - ${ruleName}
</#macro>

<#macro body>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
        <body>
			<div class="row">
			  <h4>Fecha: ${dateNoti!} </h4>
			  <h4>Estimados, se envio a Produccion la version ${version!} de la regla: ${ruleName!} que comenzara a aṕlicar desde la fecha ${ruleStartDate!}. </h4>
        	  <a href='${urlToProduction!}'>Link a la regla de Produccion</a>
  			  <h4>Saludos Cordiales </h4>
  			  <h4>Mixer</h4>
			</div>
    	</body>
    </html>
</#macro>
