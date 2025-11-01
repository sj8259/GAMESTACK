package com.gamestack.repository;

import com.gamestack.entity.Lesson;
import com.gamestack.entity.Difficulty;
import com.gamestack.entity.Concept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    
    @Query("SELECT l FROM Lesson l WHERE l.isPublished = true ORDER BY l.level ASC, l.order ASC")
    List<Lesson> findByIsPublishedTrueOrderByLevelAscOrderAsc();
    
    List<Lesson> findByIsPublishedTrueAndLevel(Integer level);
    
    List<Lesson> findByIsPublishedTrueAndDifficulty(Difficulty difficulty);
    
    List<Lesson> findByIsPublishedTrueAndConceptsContaining(Concept concept);
    
    @Query("SELECT l FROM Lesson l WHERE l.isPublished = true AND l.level = :level ORDER BY l.order ASC")
    List<Lesson> findPublishedByLevelOrderByOrder(@Param("level") Integer level);
    
    @Query("SELECT l FROM Lesson l WHERE l.isPublished = true AND l.difficulty = :difficulty ORDER BY l.level ASC, l.order ASC")
    List<Lesson> findPublishedByDifficultyOrderByLevelAndOrder(@Param("difficulty") Difficulty difficulty);
    
    @Query("SELECT l FROM Lesson l WHERE l.isPublished = true AND :concept MEMBER OF l.concepts ORDER BY l.level ASC, l.order ASC")
    List<Lesson> findPublishedByConceptOrderByLevelAndOrder(@Param("concept") Concept concept);
    
    @Query("SELECT l FROM Lesson l WHERE l.isPublished = true AND l.level = :level AND l.difficulty = :difficulty ORDER BY l.order ASC")
    List<Lesson> findPublishedByLevelAndDifficultyOrderByOrder(@Param("level") Integer level, @Param("difficulty") Difficulty difficulty);
    
    List<Lesson> findByCreatedById(Long createdById);
    
    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.isPublished = true")
    Long countPublishedLessons();
    
    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.isPublished = true AND l.difficulty = :difficulty")
    Long countPublishedLessonsByDifficulty(@Param("difficulty") Difficulty difficulty);
}



