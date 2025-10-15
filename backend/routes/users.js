const express = require('express');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const auth = require('../middleware/auth');

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

