package com.icetea.peluca.service.config;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.collect.Sets;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
	
	@Resource
	private ServletContext servletContext;
	
	@Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
    		.apiInfo(this.apiInfo())
    		.produces(Sets.newHashSet("application/json"))
//    		.host(Utils.getHostName())
//    		.pathProvider(new PathProvider() {
//				
//				@Override
//				public String getResourceListingPath(String groupName, String apiDeclaration) {
//					return "";
//				}
//				
//				@Override
//				public String getOperationPath(String operationPath) {
//					return "";
//				}
//				
//				@Override
//				public String getApplicationBasePath() {
//					return "/v3";
//				}
//			})
            .select()
            	.apis(RequestHandlerSelectors.any())
            	.paths(PathSelectors.regex("/v3/.*"))
            	.build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("CFA-Mixer API")
            .description("<h2>Documentación de los servicios REST de la aplicación CFA-Mixer</h2>")
            .version("1.0.0")
            .build();
    }
    
}
