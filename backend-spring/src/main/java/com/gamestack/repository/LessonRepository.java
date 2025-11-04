package com.gamestack.repository;

import com.gamestack.entity.Lesson;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends MongoRepository<Lesson, String> {
    
    @Query("{ 'isPublished': true }")
    List<Lesson> findByIsPublishedTrueOrderByLevelAscOrderAsc();
    
    List<Lesson> findByIsPublishedTrueAndLevel(Integer level);
    
    List<Lesson> findByIsPublishedTrueAndDifficulty(String difficulty);
    
    List<Lesson> findByIsPublishedTrueAndConceptsContaining(String concept);
    
    @Query("{ 'isPublished': true, 'level': ?0 }")
    List<Lesson> findPublishedByLevelOrderByOrder(Integer level);
    
    @Query("{ 'isPublished': true, 'difficulty': ?0 }")
    List<Lesson> findPublishedByDifficultyOrderByLevelAndOrder(String difficulty);
    
    @Query("{ 'isPublished': true, 'concepts': { $in: [?0] } }")
    List<Lesson> findPublishedByConceptOrderByLevelAndOrder(String concept);
    
    @Query("{ 'isPublished': true, 'level': ?0, 'difficulty': ?1 }")
    List<Lesson> findPublishedByLevelAndDifficultyOrderByOrder(Integer level, String difficulty);
    
    List<Lesson> findByCreatedBy(String createdBy);
    
    @Query(value = "{ 'isPublished': true }", count = true)
    Long countPublishedLessons();
    
    @Query(value = "{ 'isPublished': true, 'difficulty': ?0 }", count = true)
    Long countPublishedLessonsByDifficulty(String difficulty);
}



