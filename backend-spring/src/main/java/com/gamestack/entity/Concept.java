package com.gamestack.entity;

public enum Concept {
    VARIABLES("variables"),
    LOOPS("loops"),
    CONDITIONALS("conditionals"),
    FUNCTIONS("functions"),
    ARRAYS("arrays"),
    OBJECTS("objects"),
    CLASSES("classes"),
    MOVEMENT("movement"),
    DIRECTION("direction"),
    CODE_ORGANIZATION("code_organization"),
    LOGIC("logic");
    
    private final String value;
    
    Concept(String value) {
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



