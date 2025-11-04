package com.gamestack.service;

import com.gamestack.entity.Lesson;
import com.gamestack.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonService {
    
    @Autowired
    private LessonRepository lessonRepository;
    
    public List<Lesson> getAllPublishedLessons() {
        return lessonRepository.findByIsPublishedTrueOrderByLevelAscOrderAsc();
    }
    
    public List<Lesson> getLessonsByLevel(Integer level) {
        return lessonRepository.findPublishedByLevelOrderByOrder(level);
    }
    
    public List<Lesson> getLessonsByDifficulty(String difficulty) {
        return lessonRepository.findPublishedByDifficultyOrderByLevelAndOrder(difficulty);
    }
    
    public List<Lesson> getLessonsByConcept(String concept) {
        return lessonRepository.findPublishedByConceptOrderByLevelAndOrder(concept);
    }
    
    public List<Lesson> getLessonsByLevelAndDifficulty(Integer level, String difficulty) {
        return lessonRepository.findPublishedByLevelAndDifficultyOrderByOrder(level, difficulty);
    }
    
    public Lesson findById(String id) {
        return lessonRepository.findById(id)
                .orElse(null);
    }
    
    public List<Lesson> findAll() {
        return lessonRepository.findAll();
    }
    
    public Lesson save(Lesson lesson) {
        return lessonRepository.save(lesson);
    }
    
    public Lesson createLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }
    
    public Lesson updateLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }
    
    public void deleteLesson(String id) {
        lessonRepository.deleteById(id);
    }
    
    public List<Lesson> getLessonsByCreator(String createdBy) {
        return lessonRepository.findByCreatedBy(createdBy);
    }
    
    public Long countPublishedLessons() {
        return lessonRepository.countPublishedLessons();
    }
    
    public Long countPublishedLessonsByDifficulty(String difficulty) {
        return lessonRepository.countPublishedLessonsByDifficulty(difficulty);
    }
    
    public boolean existsById(String id) {
        return lessonRepository.existsById(id);
    }
}





