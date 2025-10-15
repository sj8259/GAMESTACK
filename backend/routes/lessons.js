const express = require('express');
const { body, validationResult } = require('express-validator');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/lessons
// @desc    Get all published lessons
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { level, difficulty, concept } = req.query;
    
    let query = { isPublished: true };
    
    if (level) query.level = parseInt(level);
    if (difficulty) query.difficulty = difficulty;
    if (concept) query.concepts = { $in: [concept] };

    const lessons = await Lesson.find(query)
      .populate('createdBy', 'username')
      .sort({ level: 1, order: 1 })
      .select('-worldState -targetState');

    res.json({
      lessons,
      count: lessons.length
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({
      message: 'Server error while fetching lessons'
    });
  }
});

// @route   GET /api/lessons/:id
// @desc    Get a specific lesson
// @access  Public (but progress requires auth)
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!lesson) {
      return res.status(404).json({
        message: 'Lesson not found'
      });
    }

    // If lesson is not published and user is not admin, don't show it
    if (!lesson.isPublished && (!req.user || !req.user.isAdmin)) {
      return res.status(404).json({
        message: 'Lesson not found'
      });
    }

    res.json({ lesson });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({
      message: 'Server error while fetching lesson'
    });
  }
});

// @route   POST /api/lessons/:id/complete
// @desc    Mark lesson as completed
// @access  Private
router.post('/:id/complete', auth, [
  body('score')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100'),
  body('moves')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Moves must be a positive integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        message: 'Lesson not found'
      });
    }

    const user = await User.findById(req.userId);
    
    // Check if already completed
    if (user.hasCompletedLesson(lesson._id)) {
      return res.status(400).json({
        message: 'Lesson already completed'
      });
    }

    const { score = 100, moves = 1 } = req.body;

    // Add to completed lessons
    user.progress.completedLessons.push({
      lessonId: lesson._id,
      score,
      completedAt: new Date()
    });

    // Update total score
    user.progress.totalScore += score;

    // Check for achievements
    const achievements = [];
    
    if (user.progress.completedLessons.length === 1) {
      achievements.push('first_lesson');
    }
    
    if (score === 100) {
      achievements.push('perfect_score');
    }
    
    if (moves <= lesson.targetState.maxMoves * 0.5) {
      achievements.push('speed_demon');
    }

    // Add new achievements
    achievements.forEach(achievement => {
      if (!user.achievements.includes(achievement)) {
        user.achievements.push(achievement);
      }
    });

    await user.save();

    res.json({
      message: 'Lesson completed successfully',
      achievement: lesson.successMessage,
      newAchievements: achievements.filter(a => !user.achievements.includes(a))
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({
      message: 'Server error while completing lesson'
    });
  }
});

// @route   GET /api/lessons/:id/progress
// @desc    Get user's progress for a specific lesson
// @access  Private
router.get('/:id/progress', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        message: 'Lesson not found'
      });
    }

    const user = await User.findById(req.userId);
    const completedLesson = user.progress.completedLessons.find(
      completed => completed.lessonId.toString() === lesson._id.toString()
    );

    res.json({
      isCompleted: !!completedLesson,
      completedAt: completedLesson?.completedAt,
      score: completedLesson?.score,
      attempts: completedLesson?.attempts || 0
    });
  } catch (error) {
    console.error('Get lesson progress error:', error);
    res.status(500).json({
      message: 'Server error while fetching lesson progress'
    });
  }
});

// @route   POST /api/lessons
// @desc    Create a new lesson (Admin only)
// @access  Private (Admin)
router.post('/', [
  auth,
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('instructions')
    .notEmpty()
    .withMessage('Instructions are required'),
  body('level')
    .isInt({ min: 1, max: 50 })
    .withMessage('Level must be between 1 and 50'),
  body('order')
    .isInt({ min: 1 })
    .withMessage('Order must be at least 1'),
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Difficulty must be beginner, intermediate, or advanced')
], async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const lessonData = {
      ...req.body,
      createdBy: req.userId
    };

    const lesson = new Lesson(lessonData);
    await lesson.save();

    res.status(201).json({
      message: 'Lesson created successfully',
      lesson
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({
      message: 'Server error while creating lesson'
    });
  }
});

// @route   PUT /api/lessons/:id
// @desc    Update a lesson (Admin only)
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!lesson) {
      return res.status(404).json({
        message: 'Lesson not found'
      });
    }

    res.json({
      message: 'Lesson updated successfully',
      lesson
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({
      message: 'Server error while updating lesson'
    });
  }
});

// @route   DELETE /api/lessons/:id
// @desc    Delete a lesson (Admin only)
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        message: 'Lesson not found'
      });
    }

    res.json({
      message: 'Lesson deleted successfully'
    });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({
      message: 'Server error while deleting lesson'
    });
  }
});

module.exports = router;

