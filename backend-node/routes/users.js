const express = require('express');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile with detailed progress
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: 'progress.completedLessons.lessonId',
        select: 'title level difficulty concepts'
      })
      .select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Calculate additional stats
    const totalLessons = await Lesson.countDocuments({ isPublished: true });
    const completionRate = totalLessons > 0 ? (user.progress.completedLessons.length / totalLessons) * 100 : 0;
    
    // Get level statistics
    const levelStats = {};
    user.progress.completedLessons.forEach(completed => {
      if (completed.lessonId) {
        const level = completed.lessonId.level;
        levelStats[level] = (levelStats[level] || 0) + 1;
      }
    });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        customAvatar: user.customAvatar,
        progress: user.progress,
        achievements: user.achievements,
        stats: {
          totalLessonsCompleted: user.progress.completedLessons.length,
          totalLessonsAvailable: totalLessons,
          completionRate: Math.round(completionRate * 100) / 100,
          currentLevel: user.getLevel(),
          totalScore: user.progress.totalScore,
          levelStats
        }
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      message: 'Server error while fetching user profile'
    });
  }
});

// @route   POST /api/users/upload-avatar
// @desc    Upload custom profile picture
// @access  Private
router.post('/upload-avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded'
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      // Delete uploaded file if user not found
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Delete old custom avatar if exists
    if (user.customAvatar) {
      const oldPath = path.join(__dirname, '../uploads/avatars', path.basename(user.customAvatar));
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Update user with new avatar
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    user.customAvatar = avatarUrl;
    user.avatar = 'custom';
    await user.save();

    res.json({
      message: 'Avatar uploaded successfully',
      avatar: 'custom',
      customAvatar: avatarUrl
    });
  } catch (error) {
    // Delete uploaded file on error
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Avatar upload error:', error);
    res.status(500).json({
      message: 'Server error during avatar upload',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   DELETE /api/users/avatar
// @desc    Delete custom avatar and revert to default
// @access  Private
router.delete('/avatar', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Delete custom avatar file if exists
    if (user.customAvatar) {
      const avatarPath = path.join(__dirname, '../uploads/avatars', path.basename(user.customAvatar));
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    // Revert to default avatar
    user.customAvatar = null;
    user.avatar = 'yoda';
    await user.save();

    res.json({
      message: 'Avatar deleted successfully',
      avatar: 'yoda',
      customAvatar: null
    });
  } catch (error) {
    console.error('Avatar delete error:', error);
    res.status(500).json({
      message: 'Server error during avatar deletion'
    });
  }
});

// @route   GET /api/users/progress
// @desc    Get user's progress across all lessons
// @access  Private
router.get('/progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    // Get all published lessons
    const lessons = await Lesson.find({ isPublished: true })
      .sort({ level: 1, order: 1 })
      .select('_id title level difficulty order');

    // Create progress map
    const progressMap = {};
    user.progress.completedLessons.forEach(completed => {
      progressMap[completed.lessonId.toString()] = {
        completed: true,
        score: completed.score,
        completedAt: completed.completedAt
      };
    });

    // Merge lessons with progress
    const lessonsWithProgress = lessons.map(lesson => ({
      ...lesson.toObject(),
      progress: progressMap[lesson._id.toString()] || { completed: false }
    }));

    res.json({
      lessons: lessonsWithProgress,
      totalCompleted: user.progress.completedLessons.length,
      totalAvailable: lessons.length
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    res.status(500).json({
      message: 'Server error while fetching user progress'
    });
  }
});

// @route   GET /api/users/achievements
// @desc    Get user's achievements
// @access  Private
router.get('/achievements', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('achievements');
    
    const achievementDescriptions = {
      first_lesson: {
        name: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🎯'
      },
      perfect_score: {
        name: 'Perfectionist',
        description: 'Achieve a perfect score on any lesson',
        icon: '⭐'
      },
      speed_demon: {
        name: 'Speed Demon',
        description: 'Complete a lesson in half the maximum moves',
        icon: '⚡'
      },
      persistent: {
        name: 'Persistent',
        description: 'Complete 10 lessons',
        icon: '🔥'
      },
      explorer: {
        name: 'Explorer',
        description: 'Complete lessons in 3 different difficulty levels',
        icon: '🗺️'
      }
    };

    const achievements = user.achievements.map(achievementType => ({
      type: achievementType,
      ...achievementDescriptions[achievementType]
    }));

    const allAchievements = Object.keys(achievementDescriptions).map(type => ({
      type,
      ...achievementDescriptions[type],
      unlocked: user.achievements.includes(type)
    }));

    res.json({
      unlocked: achievements,
      all: allAchievements,
      totalUnlocked: achievements.length,
      totalAvailable: allAchievements.length
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({
      message: 'Server error while fetching achievements'
    });
  }
});

// @route   POST /api/users/reset-progress
// @desc    Reset user's progress (for testing purposes)
// @access  Private
router.post('/reset-progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    user.progress = {
      completedLessons: [],
      currentLevel: 1,
      totalScore: 0
    };
    user.achievements = [];
    
    await user.save();

    res.json({
      message: 'Progress reset successfully'
    });
  } catch (error) {
    console.error('Reset progress error:', error);
    res.status(500).json({
      message: 'Server error while resetting progress'
    });
  }
});

module.exports = router;
