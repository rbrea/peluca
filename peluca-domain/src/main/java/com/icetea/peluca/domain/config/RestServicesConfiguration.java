package com.icetea.peluca.domain.config;

import javax.inject.Inject;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import com.despegar.cfa.library.utils.serializer.JsonSerializer;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.google.common.collect.Lists;
import com.icetea.peluca.domain.connector.CustomObjectMapper;

@Configuration
public class RestServicesConfiguration {

	@Inject
	private CustomObjectMapper customObjectMapper;
	
    @Bean
    public SimpleClientHttpRequestFactory getClientHttpRequestFactory() {
        SimpleClientHttpRequestFactory clientHttpRequestFactory = new SimpleClientHttpRequestFactory();

        return clientHttpRequestFactory;
    }
    
    @Bean(name = "restTemplate")
    public RestTemplate buildRestTemplateSnakeCase() {
        RestTemplate restTemplate = new RestTemplate(this.getSimpleClientHttpRequestFactory());
        restTemplate.setMessageConverters(Lists.newArrayList(this.getMappingCamelCaseJackson2HttpMessageConverter()));

        return restTemplate;
    }

    @Bean(name = "jacksonMessageConverter")
    public MappingJackson2HttpMessageConverter getMappingCamelCaseJackson2HttpMessageConverter() {
        MappingJackson2HttpMessageConverter jsonMessageConverter = new MappingJackson2HttpMessageConverter();

        return jsonMessageConverter;
    }

    @Bean
    public SimpleClientHttpRequestFactory getSimpleClientHttpRequestFactory() {
        return new SimpleClientHttpRequestFactory();
    }

    @Bean
    public SerializationConfig getSerializationConfig() {
        SerializationConfig serializationConfig = this.customObjectMapper.getSerializationConfig();

        return serializationConfig;
    }

    @Bean
	public JsonSerializer getJsonSerializer(){
		return new JsonSerializer(this.customObjectMapper);
	}
    
}
