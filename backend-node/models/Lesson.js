const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Lesson description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  instructions: {
    type: String,
    required: [true, 'Lesson instructions are required'],
    trim: true
  },
  hints: [{
    type: String,
    trim: true
  }],
  level: {
    type: Number,
    required: [true, 'Level is required'],
    min: [1, 'Level must be at least 1'],
    max: [50, 'Level cannot exceed 50']
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: [1, 'Order must be at least 1']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  concepts: [{
    type: String,
    enum: ['variables', 'loops', 'conditionals', 'functions', 'arrays', 'objects', 'classes', 'movement', 'direction', 'code_organization', 'logic']
  }],
  startingCode: {
    type: String,
    default: '# Write your code here\n# Available functions: move(), turnLeft(), turnRight(), pickGem()\n\n'
  },
  worldState: {
    player: {
      position: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        z: { type: Number, default: 0 }
      },
      rotation: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        z: { type: Number, default: 0 }
      }
    },
    gems: [{
      position: {
        x: { type: Number, required: true },
        y: { type: Number, default: 0.5 },
        z: { type: Number, required: true }
      },
      collected: { type: Boolean, default: false }
    }],
    obstacles: [{
      position: {
        x: { type: Number, required: true },
        y: { type: Number, default: 0.5 },
        z: { type: Number, required: true }
      },
      type: {
        type: String,
        enum: ['wall', 'pit', 'spike'],
        default: 'wall'
      }
    }]
  },
  targetState: {
    playerPosition: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 }
    },
    gemsCollected: { type: Number, default: 0 },
    maxMoves: { type: Number, default: 100 }
  },
  successMessage: {
    type: String,
    default: 'Congratulations! You completed the lesson!'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
lessonSchema.index({ level: 1, order: 1 });
lessonSchema.index({ isPublished: 1, level: 1 });

// Virtual for total gems in world
lessonSchema.virtual('totalGems').get(function() {
  return this.worldState.gems.length;
});

// Method to check if lesson is completed
lessonSchema.methods.checkCompletion = function(playerState) {
  const target = this.targetState;
  const player = playerState;
  
  // Check position
  const positionMatch = 
    Math.abs(player.position.x - target.playerPosition.x) < 0.1 &&
    Math.abs(player.position.z - target.playerPosition.z) < 0.1;
  
  // Check gems collected
  const gemsMatch = player.gemsCollected >= target.gemsCollected;
  
  return positionMatch && gemsMatch;
};

module.exports = mongoose.model('Lesson', lessonSchema);
