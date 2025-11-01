package com.gamestack.repository;

import com.gamestack.entity.CompletedLesson;
import com.gamestack.entity.Lesson;
import com.gamestack.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompletedLessonRepository extends JpaRepository<CompletedLesson, Long> {
    
    Optional<CompletedLesson> findByUserProgressAndLesson(UserProgress userProgress, Lesson lesson);
    
    List<CompletedLesson> findByUserProgressOrderByCompletedAtDesc(UserProgress userProgress);
    
    
    @Query("SELECT cl FROM CompletedLesson cl WHERE cl.userProgress = :userProgress AND cl.score = 100 ORDER BY cl.completedAt DESC")
    List<CompletedLesson> findPerfectScoresByUserProgress(@Param("userProgress") UserProgress userProgress);
    
    @Query("SELECT COUNT(cl) FROM CompletedLesson cl WHERE cl.userProgress = :userProgress")
    Long countByUserProgress(@Param("userProgress") UserProgress userProgress);
    
    @Query("SELECT AVG(cl.score) FROM CompletedLesson cl WHERE cl.userProgress = :userProgress")
    Double getAverageScoreByUserProgress(@Param("userProgress") UserProgress userProgress);
    
    boolean existsByUserProgressAndLesson(UserProgress userProgress, Lesson lesson);
}
