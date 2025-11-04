package com.gamestack.entity;

import org.springframework.data.mongodb.core.mapping.Field;

public class Rotation {
    
    @Field("x")
    private Double x = 0.0;
    
    @Field("y")
    private Double y = 0.0;
    
    @Field("z")
    private Double z = 0.0;
    
    // Constructors
    public Rotation() {}
    
    public Rotation(Double x, Double y, Double z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    // Getters and Setters
    public Double getX() {
        return x;
    }
    
    public void setX(Double x) {
        this.x = x;
    }
    
    public Double getY() {
        return y;
    }
    
    public void setY(Double y) {
        this.y = y;
    }
    
    public Double getZ() {
        return z;
    }
    
    public void setZ(Double z) {
        this.z = z;
    }
}





