package com.example.transaction_2_phase_commit.config;

import com.atomikos.jdbc.AtomikosDataSourceBean;
import org.postgresql.xa.PGXADataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableJpaRepositories(
        entityManagerFactoryRef = "OrderDataSourceConfiguration",
        transactionManagerRef = "transactionManager",
        basePackages = {"com.example.transaction_2_phase_commit.orders"}
)
public class OrderDataSourceConfiguration {

    public Map<String, String> jpaProperties() {
        Map<String, String> accountJpaProperties = new HashMap<>();
        accountJpaProperties.put("hibernate.hbm2ddl.auto", "validate");
        accountJpaProperties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        accountJpaProperties.put("hibernate.show_sql", "true");
        accountJpaProperties.put("hibernate.temp.use_jdbc_metadata_defaults", "false");
//        accountJpaProperties.put("hibernate.transaction.jta.platform", "com.atomikos.icatch.jta.hibernate4.AtomikosPlatform");
        accountJpaProperties.put("javax.persistence.transactionType", "JTA");
        return accountJpaProperties;
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapterPostgres() {
        HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();
        hibernateJpaVendorAdapter.setShowSql(true);
        hibernateJpaVendorAdapter.setGenerateDdl(true);
        hibernateJpaVendorAdapter.setDatabase(Database.POSTGRESQL);
        return hibernateJpaVendorAdapter;
    }

    @Bean
    public EntityManagerFactoryBuilder orderEntityManagerFactoryBuilder(
            @Qualifier("jpaVendorAdapterPostgres") JpaVendorAdapter jpaVendorAdapterPostgres) {
        return new EntityManagerFactoryBuilder(jpaVendorAdapterPostgres, jpaProperties(), null
        );
    }


    @Bean(name = "OrderDataSourceConfiguration")
    public LocalContainerEntityManagerFactoryBean orderEntityManager(
            @Qualifier("orderEntityManagerFactoryBuilder") EntityManagerFactoryBuilder orderEntityManagerFactoryBuilder,
            @Qualifier("orderDataSource") DataSource postgresDataSource
    ) {
        return orderEntityManagerFactoryBuilder
                .dataSource(postgresDataSource)
                .packages("com.example.transaction_2_phase_commit.orders.domain")
                .persistenceUnit("postgres")
                .properties(jpaProperties())
                .jta(true)
                .build();
    }

    @Bean
    public DataSource orderDataSource(
            @Value("${order.db.url}") String dbUrl,
            @Value("${order.db.username}") String username,
            @Value("${order.db.passport}") String password) {
        PGXADataSource ds = new PGXADataSource();
        ds.setUrl(dbUrl);
        ds.setUser(username);
        ds.setPassword(password);

        AtomikosDataSourceBean xaDataSource = new AtomikosDataSourceBean();
        xaDataSource.setXaDataSource(ds);
        xaDataSource.setUniqueResourceName("xa_order");
        xaDataSource.setMaxPoolSize(30);
        return xaDataSource;
    }

}
