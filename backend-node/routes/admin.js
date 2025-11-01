const express = require('express');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/data
// @desc    Get all collected data (Admin only)
// @access  Private (Admin)
router.get('/data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    // Get all users
    const users = await User.find()
      .select('-password')
      .populate({
        path: 'progress.completedLessons.lessonId',
        select: 'title level difficulty'
      })
      .sort({ 'progress.totalScore': -1 });

    // Get all lessons
    const lessons = await Lesson.find()
      .populate('createdBy', 'username')
      .sort({ level: 1, order: 1 });

    // Calculate statistics
    const stats = {
      totalUsers: await User.countDocuments(),
      totalLessons: await Lesson.countDocuments(),
      publishedLessons: await Lesson.countDocuments({ isPublished: true }),
      totalCompletions: 0,
      averageScore: 0,
      activeUsers: await User.countDocuments({ 'progress.completedLessons.0': { $exists: true } }),
      achievements: {
        first_lesson: await User.countDocuments({ achievements: 'first_lesson' }),
        perfect_score: await User.countDocuments({ achievements: 'perfect_score' }),
        speed_demon: await User.countDocuments({ achievements: 'speed_demon' }),
        persistent: await User.countDocuments({ achievements: 'persistent' }),
        explorer: await User.countDocuments({ achievements: 'explorer' })
      }
    };

    // Calculate total completions and average score
    let totalScoreSum = 0;
    users.forEach(user => {
      stats.totalCompletions += user.progress.completedLessons.length;
      totalScoreSum += user.progress.totalScore;
    });

    if (stats.totalCompletions > 0) {
      stats.averageScore = Math.round(totalScoreSum / stats.totalUsers * 100) / 100;
    }

    res.json({
      stats,
      users,
      lessons
    });
  } catch (error) {
    console.error('Admin data error:', error);
    res.status(500).json({
      message: 'Server error while fetching admin data'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users data
// @access  Private (Admin)
router.get('/users', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const users = await User.find()
      .select('-password')
      .populate({
        path: 'progress.completedLessons.lessonId',
        select: 'title level difficulty'
      })
      .sort({ 'progress.totalScore': -1 });

    res.json({ users });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({
      message: 'Server error while fetching users'
    });
  }
});

// @route   GET /api/admin/lessons
// @desc    Get all lessons data
// @access  Private (Admin)
router.get('/lessons', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const lessons = await Lesson.find()
      .populate('createdBy', 'username')
      .sort({ level: 1, order: 1 });

    res.json({ lessons });
  } catch (error) {
    console.error('Admin lessons error:', error);
    res.status(500).json({
      message: 'Server error while fetching lessons'
    });
  }
});

// @route   GET /api/admin/stats
// @desc    Get aggregated statistics
// @access  Private (Admin)
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const stats = {
      totalUsers: await User.countDocuments(),
      totalLessons: await Lesson.countDocuments(),
      publishedLessons: await Lesson.countDocuments({ isPublished: true }),
      totalCompletions: 0,
      averageScore: 0,
      activeUsers: await User.countDocuments({ 'progress.completedLessons.0': { $exists: true } }),
      achievements: {
        first_lesson: await User.countDocuments({ achievements: 'first_lesson' }),
        perfect_score: await User.countDocuments({ achievements: 'perfect_score' }),
        speed_demon: await User.countDocuments({ achievements: 'speed_demon' }),
        persistent: await User.countDocuments({ achievements: 'persistent' }),
        explorer: await User.countDocuments({ achievements: 'explorer' })
      }
    };

    const users = await User.find();
    let totalScoreSum = 0;
    users.forEach(user => {
      stats.totalCompletions += user.progress.completedLessons.length;
      totalScoreSum += user.progress.totalScore;
    });

    if (stats.totalCompletions > 0) {
      stats.averageScore = Math.round(totalScoreSum / stats.totalUsers * 100) / 100;
    }

    res.json({ stats });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      message: 'Server error while fetching statistics'
    });
  }
});

module.exports = router;

