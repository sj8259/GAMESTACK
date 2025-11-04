package com.gamestack.entity;

import org.springframework.data.mongodb.core.mapping.Field;

public class Gem {
    
    @Field("position")
    private Position position;
    
    @Field("collected")
    private Boolean collected = false;
    
    // Constructors
    public Gem() {
        this.position = new Position();
    }
    
    public Gem(Position position) {
        this.position = position;
    }
    
    // Getters and Setters
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
}





