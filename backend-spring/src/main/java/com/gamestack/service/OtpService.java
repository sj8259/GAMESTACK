package com.gamestack.service;

import com.gamestack.entity.Otp;
import com.gamestack.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {
    
    @Autowired
    private OtpRepository otpRepository;
    
    @Autowired
    private EmailService emailService;
    
    private static final int OTP_LENGTH = 6;
    private static final Random random = new Random();
    
    public String generateOtp() {
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }
    
    public void sendOtp(String email) {
        // Delete any existing unused OTPs for this email
        otpRepository.deleteByEmail(email);
        
        // Generate new OTP
        String otpCode = generateOtp();
        
        // Save OTP to database
        Otp otp = new Otp(email, otpCode);
        otpRepository.save(otp);
        
        // Send OTP via email
        emailService.sendOtpEmail(email, otpCode);
    }
    
    public boolean validateOtp(String email, String code) {
        Optional<Otp> otpOpt = otpRepository.findByEmailAndCodeAndUsedFalse(email, code);
        
        if (otpOpt.isEmpty()) {
            return false;
        }
        
        Otp otp = otpOpt.get();
        
        if (!otp.isValid()) {
            return false;
        }
        
        // Mark OTP as used
        otp.setUsed(true);
        otpRepository.save(otp);
        
        return true;
    }
    
    public Optional<Otp> getLatestOtp(String email) {
        return otpRepository.findTopByEmailOrderByCreatedAtDesc(email);
    }
}
