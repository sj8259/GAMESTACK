package com.gamestack.entity;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "lessons")
public class Lesson {
    
    @Id
    private String id;
    
    @NotBlank(message = "Lesson title is required")
    @Size(max = 100, message = "Title cannot exceed 100 characters")
    private String title;
    
    @NotBlank(message = "Lesson description is required")
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    
    @NotBlank(message = "Lesson instructions are required")
    private String instructions;
    
    private List<String> hints = new ArrayList<>();
    
    @NotNull(message = "Level is required")
    @Min(value = 1, message = "Level must be at least 1")
    @Max(value = 50, message = "Level cannot exceed 50")
    @Indexed
    private Integer level;
    
    @NotNull(message = "Order is required")
    @Min(value = 1, message = "Order must be at least 1")
    @Indexed
    private Integer order;
    
    @Field("difficulty")
    private String difficulty = "beginner";
    
    private List<String> concepts = new ArrayList<>();
    
    @Field("startingCode")
    private String startingCode = "# Write your code here\n# Available functions: move(), turnLeft(), turnRight(), pickGem()\n\n";
    
    @Field("worldState")
    private WorldState worldState;
    
    @Field("targetState")
    private TargetState targetState;
    
    @Field("successMessage")
    private String successMessage = "Congratulations! You completed the lesson!";
    
    @Field("isPublished")
    @Indexed
    private Boolean isPublished = false;
    
    @Field("createdBy")
    private String createdBy;
    
    @CreatedDate
    @Field("createdAt")
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Field("updatedAt")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Lesson() {}
    
    public Lesson(String title, String description, String instructions, Integer level, Integer order, String createdBy) {
        this.title = title;
        this.description = description;
        this.instructions = instructions;
        this.level = level;
        this.order = order;
        this.createdBy = createdBy;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getInstructions() {
        return instructions;
    }
    
    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
    
    public List<String> getHints() {
        return hints;
    }
    
    public void setHints(List<String> hints) {
        this.hints = hints;
    }
    
    public Integer getLevel() {
        return level;
    }
    
    public void setLevel(Integer level) {
        this.level = level;
    }
    
    public Integer getOrder() {
        return order;
    }
    
    public void setOrder(Integer order) {
        this.order = order;
    }
    
    public String getDifficulty() {
        return difficulty;
    }
    
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    
    public List<String> getConcepts() {
        return concepts;
    }
    
    public void setConcepts(List<String> concepts) {
        this.concepts = concepts;
    }
    
    public String getStartingCode() {
        return startingCode;
    }
    
    public void setStartingCode(String startingCode) {
        this.startingCode = startingCode;
    }
    
    public WorldState getWorldState() {
        return worldState;
    }
    
    public void setWorldState(WorldState worldState) {
        this.worldState = worldState;
    }
    
    public TargetState getTargetState() {
        return targetState;
    }
    
    public void setTargetState(TargetState targetState) {
        this.targetState = targetState;
    }
    
    public String getSuccessMessage() {
        return successMessage;
    }
    
    public void setSuccessMessage(String successMessage) {
        this.successMessage = successMessage;
    }
    
    public Boolean getIsPublished() {
        return isPublished;
    }
    
    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }
    
    public String getCreatedBy() {
        return createdBy;
    }
    
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    // Business methods
    public int getTotalGems() {
        return worldState != null && worldState.getGems() != null ? worldState.getGems().size() : 0;
    }
    
    public boolean checkCompletion(PlayerState playerState) {
        if (targetState == null || playerState == null) return false;
        
        // Check position
        boolean positionMatch = 
            Math.abs(playerState.getPosition().getX() - targetState.getPlayerPosition().getX()) < 0.1 &&
            Math.abs(playerState.getPosition().getZ() - targetState.getPlayerPosition().getZ()) < 0.1;
        
        // Check gems collected
        boolean gemsMatch = playerState.getGemsCollected() >= targetState.getGemsCollected();
        
        return positionMatch && gemsMatch;
    }
}

