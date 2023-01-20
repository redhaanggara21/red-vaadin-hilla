package com.example.application.security;


import java.util.Base64;
import javax.crypto.spec.SecretKeySpec;
import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

/**
 * <code>VaadinWebSecurity</code> used in favor of the now deprecated
 * <code>VaadinWebSecurityConfigurerAdapter</code>
 * 
 * @see com.vaadin.flow.spring.security.VaadinWebSecurityConfigurerAdapter
 */
@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {

    @Value("${app.secret}")
    private String appSecret;

    @Override
    protected void configure(HttpSecurity http) throws Exception { // 2
        super.configure(http);
        setLoginView(http, "/login");
        
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        setStatelessAuthentication(
            http,
            new SecretKeySpec(Base64.getDecoder().decode(appSecret), JwsAlgorithms.HS256),
            "com.example.application"
        );
    }

    /**
     * Not Secure!! Use for development only!!
     * 
     * For details check 
     * <a href="https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/in-memory.html">
     * the relevant docs
     * </a> or refer to the section titled In-Memory Authentication of
     * <a href="https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter">
     * this Spring Security Blog post
     * </a>.
     */
    @Bean
    public InMemoryUserDetailsManager userDetailsService() { // 3
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("password")
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(user);
    }
}

