package com.gamestack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {
    // Exclude mail auto-configuration if MAIL_USERNAME is not set
    // This prevents crashes when email is not configured
    MailSenderAutoConfiguration.class
})
@EnableMongoAuditing
@EnableScheduling
public class GamestackApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamestackApplication.class, args);
    }

}
