const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/leaderboard
// @desc    Get leaderboard data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { period = 'all', limit = 50 } = req.query;
    
    // Calculate date range based on period
    let dateFilter = {};
    if (period === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { 'progress.completedLessons.completedAt': { $gte: weekAgo } };
    } else if (period === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { 'progress.completedLessons.completedAt': { $gte: monthAgo } };
    }

    // Aggregate leaderboard data
    const leaderboard = await User.aggregate([
      // Match users with completed lessons in the specified period
      { $match: dateFilter },
      
      // Project necessary fields
      {
        $project: {
          username: 1,
          avatar: 1,
          achievements: 1,
          totalScore: '$progress.totalScore',
          completedLessons: {
            $size: {
              $filter: {
                input: '$progress.completedLessons',
                cond: period === 'all' ? true : {
                  $gte: ['$$this.completedAt', new Date(Date.now() - (period === 'week' ? 7 : 30) * 24 * 60 * 60 * 1000)]
                }
              }
            }
          },
          lastActive: { $max: '$progress.completedLessons.completedAt' }
        }
      },
      
      // Sort by score (descending), then by completed lessons (descending)
      { $sort: { totalScore: -1, completedLessons: -1, lastActive: -1 } },
      
      // Limit results
      { $limit: parseInt(limit) }
    ]);

    // Add rank to each user
    const leaderboardWithRank = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    res.json({
      leaderboard: leaderboardWithRank,
      period,
      totalUsers: leaderboardWithRank.length
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      message: 'Server error while fetching leaderboard'
    });
  }
});

// @route   GET /api/leaderboard/user/:userId
// @desc    Get specific user's leaderboard position
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { period = 'all' } = req.query;

    // Calculate date range based on period
    let dateFilter = {};
    if (period === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { 'progress.completedLessons.completedAt': { $gte: weekAgo } };
    } else if (period === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { 'progress.completedLessons.completedAt': { $gte: monthAgo } };
    }

    // Get user's data
    const user = await User.findById(userId)
      .select('username avatar progress achievements');

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Calculate user's stats for the period
    const completedLessons = period === 'all' 
      ? user.progress.completedLessons 
      : user.progress.completedLessons.filter(lesson => 
          new Date(lesson.completedAt) >= new Date(Date.now() - (period === 'week' ? 7 : 30) * 24 * 60 * 60 * 1000)
        );

    const userStats = {
      username: user.username,
      avatar: user.avatar,
      totalScore: user.progress.totalScore,
      completedLessons: completedLessons.length,
      achievements: user.achievements.length,
      lastActive: user.progress.completedLessons.length > 0 
        ? Math.max(...user.progress.completedLessons.map(l => new Date(l.completedAt)))
        : null
    };

    // Find user's rank
    const usersWithHigherScore = await User.countDocuments({
      _id: { $ne: userId },
      'progress.totalScore': { $gt: user.progress.totalScore },
      ...dateFilter
    });

    const rank = usersWithHigherScore + 1;

    res.json({
      user: {
        ...userStats,
        rank
      },
      period
    });
  } catch (error) {
    console.error('Get user leaderboard position error:', error);
    res.status(500).json({
      message: 'Server error while fetching user leaderboard position'
    });
  }
});

// @route   GET /api/leaderboard/my-position
// @desc    Get current user's leaderboard position
// @access  Private
router.get('/my-position', auth, async (req, res) => {
  try {
    const { period = 'all' } = req.query;

    // Calculate date range based on period
    let dateFilter = {};
    if (period === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { 'progress.completedLessons.completedAt': { $gte: weekAgo } };
    } else if (period === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { 'progress.completedLessons.completedAt': { $gte: monthAgo } };
    }

    // Get user's data
    const user = await User.findById(req.userId)
      .select('username avatar progress achievements');

    // Calculate user's stats for the period
    const completedLessons = period === 'all' 
      ? user.progress.completedLessons 
      : user.progress.completedLessons.filter(lesson => 
          new Date(lesson.completedAt) >= new Date(Date.now() - (period === 'week' ? 7 : 30) * 24 * 60 * 60 * 1000)
        );

    const userStats = {
      username: user.username,
      avatar: user.avatar,
      totalScore: user.progress.totalScore,
      completedLessons: completedLessons.length,
      achievements: user.achievements.length,
      lastActive: user.progress.completedLessons.length > 0 
        ? Math.max(...user.progress.completedLessons.map(l => new Date(l.completedAt)))
        : null
    };

    // Find user's rank
    const usersWithHigherScore = await User.countDocuments({
      _id: { $ne: req.userId },
      'progress.totalScore': { $gt: user.progress.totalScore },
      ...dateFilter
    });

    const rank = usersWithHigherScore + 1;

    res.json({
      user: {
        ...userStats,
        rank
      },
      period
    });
  } catch (error) {
    console.error('Get my leaderboard position error:', error);
    res.status(500).json({
      message: 'Server error while fetching leaderboard position'
    });
  }
});

module.exports = router;

