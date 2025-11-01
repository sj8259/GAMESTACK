package com.gamestack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "gems")
public class Gem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    private Position position;
    
    @Column(name = "collected", nullable = false)
    private Boolean collected = false;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "world_state_id")
    private WorldState worldState;
    
    // Constructors
    public Gem() {
        this.position = new Position();
    }
    
    public Gem(Position position) {
        this.position = position;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Position getPosition() {
        return position;
    }
    
    public void setPosition(Position position) {
        this.position = position;
    }
    
    public Boolean getCollected() {
        return collected;
    }
    
    public void setCollected(Boolean collected) {
        this.collected = collected;
    }
    
    public WorldState getWorldState() {
        return worldState;
    }
    
    public void setWorldState(WorldState worldState) {
        this.worldState = worldState;
    }
}



