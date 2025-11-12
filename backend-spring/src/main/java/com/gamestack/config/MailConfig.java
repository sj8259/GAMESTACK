package com.gamestack.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

/**
 * Mail configuration - only creates JavaMailSender bean if MAIL_USERNAME is set
 * This prevents Spring Boot from trying to auto-configure mail when credentials are missing
 */
@Configuration
@ConditionalOnProperty(name = "spring.mail.username", matchIfMissing = false)
public class MailConfig {
    
    @Bean
    public JavaMailSender javaMailSender() {
        return new JavaMailSenderImpl();
    }
}

