package com.gamestack.service;

import com.gamestack.entity.Lesson;
import com.gamestack.entity.User;
import com.gamestack.repository.LessonRepository;
import com.gamestack.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service to synchronize data from MongoDB (main database) to Spring Boot
 * This ensures Spring Boot has access to the same data for web interaction
 */
@Service
public class DataSyncService {

    private static final Logger logger = LoggerFactory.getLogger(DataSyncService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    /**
     * Sync all users from MongoDB
     * This method reads all users from the main MongoDB database
     */
    @Transactional
    public void syncUsers() {
        try {
            List<User> users = userRepository.findAll();
            logger.info("Synced {} users from MongoDB", users.size());
        } catch (Exception e) {
            logger.error("Error syncing users: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to sync users", e);
        }
    }

    /**
     * Sync all lessons from MongoDB
     * This method reads all lessons from the main MongoDB database
     */
    @Transactional
    public void syncLessons() {
        try {
            List<Lesson> lessons = lessonRepository.findAll();
            logger.info("Synced {} lessons from MongoDB", lessons.size());
        } catch (Exception e) {
            logger.error("Error syncing lessons: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to sync lessons", e);
        }
    }

    /**
     * Sync a specific user by ID
     */
    @Transactional
    public Optional<User> syncUserById(String userId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                logger.info("Synced user with ID: {}", userId);
            } else {
                logger.warn("User with ID {} not found in MongoDB", userId);
            }
            return user;
        } catch (Exception e) {
            logger.error("Error syncing user {}: {}", userId, e.getMessage(), e);
            return Optional.empty();
        }
    }

    /**
     * Sync a specific lesson by ID
     */
    @Transactional
    public Optional<Lesson> syncLessonById(String lessonId) {
        try {
            Optional<Lesson> lesson = lessonRepository.findById(lessonId);
            if (lesson.isPresent()) {
                logger.info("Synced lesson with ID: {}", lessonId);
            } else {
                logger.warn("Lesson with ID {} not found in MongoDB", lessonId);
            }
            return lesson;
        } catch (Exception e) {
            logger.error("Error syncing lesson {}: {}", lessonId, e.getMessage(), e);
            return Optional.empty();
        }
    }

    /**
     * Sync all data (users and lessons)
     */
    @Transactional
    public void syncAll() {
        logger.info("Starting full data synchronization from MongoDB...");
        syncUsers();
        syncLessons();
        logger.info("Full data synchronization completed");
    }

    /**
     * Scheduled task to sync data periodically (every hour)
     * This ensures Spring Boot always has the latest data from MongoDB
     */
    @Scheduled(fixedRate = 3600000) // 1 hour in milliseconds
    public void scheduledSync() {
        logger.info("Running scheduled data synchronization...");
        try {
            syncAll();
        } catch (Exception e) {
            logger.error("Error in scheduled sync: {}", e.getMessage(), e);
        }
    }

    /**
     * Get statistics about synced data
     */
    public SyncStatistics getSyncStatistics() {
        SyncStatistics stats = new SyncStatistics();
        stats.setUserCount(userRepository.count());
        stats.setLessonCount(lessonRepository.count());
        stats.setPublishedLessonCount(lessonRepository.countPublishedLessons());
        return stats;
    }

    /**
     * Inner class for sync statistics
     */
    public static class SyncStatistics {
        private long userCount;
        private long lessonCount;
        private long publishedLessonCount;

        public long getUserCount() {
            return userCount;
        }

        public void setUserCount(long userCount) {
            this.userCount = userCount;
        }

        public long getLessonCount() {
            return lessonCount;
        }

        public void setLessonCount(long lessonCount) {
            this.lessonCount = lessonCount;
        }

        public long getPublishedLessonCount() {
            return publishedLessonCount;
        }

        public void setPublishedLessonCount(long publishedLessonCount) {
            this.publishedLessonCount = publishedLessonCount;
        }
    }
}
