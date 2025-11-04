package com.gamestack.entity;

public enum Achievement {
    FIRST_LESSON("first_lesson"),
    PERFECT_SCORE("perfect_score"),
    SPEED_DEMON("speed_demon"),
    PERSISTENT("persistent"),
    EXPLORER("explorer");
    
    private final String value;
    
    Achievement(String value) {
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






