<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CFA-Mixer Docs</title>
  <link rel="icon" type="image/png" href="${pageContext.request.contextPath}/app/public/swagger-ui/images/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="${pageContext.request.contextPath}/app/public/swagger-ui/images/favicon-16x16.png" sizes="16x16" />
  <link href='${pageContext.request.contextPath}/app/public/swagger-ui/css/typography.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='${pageContext.request.contextPath}/app/public/swagger-ui/css/reset.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='${pageContext.request.contextPath}/app/public/swagger-ui/css/screen.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='${pageContext.request.contextPath}/app/public/swagger-ui/css/reset.css' media='print' rel='stylesheet' type='text/css'/>
  <link href='${pageContext.request.contextPath}/app/public/swagger-ui/css/print.css' media='print' rel='stylesheet' type='text/css'/>

  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/object-assign-pollyfill.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/jquery-1.8.0.min.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/jquery.slideto.min.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/jquery.wiggle.min.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/jquery.ba-bbq.min.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/handlebars-4.0.5.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/lodash.min.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/backbone-min.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/swagger-ui.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/highlight.9.1.0.pack.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/highlight.9.1.0.pack_extended.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/jsoneditor.min.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/marked.js' type='text/javascript'></script>
  <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lib/swagger-oauth.js' type='text/javascript'></script>

  <!-- Some basic translations -->
  <!-- <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lang/translator.js' type='text/javascript'></script> -->
  <!-- <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lang/ru.js' type='text/javascript'></script> -->
  <!-- <script src='${pageContext.request.contextPath}/app/public/swagger-ui/lang/en.js' type='text/javascript'></script> -->

  <script type="text/javascript">
    $(function () {
      var url = window.location.search.match(/url=([^&]+)/);
      if (url && url.length > 1) {
        url = decodeURIComponent(url[1]);
      } else {
        url = "${pageContext.request.contextPath}/app/docs/raw?no-cache";
      }

      hljs.configure({
        highlightSizeThreshold: 5000
      });

      // Pre load translate...
      if(window.SwaggerTranslator) {
        window.SwaggerTranslator.translate();
      }
      window.swaggerUi = new SwaggerUi({
        url: url,
        dom_id: "swagger-ui-container",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        onComplete: function(swaggerApi, swaggerUi){
          if(typeof initOAuth == "function") {
            initOAuth({
              clientId: "your-client-id",
              clientSecret: "your-client-secret-if-required",
              realm: "your-realms",
              appName: "CFA-Mixer",
              scopeSeparator: " ",
              additionalQueryStringParams: {}
            });
          }

          if(window.SwaggerTranslator) {
            window.SwaggerTranslator.translate();
          }
        },
        onFailure: function(data) {
          log("Unable to Load SwaggerUI");
        },
        docExpansion: "none",
        jsonEditor: false,
        defaultModelRendering: 'schema',
        showRequestHeaders: false
      });

      window.swaggerUi.load();

      function log() {
        if ('console' in window) {
          console.log.apply(console, arguments);
        }
      }
  });
  </script>
</head>

<body class="swagger-section">
<div id='header'>
  <div class="swagger-ui-wrap">
    <a id="logo" href="http://swagger.io"><img class="logo__img" alt="swagger" height="30" width="30" src="${pageContext.request.contextPath}/app/public/swagger-ui/images/logo_small.png" />
    	<span class="logo__title">CFA-Mixer Documents</span>
    </a>
    <form id='api_selector'>
      <div class='input'><input placeholder="http://example.com/api" id="input_baseUrl" name="baseUrl" type="text"/></div>
      <div id='auth_container'></div>
    </form>
  </div>
</div>

<div id="message-bar" class="swagger-ui-wrap" data-sw-translate>&nbsp;</div>
<div id="swagger-ui-container" class="swagger-ui-wrap"></div>
</body>
</html>