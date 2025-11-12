package com.gamestack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "spring.mail.username", havingValue = "", matchIfMissing = false)
public class EmailService {
    
    @Autowired(required = false)
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username:}")
    private String fromEmail;
    
    @Value("${app.name:GameStack}")
    private String appName;
    
    public void sendOtpEmail(String toEmail, String otpCode) {
        // Check if email is configured
        if (fromEmail == null || fromEmail.isEmpty() || mailSender == null) {
            System.out.println("WARNING: Email service not configured. OTP email not sent. Set MAIL_USERNAME and MAIL_PASSWORD to enable email.");
            return; // Don't crash, just log and return
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(appName + " - Your Login OTP Code");
            message.setText(buildOtpEmailBody(otpCode));
            
            mailSender.send(message);
        } catch (Exception e) {
            String errorMsg = e.getMessage();
            System.err.println("Failed to send OTP email: " + errorMsg);
            // Don't throw exception - just log the error
            // This prevents the app from crashing if email fails
        }
    }
    
    private String buildOtpEmailBody(String otpCode) {
        return String.format(
            "Hello!\n\n" +
            "Your OTP code for %s login is:\n\n" +
            "%s\n\n" +
            "This code will expire in 10 minutes.\n\n" +
            "If you didn't request this code, please ignore this email.\n\n" +
            "Best regards,\n" +
            "The %s Team",
            appName, otpCode, appName
        );
    }
}
