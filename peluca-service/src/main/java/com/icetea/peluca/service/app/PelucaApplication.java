package com.icetea.peluca.service.app;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

import com.despegar.library.routing.uow.UowHelper;
import com.icetea.peluca.domain.utils.Utils;
import com.newrelic.api.agent.NewRelic;

public class PelucaApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(PelucaApplication.class);

    private static final int DEFAULT_PORT = 9290;
    private static final String CONTEXT_PATH_PREFIX = "/icetea-peluca";
    private static final String WEBAPP_PATH = "webapp";
    private static final String WEB_XML_PATH = WEBAPP_PATH + "/WEB-INF/web.xml";

    public static void main(String[] args) throws Exception {
        int exitStatus = 0;
        Server server = null;

        try {
            UowHelper.createAndSetNewUnitOfWork(Utils.getHostName());
            LOGGER.debug("PELUCA APP esta empezando ... espere un momento por favor ...");
            int port = DEFAULT_PORT;

            if (args != null && args.length > 0) {
                port = Integer.valueOf(args[0]);
            }

            server = new Server(port);
            WebAppContext webAppContext = createWebAppContext();

            server.setHandler(webAppContext);

            server.start();
            server.join();
        } catch (InterruptedException e) {
            LOGGER.info("application server interrupted. Finish jvm with ok.");
            exitStatus = 2;
        } catch (Exception e) {
            LOGGER.error("Application server raise exception. Finish jvm with error: ", e);
            exitStatus = 1;
            NewRelic.noticeError(e);
        } finally {
            if (server != null) {
                server.stop();
                server.destroy();
            }
            LOGGER.info("PELUCA APP app ends");
        }
        // no-sonar
        System.exit(exitStatus);
    }

    private static WebAppContext createWebAppContext() throws Exception {

        WebAppContext webAppContext = new WebAppContext();

        String contextPath = getContextPath();

        webAppContext.setContextPath(contextPath);

        String webXmlPath = new ClassPathResource(WEB_XML_PATH).getURI().toString();

        LOGGER.info("PELUCA APP WEB_XML_PATH: " + webXmlPath);

        webAppContext.setDescriptor(webXmlPath);

        String webAppPath = new ClassPathResource(WEBAPP_PATH).getURI().toString();
        LOGGER.info("PELUCA APP WEB_PATH: " + webAppPath);
        webAppContext.setResourceBase(webAppPath);

        webAppContext.setParentLoaderPriority(true);
        return webAppContext;
    }

    private static String getContextPath() throws Exception {

        String contextPath = CONTEXT_PATH_PREFIX;

        LOGGER.info("PELUCA APP contextPath selected is: " + contextPath);

        return contextPath;
    }

}
