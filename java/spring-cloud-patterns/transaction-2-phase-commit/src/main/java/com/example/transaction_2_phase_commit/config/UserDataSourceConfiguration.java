package com.example.transaction_2_phase_commit.config;

import com.atomikos.jdbc.AtomikosDataSourceBean;
import com.mysql.cj.jdbc.MysqlXADataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
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
        entityManagerFactoryRef = "UserDataSourceConfiguration",
        transactionManagerRef = "transactionManager",
        basePackages = {"com.example.transaction_2_phase_commit.users"}
)
public class UserDataSourceConfiguration {

    public Map<String, String> jpaProperties() {
        Map<String, String> jpaProperties = new HashMap<>();
        jpaProperties.put("hibernate.hbm2ddl.auto", "none");
        jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        jpaProperties.put("hibernate.show_sql", "true");
        jpaProperties.put("hibernate.temp.use_jdbc_metadata_defaults", "false");
        jpaProperties.put("javax.persistence.transactionType", "JTA");
        return jpaProperties;
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapterMySQL() {
        HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();
        hibernateJpaVendorAdapter.setShowSql(true);
        hibernateJpaVendorAdapter.setGenerateDdl(true);
        hibernateJpaVendorAdapter.setDatabase(Database.MYSQL);
        return hibernateJpaVendorAdapter;
    }

    @Bean
    public EntityManagerFactoryBuilder userEntityManagerFactoryBuilder(
            @Qualifier("jpaVendorAdapterMySQL") JpaVendorAdapter jpaVendorAdapterMySQL) {
        return new EntityManagerFactoryBuilder(jpaVendorAdapterMySQL, jpaProperties(), null
        );
    }


    @Bean(name = "UserDataSourceConfiguration")
    public LocalContainerEntityManagerFactoryBean getPostgresEntityManager(
            @Qualifier("userEntityManagerFactoryBuilder") EntityManagerFactoryBuilder entityManagerFactoryBuilder,
            @Qualifier("userDataSource") DataSource postgresDataSource
    ) {
        return entityManagerFactoryBuilder
                .dataSource(postgresDataSource)
                .packages("com.example.transaction_2_phase_commit.users.domain")
                .persistenceUnit("mysql")
                .properties(jpaProperties())
                .jta(true)
                .build();
    }

    @Bean
    public DataSource userDataSource(
            @Value("${user.db.url}") String dbUrl,
            @Value("${user.db.username}") String username,
            @Value("${user.db.passport}") String password) {
        MysqlXADataSource mysqlXaDataSource = new MysqlXADataSource();
        mysqlXaDataSource.setUrl(dbUrl);
        mysqlXaDataSource.setUser(username);
        mysqlXaDataSource.setPassword(password);

        AtomikosDataSourceBean xaDataSource = new AtomikosDataSourceBean();
        xaDataSource.setXaDataSource(mysqlXaDataSource);
        xaDataSource.setUniqueResourceName("xa_user");
        xaDataSource.setMaxPoolSize(30);
        return xaDataSource;
    }

}
