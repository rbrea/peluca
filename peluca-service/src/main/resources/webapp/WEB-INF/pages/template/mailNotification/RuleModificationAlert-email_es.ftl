<#macro from_address>
    cfa-mixer@despegar.com
</#macro>

<#macro from_name>
    Cfa-Mixer - ${environment}
</#macro>

<#macro subject>
    Mixer - ${environment} - Notificación de Modificacion -  Regla - ${ruleName}
</#macro>

<#macro body>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
        <body>
			<div class="row">
			  <h4>Fecha: ${dateNoti!} </h4>
			  <p>Estimados, se aprobo la nueva version ${version!} de la regla: ${ruleName!} que debera comenenzar a probarse el ${ruleStartDate!}. La nueva version se puede ver en 'Vista Pendiente' o 'Vista Activa'.</p>
        	  <a href="${urlRuleModification!}">Link a la regla</a>
  			  <p>Saludos Cordiales </p>
  			  <h4>Mixer</h4>
			</div>
    	</body>
    </html>
</#macro>
