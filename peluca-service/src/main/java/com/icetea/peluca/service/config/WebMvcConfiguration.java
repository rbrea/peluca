package com.icetea.peluca.service.config;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.handler.AbstractHandlerMapping;
import org.springframework.web.servlet.view.BeanNameViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

import com.despegar.library.api.config.CustomWebMvcConfig;
import com.despegar.library.version.controller.VersionController;
import com.google.common.collect.Lists;

@EnableWebMvc
@Configuration
public class WebMvcConfiguration
    extends WebMvcConfigurationSupport {

    @Inject
    @Qualifier(value = "jacksonMessageConverter")
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Bean(name = "multipartResolver")
    public MultipartResolver getMultipartResolver() {
        CommonsMultipartResolver instance = new CommonsMultipartResolver();
        instance.setMaxUploadSize(100000000L);

        return instance;
    }

    @Bean
    public VersionController getVersionController() {
        return new VersionController();
    }

    @Bean
    public BeanNameViewResolver getBeanNameViewResolver() {
        BeanNameViewResolver instance = new BeanNameViewResolver();
        instance.setOrder(0);

        return instance;
    }

    @Bean
    public TilesViewResolver getTilesViewResolver() {
        TilesViewResolver instance = new TilesViewResolver();
        instance.setOrder(1);

        return instance;
    }

    @Bean
    public TilesConfigurer getTilesConfigurer() {
        TilesConfigurer instance = new TilesConfigurer();
        instance.setDefinitions("/WEB-INF/tiles/tiles.xml");

        return instance;
    }

    @Bean(name = "viewResolver")
    public InternalResourceViewResolver getViewResolver() {
        InternalResourceViewResolver instance = new InternalResourceViewResolver();
        instance.setViewClass(JstlView.class);
        instance.setPrefix("/WEB-INF/pages/");
        instance.setSuffix(".jsp");
        instance.setOrder(2);

        return instance;
    }

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/public/**").addResourceLocations("classpath:webapp/WEB-INF/public/");
    }

    @Override
    @Bean
    public HandlerMapping resourceHandlerMapping() {
        AbstractHandlerMapping handlerMapping = (AbstractHandlerMapping) super.resourceHandlerMapping();
        handlerMapping.setOrder(-1);

        return handlerMapping;
    }

    @Bean
    public CustomWebMvcConfig getCustomWebMvcConfig() {
        CustomWebMvcConfig instance = new CustomWebMvcConfig();
        instance.setMessageConverters(Lists.newArrayList(this.jacksonMessageConverter));

        return instance;
    }

}
