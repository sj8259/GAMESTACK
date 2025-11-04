package com.gamestack.entity;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

public class CompletedLesson {
    
    @Field("lessonId")
    private String lessonId;
    
    @Field("completedAt")
    private Date completedAt;
    
    @Field("score")
    private Integer score;
    
    // Constructors
    public CompletedLesson() {
        this.completedAt = new Date();
    }
    
    public CompletedLesson(String lessonId, Integer score) {
        this.lessonId = lessonId;
        this.score = score;
        this.completedAt = new Date();
    }
    
    // Getters and Setters
    public String getLessonId() {
        return lessonId;
    }
    
    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }
    
    public Date getCompletedAt() {
        return completedAt;
    }
    
    public void setCompletedAt(Date completedAt) {
        this.completedAt = completedAt;
    }
    
    public Integer getScore() {
        return score;
    }
    
    public void setScore(Integer score) {
        this.score = score;
    }
}





