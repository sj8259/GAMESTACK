package com.gamestack.entity;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

public class WorldState {
    
    @Field("player")
    private Player player;
    
    @Field("gems")
    private List<Gem> gems = new ArrayList<>();
    
    @Field("obstacles")
    private List<Obstacle> obstacles = new ArrayList<>();
    
    // Constructors
    public WorldState() {}
    
    // Getters and Setters
    public Player getPlayer() {
        return player;
    }
    
    public void setPlayer(Player player) {
        this.player = player;
    }
    
    public List<Gem> getGems() {
        return gems;
    }
    
    public void setGems(List<Gem> gems) {
        this.gems = gems;
    }
    
    public List<Obstacle> getObstacles() {
        return obstacles;
    }
    
    public void setObstacles(List<Obstacle> obstacles) {
        this.obstacles = obstacles;
    }
}





