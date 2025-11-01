package com.gamestack.config;

import com.gamestack.entity.*;
import com.gamestack.repository.UserRepository;
import com.gamestack.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private LessonRepository lessonRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("🌱 Seeding database with sample data...");
            // Wait a bit for Hibernate to create tables
            Thread.sleep(1000);
            seedUsers();
            
            // Wait a bit more for lessons table
            Thread.sleep(500);
            seedLessons();
            
            System.out.println("✅ Database seeded successfully!");
        } else {
            System.out.println("📊 Database already contains data, skipping seeding");
        }
    }
    
    private void seedUsers() {
        try {
            // Create demo admin user
            User demoUser = new User();
            demoUser.setUsername("demo");
            demoUser.setEmail("demo@gamestack.dev");
            demoUser.setPassword(passwordEncoder.encode("demo123"));
            demoUser.setIsAdmin(true);
            demoUser.setAvatar("admin");
            userRepository.save(demoUser);
            
            // Create test users with different progress levels
            List<User> testUsers = Arrays.asList(
                createUserWithProgress("alice", "alice@example.com", "password123", 0, 0, "player1"),
                createUserWithProgress("bob", "bob@example.com", "password123", 1, 100, "player2"),
                createUserWithProgress("charlie", "charlie@example.com", "password123", 3, 250, "player3"),
                createUserWithProgress("diana", "diana@example.com", "password123", 5, 450, "player4"),
                createUserWithProgress("eve", "eve@example.com", "password123", 2, 180, "player5"),
                createUserWithProgress("frank", "frank@example.com", "password123", 4, 320, "player6"),
                createUserWithProgress("grace", "grace@example.com", "password123", 6, 580, "player7"),
                createUserWithProgress("henry", "henry@example.com", "password123", 3, 220, "player8"),
                createUserWithProgress("iris", "iris@example.com", "password123", 7, 650, "player9"),
                createUserWithProgress("jack", "jack@example.com", "password123", 1, 90, "player10")
            );
            
            for (User user : testUsers) {
                userRepository.save(user);
            }
            
            System.out.println("✅ Users seeded successfully with progress data");
        } catch (Exception e) {
            System.err.println("❌ Error seeding users: " + e.getMessage());
        }
    }
    
    private User createUserWithProgress(String username, String email, String password, int completedLessons, int totalScore, String avatar) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setAvatar(avatar);
        
        // Create progress with some completed lessons
        UserProgress progress = new UserProgress();
        progress.setCurrentLevel(completedLessons / 3 + 1); // Level based on completed lessons
        progress.setTotalScore(totalScore);
        user.setProgress(progress);
        
        // Add some achievements based on progress
        if (completedLessons > 0) {
            user.getAchievements().add(Achievement.FIRST_LESSON);
        }
        if (totalScore >= 100) {
            user.getAchievements().add(Achievement.PERFECT_SCORE);
        }
        if (completedLessons >= 5) {
            user.getAchievements().add(Achievement.PERSISTENT);
        }
        if (completedLessons >= 10) {
            user.getAchievements().add(Achievement.EXPLORER);
        }
        
        return user;
    }
    
    private void seedLessons() {
        try {
            User demoUser = userRepository.findByUsername("demo").orElseThrow();
            
            // Create comprehensive lessons with different difficulties
            List<Lesson> lessons = Arrays.asList(
                createSimpleLesson("Welcome to GameStack", 
                    "Learn the basics of programming with our interactive 3D world", 
                    "Use the move() function to collect the gem!", 
                    1, 1, Difficulty.BEGINNER, demoUser),
                
                createSimpleLesson("Turn Left", 
                    "Learn to change direction in the game world", 
                    "Use turnLeft() to face the gem and then move() to collect it!", 
                    1, 2, Difficulty.BEGINNER, demoUser),
                
                createSimpleLesson("Turn Right", 
                    "Master both turning directions", 
                    "Use turnRight() to navigate around obstacles!", 
                    1, 3, Difficulty.BEGINNER, demoUser),
                
                createSimpleLesson("Multiple Gems", 
                    "Collect multiple gems in sequence", 
                    "Collect all the gems in the world!", 
                    2, 1, Difficulty.BEGINNER, demoUser),
                
                createSimpleLesson("Avoid Obstacles", 
                    "Learn to navigate around walls and obstacles", 
                    "Find a path around the walls to reach the gem!", 
                    2, 2, Difficulty.INTERMEDIATE, demoUser),
                
                createSimpleLesson("Loop Basics", 
                    "Learn to use loops for repetitive tasks", 
                    "Use a for loop to collect all gems efficiently!", 
                    2, 3, Difficulty.INTERMEDIATE, demoUser),
                
                createSimpleLesson("Conditional Logic", 
                    "Make decisions based on your environment", 
                    "Use if statements to check for obstacles!", 
                    3, 1, Difficulty.INTERMEDIATE, demoUser),
                
                createSimpleLesson("Function Creation", 
                    "Create your own functions to organize code", 
                    "Define a function to move forward multiple times!", 
                    3, 2, Difficulty.ADVANCED, demoUser),
                
                createSimpleLesson("Complex Navigation", 
                    "Navigate through a complex maze", 
                    "Find the optimal path through multiple obstacles!", 
                    3, 3, Difficulty.ADVANCED, demoUser),
                
                createSimpleLesson("Algorithm Optimization", 
                    "Optimize your code for efficiency", 
                    "Find the shortest path to collect all gems!", 
                    4, 1, Difficulty.ADVANCED, demoUser)
            );
            
            for (Lesson lesson : lessons) {
                lesson.setIsPublished(true);
                lessonRepository.save(lesson);
            }
            
            System.out.println("✅ Lessons seeded successfully");
        } catch (Exception e) {
            System.err.println("❌ Error seeding lessons: " + e.getMessage());
        }
    }
    
    private Lesson createSimpleLesson(String title, String description, String instructions, 
                                     Integer level, Integer order, Difficulty difficulty, User createdBy) {
        Lesson lesson = new Lesson();
        lesson.setTitle(title);
        lesson.setDescription(description);
        lesson.setInstructions(instructions);
        lesson.setLevel(level);
        lesson.setOrder(order);
        lesson.setDifficulty(difficulty);
        lesson.setCreatedBy(createdBy);
        lesson.setConcepts(Arrays.asList(Concept.MOVEMENT));
        lesson.setHints(Arrays.asList("Try using the available functions", "Think about the sequence of moves"));
        lesson.setStartingCode("# Write your code here\n# Available functions: move(), turnLeft(), turnRight(), pickGem()\n\n");
        lesson.setSuccessMessage("Congratulations! You completed the lesson!");
        lesson.setIsPublished(true);
        
        // Create WorldState with player and gems
        WorldState worldState = new WorldState();
        Player player = new Player();
        player.setPosition(new Position(0.0, 0.0, 0.0));
        player.setRotation(new Rotation(0.0, 0.0, 0.0));
        worldState.setPlayer(player);
        
        // Add gems based on level
        List<Gem> gems = new ArrayList<>();
        if (level == 1 && order == 1) {
            gems.add(createGemForWorldState(2.0, 0.5, 0.0, worldState));
        } else if (level == 1 && order == 2) {
            gems.add(createGemForWorldState(2.0, 0.5, 0.0, worldState));
            gems.add(createGemForWorldState(2.0, 0.5, 2.0, worldState));
            worldState.getObstacles().add(createObstacleForWorldState(1.0, 0.5, 1.0, ObstacleType.WALL, worldState));
        } else if (level == 1 && order == 3) {
            gems.add(createGemForWorldState(1.0, 0.5, 0.0, worldState));
            gems.add(createGemForWorldState(2.0, 0.5, 0.0, worldState));
            gems.add(createGemForWorldState(3.0, 0.5, 0.0, worldState));
        } else if (level == 2 && order == 1) {
            gems.add(createGemForWorldState(2.0, 0.5, 0.0, worldState));
            gems.add(createGemForWorldState(0.0, 0.5, 2.0, worldState));
            worldState.getObstacles().add(createObstacleForWorldState(1.0, 0.5, 0.0, ObstacleType.WALL, worldState));
        } else if (level == 2 && order == 2) {
            gems.add(createGemForWorldState(2.0, 0.5, 0.0, worldState));
            gems.add(createGemForWorldState(2.0, 0.5, 2.0, worldState));
            gems.add(createGemForWorldState(0.0, 0.5, 2.0, worldState));
            gems.add(createGemForWorldState(0.0, 0.5, 0.0, worldState));
        } else {
            gems.add(createGemForWorldState(2.0, 0.5, 0.0, worldState));
        }
        worldState.setGems(gems);
        lesson.setWorldState(worldState);
        
        // Create TargetState
        TargetState targetState = new TargetState();
        if (level == 1 && order == 1) {
            targetState.setPlayerPosition(new Position(2.0, 0.0, 0.0));
            targetState.setGemsCollected(1);
        } else if (level == 1 && order == 2) {
            targetState.setPlayerPosition(new Position(2.0, 0.0, 2.0));
            targetState.setGemsCollected(2);
        } else if (level == 1 && order == 3) {
            targetState.setPlayerPosition(new Position(3.0, 0.0, 0.0));
            targetState.setGemsCollected(3);
        } else if (level == 2 && order == 1) {
            targetState.setPlayerPosition(new Position(0.0, 0.0, 2.0));
            targetState.setGemsCollected(2);
        } else if (level == 2 && order == 2) {
            targetState.setPlayerPosition(new Position(0.0, 0.0, 0.0));
            targetState.setGemsCollected(4);
        } else {
            targetState.setPlayerPosition(new Position(2.0, 0.0, 0.0));
            targetState.setGemsCollected(gems.size());
        }
        targetState.setMaxMoves(20);
        lesson.setTargetState(targetState);
        
        return lesson;
    }
    
    private Gem createGem(Double x, Double y, Double z) {
        Gem gem = new Gem();
        gem.setPosition(new Position(x, y, z));
        gem.setCollected(false);
        return gem;
    }
    
    private Obstacle createObstacle(Double x, Double y, Double z, ObstacleType type) {
        Obstacle obstacle = new Obstacle();
        obstacle.setPosition(new Position(x, y, z));
        obstacle.setType(type);
        return obstacle;
    }
    
    private Gem createGemForWorldState(Double x, Double y, Double z, WorldState worldState) {
        Gem gem = createGem(x, y, z);
        gem.setWorldState(worldState);
        return gem;
    }
    
    private Obstacle createObstacleForWorldState(Double x, Double y, Double z, ObstacleType type, WorldState worldState) {
        Obstacle obstacle = createObstacle(x, y, z, type);
        obstacle.setWorldState(worldState);
        return obstacle;
    }
    
}
