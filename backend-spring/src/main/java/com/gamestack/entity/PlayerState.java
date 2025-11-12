package com.gamestack.entity;

public class PlayerState {
    private Position position;
    private Integer gemsCollected;
    
    // Constructors
    public PlayerState() {}
    
    public PlayerState(Position position, Integer gemsCollected) {
        this.position = position;
        this.gemsCollected = gemsCollected;
    }
    
    // Getters and Setters
    public Position getPosition() {
        return position;
    }
    
    public void setPosition(Position position) {
        this.position = position;
    }
    
    public Integer getGemsCollected() {
        return gemsCollected;
    }
    
    public void setGemsCollected(Integer gemsCollected) {
        this.gemsCollected = gemsCollected;
    }
}









