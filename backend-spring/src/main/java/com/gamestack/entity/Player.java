package com.gamestack.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "players")
public class Player {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    private Position position;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "rotation_id")
    private Rotation rotation;
    
    // Constructors
    public Player() {
        this.position = new Position();
        this.rotation = new Rotation();
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
    
    public Rotation getRotation() {
        return rotation;
    }
    
    public void setRotation(Rotation rotation) {
        this.rotation = rotation;
    }
}



