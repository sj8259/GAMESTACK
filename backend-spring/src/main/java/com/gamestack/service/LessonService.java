package com.gamestack.service;

import com.gamestack.entity.Lesson;
import com.gamestack.entity.Difficulty;
import com.gamestack.entity.Concept;
import com.gamestack.entity.User;
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
    
    public List<Lesson> getLessonsByDifficulty(Difficulty difficulty) {
        return lessonRepository.findPublishedByDifficultyOrderByLevelAndOrder(difficulty);
    }
    
    public List<Lesson> getLessonsByConcept(Concept concept) {
        return lessonRepository.findPublishedByConceptOrderByLevelAndOrder(concept);
    }
    
    public List<Lesson> getLessonsByLevelAndDifficulty(Integer level, Difficulty difficulty) {
        return lessonRepository.findPublishedByLevelAndDifficultyOrderByOrder(level, difficulty);
    }
    
    public Lesson findById(Long id) {
        return lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found with id: " + id));
    }
    
    public Lesson save(Lesson lesson) {
        return lessonRepository.save(lesson);
    }
    
    public Lesson createLesson(Lesson lesson, User createdBy) {
        lesson.setCreatedBy(createdBy);
        return lessonRepository.save(lesson);
    }
    
    public Lesson updateLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }
    
    public void deleteLesson(Long id) {
        lessonRepository.deleteById(id);
    }
    
    public List<Lesson> getLessonsByCreator(User creator) {
        return lessonRepository.findByCreatedById(creator.getId());
    }
    
    public Long countPublishedLessons() {
        return lessonRepository.countPublishedLessons();
    }
    
    public Long countPublishedLessonsByDifficulty(Difficulty difficulty) {
        return lessonRepository.countPublishedLessonsByDifficulty(difficulty);
    }
    
    public boolean existsById(Long id) {
        return lessonRepository.existsById(id);
    }
}



