package com.gamestack.entity;

import org.springframework.data.mongodb.core.mapping.Field;

public class Player {
    
    @Field("position")
    private Position position;
    
    @Field("rotation")
    private Rotation rotation;
    
    // Constructors
    public Player() {
        this.position = new Position();
        this.rotation = new Rotation();
    }
    
    // Getters and Setters
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





