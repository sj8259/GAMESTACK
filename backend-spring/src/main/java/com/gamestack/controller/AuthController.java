package com.gamestack.controller;

import com.gamestack.entity.User;
import com.gamestack.service.UserService;
import com.gamestack.service.OtpService;
import com.gamestack.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private OtpService otpService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = userService.createUser(request.getUsername(), request.getEmail(), request.getPassword());
            String token = jwtUtil.generateToken(user.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User created successfully");
            response.put("token", token);
            response.put("user", createUserResponse(user));
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.findByEmail(request.getEmail());
            
            if (!userService.validatePassword(request.getPassword(), user.getPassword())) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Invalid credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
            
            String token = jwtUtil.generateToken(user.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("user", createUserResponse(user));
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", createUserResponse(user));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody ProfileUpdateRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            if (request.getUsername() != null && !request.getUsername().equals(user.getUsername())) {
                if (userService.existsByUsername(request.getUsername())) {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "Username is already taken");
                    return ResponseEntity.badRequest().body(error);
                }
                user.setUsername(request.getUsername());
            }
            
            if (request.getAvatar() != null) {
                user.setAvatar(request.getAvatar());
            }
            
            user = userService.save(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Profile updated successfully");
            response.put("user", createUserResponse(user));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error updating profile");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // OTP Endpoints
    @PostMapping("/otp/send")
    public ResponseEntity<?> sendOtp(@Valid @RequestBody OtpSendRequest request) {
        try {
            otpService.sendOtp(request.getEmail());
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP sent successfully to your email");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to send OTP: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping("/otp/verify")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody OtpVerifyRequest request) {
        try {
            boolean isValid = otpService.validateOtp(request.getEmail(), request.getCode());
            
            if (!isValid) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Invalid or expired OTP");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
            
            // Check if user exists, if not create a new one
            User user;
            try {
                user = userService.findByEmail(request.getEmail());
            } catch (RuntimeException e) {
                // User doesn't exist, create a new one
                String username = request.getEmail().split("@")[0]; // Use email prefix as username
                int counter = 1;
                while (userService.existsByUsername(username)) {
                    username = request.getEmail().split("@")[0] + counter;
                    counter++;
                }
                user = userService.createUser(username, request.getEmail(), passwordEncoder.encode(java.util.UUID.randomUUID().toString()));
            }
            
            String token = jwtUtil.generateToken(user.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "OTP verified successfully");
            response.put("token", token);
            response.put("user", createUserResponse(user));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to verify OTP: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Google OAuth Endpoints
    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(@Valid @RequestBody GoogleAuthRequest request) {
        try {
            // Verify Google ID token (you should verify this with Google in production)
            // For now, we'll create/login user based on Google account info
            String email = request.getEmail();
            String name = request.getName();
            String googleId = request.getGoogleId();
            
            User user;
            try {
                user = userService.findByEmail(email);
                // Update Google ID if not set
                if (user.getCustomAvatar() == null) {
                    // Store Google ID in customAvatar field for now, or add a googleId field
                }
            } catch (RuntimeException e) {
                // User doesn't exist, create a new one
                String username = name != null ? name.replaceAll("[^a-zA-Z0-9_]", "") : email.split("@")[0];
                int counter = 1;
                while (userService.existsByUsername(username)) {
                    username = (name != null ? name.replaceAll("[^a-zA-Z0-9_]", "") : email.split("@")[0]) + counter;
                    counter++;
                }
                // Generate a random password for Google users (they won't use it)
                user = userService.createUser(username, email, passwordEncoder.encode(java.util.UUID.randomUUID().toString()));
            }
            
            String token = jwtUtil.generateToken(user.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Google authentication successful");
            response.put("token", token);
            response.put("user", createUserResponse(user));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Google authentication failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getId());
        userResponse.put("username", user.getUsername());
        userResponse.put("email", user.getEmail());
        userResponse.put("progress", user.getProgress());
        userResponse.put("achievements", user.getAchievements());
        userResponse.put("avatar", user.getAvatar());
        userResponse.put("isAdmin", user.getIsAdmin());
        return userResponse;
    }
    
    // Request DTOs
    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
        
        // Getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    public static class LoginRequest {
        private String email;
        private String password;
        
        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    public static class ProfileUpdateRequest {
        private String username;
        private String avatar;
        
        // Getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getAvatar() { return avatar; }
        public void setAvatar(String avatar) { this.avatar = avatar; }
    }
    
    public static class OtpSendRequest {
        @jakarta.validation.constraints.Email(message = "Please provide a valid email")
        @jakarta.validation.constraints.NotBlank(message = "Email is required")
        private String email;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
    
    public static class OtpVerifyRequest {
        @jakarta.validation.constraints.Email(message = "Please provide a valid email")
        @jakarta.validation.constraints.NotBlank(message = "Email is required")
        private String email;
        
        @jakarta.validation.constraints.NotBlank(message = "OTP code is required")
        @jakarta.validation.constraints.Pattern(regexp = "\\d{6}", message = "OTP must be 6 digits")
        private String code;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }
    
    public static class GoogleAuthRequest {
        @jakarta.validation.constraints.Email(message = "Please provide a valid email")
        @jakarta.validation.constraints.NotBlank(message = "Email is required")
        private String email;
        
        private String name;
        private String googleId;
        private String picture;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getGoogleId() { return googleId; }
        public void setGoogleId(String googleId) { this.googleId = googleId; }
        public String getPicture() { return picture; }
        public void setPicture(String picture) { this.picture = picture; }
    }
}






