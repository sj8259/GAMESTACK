const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  progress: {
    completedLessons: [{
      lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
      },
      completedAt: {
        type: Date,
        default: Date.now
      },
      score: {
        type: Number,
        min: 0,
        max: 100
      }
    }],
    currentLevel: {
      type: Number,
      default: 1
    },
    totalScore: {
      type: Number,
      default: 0
    }
  },
  achievements: [{
    type: String,
    enum: ['first_lesson', 'perfect_score', 'speed_demon', 'persistent', 'explorer']
  }],
  avatar: {
    type: String,
    default: 'default'
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get user's level based on completed lessons
userSchema.methods.getLevel = function() {
  return Math.floor(this.progress.completedLessons.length / 5) + 1;
};

// Check if lesson is completed
userSchema.methods.hasCompletedLesson = function(lessonId) {
  return this.progress.completedLessons.some(
    lesson => lesson.lessonId.toString() === lessonId.toString()
  );
};

module.exports = mongoose.model('User', userSchema);

