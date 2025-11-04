package com.gamestack.repository;

import com.gamestack.entity.Otp;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends MongoRepository<Otp, String> {
    
    Optional<Otp> findByEmailAndCodeAndUsedFalse(String email, String code);
    
    Optional<Otp> findTopByEmailOrderByCreatedAtDesc(String email);
    
    void deleteByEmail(String email);
}
