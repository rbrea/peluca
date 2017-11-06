<#macro from_address>
    cfa-mixer@despegar.com
</#macro>

<#macro from_name>
    Cfa-Mixer - ${environment}
</#macro>

<#macro subject>
    Mixer - ${environment} - Notificación de Comentarios -  Regla - ${ruleName}
</#macro>

<#macro body>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
	    <style>
			table {
			    font-family: arial, sans-serif;
			    border-collapse: collapse;
			    width: 100%;
			}

		td, th {
		    border: 1px solid #dddddd;
		    text-align: left;
		    padding: 8px;
		}
		</style>

        <body>
			<div class="row">
			  <h4>Fecha: ${dateNoti!} </h4>
			  <p>Estimados, existen nuevos comentarios en la regla.</p>
        	  <a href='${urlComment!}'>Link a la regla</a>
  			  <p>Saludos Cordiales</p>
  			  <h4>Mixer</h4>
			</div>
    	</body>
    </html>
</#macro>
