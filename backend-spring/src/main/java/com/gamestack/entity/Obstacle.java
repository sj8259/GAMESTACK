package com.gamestack.entity;

import org.springframework.data.mongodb.core.mapping.Field;

public class Obstacle {
    
    @Field("position")
    private Position position;
    
    @Field("type")
    private String type = "wall";
    
    // Constructors
    public Obstacle() {
        this.position = new Position();
    }
    
    public Obstacle(Position position, String type) {
        this.position = position;
        this.type = type;
    }
    
    // Getters and Setters
    public Position getPosition() {
        return position;
    }
    
    public void setPosition(Position position) {
        this.position = position;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
}





