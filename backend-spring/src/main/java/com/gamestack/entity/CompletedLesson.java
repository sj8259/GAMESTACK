package com.gamestack.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "completed_lessons")
public class CompletedLesson {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_progress_id", nullable = false)
    private UserProgress userProgress;
    
    @Column(name = "completed_at", nullable = false)
    private LocalDateTime completedAt;
    
    @Column(name = "score", nullable = false)
    private Integer score;
    
    @Column(name = "attempts")
    private Integer attempts = 1;
    
    // Constructors
    public CompletedLesson() {}
    
    public CompletedLesson(Lesson lesson, UserProgress userProgress, Integer score) {
        this.lesson = lesson;
        this.userProgress = userProgress;
        this.score = score;
        this.completedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Lesson getLesson() {
        return lesson;
    }
    
    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }
    
    public UserProgress getUserProgress() {
        return userProgress;
    }
    
    public void setUserProgress(UserProgress userProgress) {
        this.userProgress = userProgress;
    }
    
    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
    
    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
    
    public Integer getScore() {
        return score;
    }
    
    public void setScore(Integer score) {
        this.score = score;
    }
    
    public Integer getAttempts() {
        return attempts;
    }
    
    public void setAttempts(Integer attempts) {
        this.attempts = attempts;
    }
}



