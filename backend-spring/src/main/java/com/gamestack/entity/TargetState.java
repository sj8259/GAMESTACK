package com.gamestack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "target_states")
public class TargetState {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "player_position_id")
    private Position playerPosition;
    
    @Column(name = "gems_collected", nullable = false)
    private Integer gemsCollected = 0;
    
    @Column(name = "max_moves", nullable = false)
    private Integer maxMoves = 100;
    
    // Constructors
    public TargetState() {
        this.playerPosition = new Position();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Position getPlayerPosition() {
        return playerPosition;
    }
    
    public void setPlayerPosition(Position playerPosition) {
        this.playerPosition = playerPosition;
    }
    
    public Integer getGemsCollected() {
        return gemsCollected;
    }
    
    public void setGemsCollected(Integer gemsCollected) {
        this.gemsCollected = gemsCollected;
    }
    
    public Integer getMaxMoves() {
        return maxMoves;
    }
    
    public void setMaxMoves(Integer maxMoves) {
        this.maxMoves = maxMoves;
    }
}



