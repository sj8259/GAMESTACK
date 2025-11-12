package com.gamestack.entity;

public enum ObstacleType {
    WALL("wall"),
    PIT("pit"),
    SPIKE("spike");
    
    private final String value;
    
    ObstacleType(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return value;
    }
    
    @Override
    public String toString() {
        return value;
    }
}









