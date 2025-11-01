package com.gamestack.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "world_states")
public class WorldState {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id")
    private Player player;
    
    @OneToMany(mappedBy = "worldState", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Gem> gems = new ArrayList<>();
    
    @OneToMany(mappedBy = "worldState", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Obstacle> obstacles = new ArrayList<>();
    
    // Constructors
    public WorldState() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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



