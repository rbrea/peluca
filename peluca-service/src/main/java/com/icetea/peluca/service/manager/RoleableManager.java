package com.icetea.peluca.service.manager;

import static org.slf4j.LoggerFactory.getLogger;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.core.type.classreading.MetadataReaderFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.ClassUtils;
import org.springframework.util.SystemPropertyUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.common.collect.Lists;
import com.newrelic.api.agent.NewRelic;

@Named
public class RoleableManager {

    private static final Logger LOGGER = getLogger(RoleableManager.class);

    public static final String PERMISO_LECTURA = "LECTURA";
    public static final String PERMISO_ESCRITURA = "ESCRITURA";
    public static final String PERMISO_APROBADOR = "APROBADOR";
    public static final String ROLE_ADMIN_USER = "ADMIN_USER";

    private static final List<RoleSecured> SECURES = Lists.newArrayList();

    @PostConstruct
    public void init() {
        try {
            List<RoleSecured> list = this.buildSecures("com.despegar.cfa.mixer.service.controller");
            if (list != null) {
                list.stream().forEach(p -> SECURES.add(p));
            }
        } catch (ClassNotFoundException | IOException e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    public final List<RoleSecured> getSecures() {
        return SECURES;
    }

    public List<RoleSecured> buildSecures(String basePackage) throws IOException, ClassNotFoundException {

        ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
        MetadataReaderFactory metadataReaderFactory = new CachingMetadataReaderFactory(resourcePatternResolver);

        List<RoleSecured> candidates = Lists.newArrayList();
        String packageSearchPath = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX + this.resolveBasePackage(basePackage)
            + "/" + "**/*.class";
        Resource[] resources = resourcePatternResolver.getResources(packageSearchPath);
        for (Resource resource : resources) {
            if (resource.isReadable()) {
                MetadataReader metadataReader = metadataReaderFactory.getMetadataReader(resource);
                if (this.isCandidate(metadataReader, Controller.class)) {
                    List<RoleSecured> list = this.doGetSecures(metadataReader);
                    if (list != null && !list.isEmpty()) {
                        candidates.addAll(list);
                    }
                }
            }
        }

        return candidates;
    }

    private String resolveBasePackage(String basePackage) {
        return ClassUtils.convertClassNameToResourcePath(SystemPropertyUtils.resolvePlaceholders(basePackage));
    }

    private boolean isCandidate(MetadataReader metadataReader, Class<? extends Annotation> annotationType) {
        try {
            Class<?> c = Class.forName(metadataReader.getClassMetadata().getClassName());
            if (c.getAnnotation(annotationType) != null) {
                return true;
            }
        } catch (Exception e) {

        }

        return false;
    }

    public static class RoleSecured {
        private String path;
        private String roleName;
        private String permission;

        public String getPath() {
            return this.path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getRoleName() {
            return this.roleName;
        }

        public void setRoleName(String roleName) {
            this.roleName = roleName;
        }

        public String getPermission() {
            return this.permission;
        }

        public void setPermission(String permission) {
            this.permission = permission;
        }
    }

    private List<RoleSecured> doGetSecures(MetadataReader metadataReader) {
        List<RoleSecured> secures = Lists.newArrayList();
        try {
            Class<?> c = Class.forName(metadataReader.getClassMetadata().getClassName());

            for (Method method : c.getMethods()) {
                Roleable secAnnotation = method.getAnnotation(Roleable.class);
                if (secAnnotation != null) {
                    RequestMapping rmAnnotation = method.getAnnotation(RequestMapping.class);
                    if (rmAnnotation != null) {
                        String[] values = rmAnnotation.value();
                        if (values != null && values.length > 0) {
                            String classUrl = StringUtils.EMPTY;
                            // obtengo la url de la clase para componer el path completo ...
                            RequestMapping classRqMappingAnnotation = c.getAnnotation(RequestMapping.class);
                            if (classRqMappingAnnotation != null) {
                                if (classRqMappingAnnotation.value() != null
                                    && classRqMappingAnnotation.value().length > 0) {
                                    classUrl = classRqMappingAnnotation.value()[0];
                                }
                            }
                            for (String v : secAnnotation.permissions()) {
                                RoleSecured roleSecured = new RoleSecured();
                                roleSecured.setRoleName(secAnnotation.object());
                                roleSecured.setPermission(v);
                                // [roher] asumo que siempre cargamos una url en el value ...
                                roleSecured.setPath(classUrl + values[0]);

                                secures.add(roleSecured);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            NewRelic.noticeError(e.getMessage());
        }

        return secures;
    }

    public boolean exists(String path, String objectName, String permission) {
        return SECURES.stream()
            .filter(p -> StringUtils.endsWith(path, p.getPath())
                && (StringUtils.isBlank(p.roleName) || StringUtils.equals(objectName, p.getRoleName()))
                && StringUtils.equals(permission, p.getPermission()))
            .findFirst().orElse(null) != null;
    }

    public boolean hasToValidate(String path) {
        return SECURES.stream().filter(p -> StringUtils.endsWith(path, p.getPath())).findFirst().orElse(null) != null;
    }

}
