package com.gamestack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lessons")
@EntityListeners(AuditingEntityListener.class)
public class Lesson {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Lesson title is required")
    @Size(max = 100, message = "Title cannot exceed 100 characters")
    @Column(nullable = false)
    private String title;
    
    @NotBlank(message = "Lesson description is required")
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(nullable = false)
    private String description;
    
    @NotBlank(message = "Lesson instructions are required")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String instructions;
    
    @ElementCollection
    @CollectionTable(name = "lesson_hints", joinColumns = @JoinColumn(name = "lesson_id"))
    @Column(name = "hint", columnDefinition = "TEXT")
    private List<String> hints = new ArrayList<>();
    
    @NotNull(message = "Level is required")
    @Min(value = 1, message = "Level must be at least 1")
    @Max(value = 50, message = "Level cannot exceed 50")
    @Column(nullable = false)
    private Integer level;
    
    @NotNull(message = "Order is required")
    @Min(value = 1, message = "Order must be at least 1")
    @Column(name = "lesson_order", nullable = false)
    private Integer order;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty = Difficulty.BEGINNER;
    
    @ElementCollection
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "lesson_concepts", joinColumns = @JoinColumn(name = "lesson_id"))
    @Column(name = "concept")
    private List<Concept> concepts = new ArrayList<>();
    
    @Column(name = "starting_code", columnDefinition = "TEXT")
    private String startingCode = "# Write your code here\n# Available functions: move(), turnLeft(), turnRight(), pickGem()\n\n";
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "world_state_id", nullable = true)
    private WorldState worldState;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "target_state_id", nullable = true)
    private TargetState targetState;
    
    @Column(name = "success_message", columnDefinition = "TEXT")
    private String successMessage = "Congratulations! You completed the lesson!";
    
    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = false;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Lesson() {}
    
    public Lesson(String title, String description, String instructions, Integer level, Integer order, User createdBy) {
        this.title = title;
        this.description = description;
        this.instructions = instructions;
        this.level = level;
        this.order = order;
        this.createdBy = createdBy;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
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
    
    public Difficulty getDifficulty() {
        return difficulty;
    }
    
    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }
    
    public List<Concept> getConcepts() {
        return concepts;
    }
    
    public void setConcepts(List<Concept> concepts) {
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
    
    public User getCreatedBy() {
        return createdBy;
    }
    
    public void setCreatedBy(User createdBy) {
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
        return worldState != null ? worldState.getGems().size() : 0;
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

