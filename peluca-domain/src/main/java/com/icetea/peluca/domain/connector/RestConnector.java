package com.icetea.peluca.domain.connector;

import static org.slf4j.LoggerFactory.getLogger;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.icetea.peluca.api.dto.BasicDto;
import com.icetea.peluca.domain.utils.StringUtils;

public abstract class RestConnector {

    @SuppressWarnings("unused")
    private static final Logger LOGGER = getLogger(RestConnector.class);

    protected static final String DEFAULT_PROTOCOL = "http://";

    public static final String ACCESS_TOKEN_KEY = "X-Access-Token";
    public static final String X_UOW_KEY = "X-UOW";
    public static final String X_CLIENT = "X-MYO";

    protected static final String CONTENT_LENGTH = "Content-Length";

    private final RestTemplate restTemplate;
    private final String host;

    public RestConnector(RestTemplate restTemplate, String host) {
        super();
        this.restTemplate = restTemplate;
        this.host = host;
    }

    protected final <T extends BasicDto> List<T> getList(final String url, Class<T> returnClass) {
        return this.getList(url, returnClass, Maps.newHashMap(), Maps.newHashMap());
    }

    protected final <T extends Serializable> List<T> getList(final String url, Class<T> returnClass,
        Map<String, String> headersMap) {
        return this.getList(url, returnClass, Maps.newHashMap(), headersMap);
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    protected final <T extends Serializable> List<T> getList(final String url, Class<T> returnClass,
        Map<String, String> urlVariables, Map<String, String> headersMap) {
        Preconditions.checkArgument(StringUtils.isNotBlank(url), "url is required");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("X-Client", X_CLIENT);
        String uow = UUID.randomUUID().toString();
        if (headersMap != null) {
            if (headersMap.containsKey(X_UOW_KEY)) {
                uow = headersMap.get(X_UOW_KEY);
            }
            if (headersMap.containsKey(ACCESS_TOKEN_KEY)) {
                // [roher] este header es para API-SEC (integracion con HRM)
                headers.set(ACCESS_TOKEN_KEY, headersMap.get(ACCESS_TOKEN_KEY));
            }
            for (String key : headersMap.keySet()) {
                headers.set(key, headersMap.get(key));
            }
        }
        headers.set(X_UOW_KEY, uow);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        List<T> values = Lists.newArrayList();
        ResponseEntity<List> responseEntity = this.restTemplate.exchange(DEFAULT_PROTOCOL + this.host + url, HttpMethod.GET,
            entity, List.class, urlVariables);

        final List forObject = responseEntity.getBody();

        if (forObject == null) {
            return values;
        }

        final ObjectMapper mapper = new ObjectMapper();

        values = (List<T>) forObject.stream().map(i -> (T) mapper.convertValue(i, returnClass)).collect(Collectors.toList());

        return values;
    }

    protected final <T extends BasicDto> T get(final String url, Class<T> returnClass) {
        return this.get(url, returnClass, Maps.newHashMap(), Maps.newHashMap());
    }

    protected final <T extends BasicDto> T get(final String url, Class<T> returnClass, Map<String, String> headersMap) {
        return this.get(url, returnClass, Maps.newHashMap(), headersMap);
    }

    private HttpHeaders createHeaders(Map<String, String> headersMap) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.set("X-Client", X_CLIENT);

        String uow = UUID.randomUUID().toString();
        if (headersMap != null) {
            if (headersMap.containsKey(X_UOW_KEY)) {
                uow = headersMap.get(X_UOW_KEY);
            }
            if (headersMap.containsKey(ACCESS_TOKEN_KEY)) {
                // [roher] este header es para API-SEC (integracion con HRM)
                headers.set(ACCESS_TOKEN_KEY, headersMap.get(ACCESS_TOKEN_KEY));
            }
        }
        headers.set(X_UOW_KEY, uow);

        return headers;
    }

    protected final <T extends BasicDto> T get(final String url, Class<T> returnClass, Map<String, String> urlVariables,
        Map<String, String> headersMap) {
        Preconditions.checkArgument(StringUtils.isNotBlank(url), "url is required");

        HttpHeaders headers = this.createHeaders(headersMap);

        if (headersMap != null) {
            for (String key : headersMap.keySet()) {
                headers.set(key, headersMap.get(key));
            }
        }
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<T> responseEntity = this.restTemplate.exchange(DEFAULT_PROTOCOL + this.host + url, HttpMethod.GET,
            entity, returnClass, urlVariables);

        return responseEntity.getBody();
    }

    protected final <T extends Serializable, I extends Serializable> T post(final String url, I input,
        Class<T> returnClass) {
        return this.post(url, input, returnClass, Maps.newHashMap());
    }

    protected final <T extends Serializable, I extends Serializable> T post(final String url, I input, Class<T> returnClass,
        Map<String, String> headersMap) {
        Preconditions.checkArgument(StringUtils.isNotBlank(url), "url is required");
        HttpHeaders headers = this.createHeaders(headersMap);
        if (input == null) {
            headers.set(CONTENT_LENGTH, StringUtils.ZERO);
        }
        HttpEntity<?> entity = new HttpEntity<>(input, headers);

        ResponseEntity<T> responseEntity = this.restTemplate.exchange(DEFAULT_PROTOCOL + this.host + url, HttpMethod.POST,
            entity, returnClass);

        return responseEntity.getBody();
    }

    protected final <T extends Serializable, I extends Serializable> T put(final String url, I input, Class<T> returnClass) {
        return this.put(url, input, returnClass, Maps.newHashMap());
    }

    protected final <T extends Serializable, I extends Serializable> T put(final String url, I input, Class<T> returnClass,
        Map<String, String> headersMap) {
        Preconditions.checkArgument(StringUtils.isNotBlank(url), "url is required");
        HttpHeaders headers = this.createHeaders(headersMap);
        HttpEntity<?> entity = new HttpEntity<>(input, headers);

        ResponseEntity<T> responseEntity = this.restTemplate.exchange(DEFAULT_PROTOCOL + this.host + url, HttpMethod.PUT,
            entity, returnClass);

        return responseEntity.getBody();
    }

}
