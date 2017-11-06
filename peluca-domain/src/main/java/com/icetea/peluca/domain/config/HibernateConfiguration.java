package com.icetea.peluca.domain.config;

import java.util.Properties;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
@EnableTransactionManagement
public class HibernateConfiguration {

    @Inject
    private Environment env;

    @Inject
    @Value(value = "${jdbc.maxPoolSize:20}")
    private int maximumPoolSize;

    @Bean
    public LocalSessionFactoryBean getSessionFactory() {
        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setDataSource(this.getDataSource());
        sessionFactory.setPackagesToScan(new String[] {"com.icetea.peluca.domain"});
        sessionFactory.setHibernateProperties(this.getHibernateProperties());

        return sessionFactory;
    }

    @Bean
    public DataSource getDataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setDriverClassName(this.env.getRequiredProperty("jdbc.driverClassName"));
        dataSource.setJdbcUrl(this.env.getRequiredProperty("jdbc.url"));
        dataSource.setUsername(this.env.getRequiredProperty("jdbc.username"));
        dataSource.setPassword(this.env.getRequiredProperty("jdbc.password"));
        dataSource.setTransactionIsolation("TRANSACTION_READ_COMMITTED");
        dataSource.setMaximumPoolSize(this.maximumPoolSize);

        return dataSource;
    }

    private Properties getHibernateProperties() {
        Properties properties = new Properties();
        properties.put("hibernate.hbm2ddl.auto", this.env.getRequiredProperty("hibernate.hbm2ddl.auto"));
        properties.put("hibernate.dialect", this.env.getRequiredProperty("hibernate.dialect"));
        properties.put("hibernate.show_sql", this.env.getRequiredProperty("hibernate.show_sql"));
        properties.put("hibernate.format_sql", this.env.getRequiredProperty("hibernate.format_sql"));
        properties.put("hibernate.use_sql_comments", this.env.getRequiredProperty("hibernate.use_sql_comments"));
        properties.put("hibernate.hbm2ddl.import_files", "/import.sql");
        // [roher] esta, es la q hace q cdo guarda la aud de eliminar,, almacene igual los datos previos a borrarse :-D
        properties.put("org.hibernate.envers.store_data_at_delete",
            this.env.getRequiredProperty("hibernate.envers.store_data_at_delete"));

        return properties;
    }

    @Bean
    @Inject
    public HibernateTransactionManager transactionManager(SessionFactory sessionFactory) {
        HibernateTransactionManager txManager = new HibernateTransactionManager();
        txManager.setSessionFactory(sessionFactory);

        return txManager;
    }

    public PersistenceExceptionTranslationPostProcessor persistenceExceptionTranslationPostProcessor() {
        return new PersistenceExceptionTranslationPostProcessor();
    }

}
