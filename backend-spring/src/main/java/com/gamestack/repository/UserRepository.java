package com.gamestack.repository;

import com.gamestack.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByUsername(String username);
    
    boolean existsByEmail(String email);
    
    boolean existsByUsername(String username);
    
    @Query("{ 'isAdmin': true }")
    List<User> findAdmins();
    
    @Query("{ }")
    List<User> findAllOrderByTotalScoreDesc();
    
    @Query("{ 'progress.totalScore': { $gt: ?0 } }")
    List<User> findByMinScoreOrderByTotalScoreDesc(Integer minScore);
}
