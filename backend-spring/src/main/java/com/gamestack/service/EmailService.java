package com.gamestack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username:noreply@gamestack.com}")
    private String fromEmail;
    
    @Value("${app.name:GameStack}")
    private String appName;
    
    public void sendOtpEmail(String toEmail, String otpCode) {
        try {
            // Check if email is configured
            if (fromEmail == null || fromEmail.equals("noreply@gamestack.com") || 
                fromEmail.contains("your-email")) {
                throw new RuntimeException(
                    "Email service not configured. Please set MAIL_USERNAME and MAIL_PASSWORD environment variables or update application.yml. " +
                    "See QUICK_SETUP.md for instructions."
                );
            }
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(appName + " - Your Login OTP Code");
            message.setText(buildOtpEmailBody(otpCode));
            
            mailSender.send(message);
        } catch (Exception e) {
            String errorMsg = e.getMessage();
            if (errorMsg != null && (errorMsg.toLowerCase().contains("authentication") || 
                                     errorMsg.toLowerCase().contains("535") ||
                                     errorMsg.toLowerCase().contains("534"))) {
                throw new RuntimeException(
                    "Email authentication failed. Please check your Gmail App Password. " +
                    "Make sure 2-Step Verification is enabled and you're using an App Password, not your regular password. " +
                    "Set MAIL_USERNAME and MAIL_PASSWORD environment variables. See QUICK_SETUP.md for detailed setup instructions."
                );
            }
            throw new RuntimeException("Failed to send OTP email: " + e.getMessage(), e);
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
