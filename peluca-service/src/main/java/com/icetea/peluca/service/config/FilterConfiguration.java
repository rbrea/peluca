package com.icetea.peluca.service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.despegar.library.api.httpfilters.CompressionFilter;
import com.despegar.library.routing.filter.RoutingFilter;

@Configuration
public class FilterConfiguration {

    @Bean(name = "compressionFilter")
    public CompressionFilter getCompressionFilter() {
        return new CompressionFilter();
    }

    @Bean(name = "routingFilter")
    public RoutingFilter getRoutingFilter() {
        return new RoutingFilter();
    }

}
