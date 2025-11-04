package com.gamestack.entity;

import org.springframework.data.mongodb.core.mapping.Field;

public class TargetState {
    
    @Field("playerPosition")
    private Position playerPosition;
    
    @Field("gemsCollected")
    private Integer gemsCollected = 0;
    
    @Field("maxMoves")
    private Integer maxMoves = 100;
    
    // Constructors
    public TargetState() {
        this.playerPosition = new Position();
    }
    
    // Getters and Setters
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





