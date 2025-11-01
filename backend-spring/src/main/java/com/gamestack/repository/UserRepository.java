package com.gamestack.repository;

import com.gamestack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByUsername(String username);
    
    boolean existsByEmail(String email);
    
    boolean existsByUsername(String username);
    
    @Query("SELECT u FROM User u WHERE u.isAdmin = true")
    List<User> findAdmins();
    
    @Query("SELECT u FROM User u ORDER BY u.progress.totalScore DESC")
    List<User> findAllOrderByTotalScoreDesc();
    
    @Query("SELECT u FROM User u WHERE u.progress.totalScore > :minScore ORDER BY u.progress.totalScore DESC")
    List<User> findByMinScoreOrderByTotalScoreDesc(@Param("minScore") Integer minScore);
}
