package com.gamestack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "obstacles")
public class Obstacle {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    private Position position;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ObstacleType type = ObstacleType.WALL;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "world_state_id")
    private WorldState worldState;
    
    // Constructors
    public Obstacle() {
        this.position = new Position();
    }
    
    public Obstacle(Position position, ObstacleType type) {
        this.position = position;
        this.type = type;
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
    
    public ObstacleType getType() {
        return type;
    }
    
    public void setType(ObstacleType type) {
        this.type = type;
    }
    
    public WorldState getWorldState() {
        return worldState;
    }
    
    public void setWorldState(WorldState worldState) {
        this.worldState = worldState;
    }
}



