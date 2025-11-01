const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const User = require('../models/User')
const Lesson = require('../models/Lesson')
const sampleLessons = require('../data/sampleLessons')

// Load environment variables
dotenv.config({ path: './config.env' })

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gamestack')
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Lesson.deleteMany({})
    console.log('🧹 Cleared existing data')

    // Create demo user
    const demoUser = new User({
      username: 'demo',
      email: 'demo@gamestack.dev',
      password: 'demo123',
      isAdmin: true
    })
    await demoUser.save()
    console.log('👤 Created demo user')

    // Create sample lessons
    const lessons = sampleLessons.map(lessonData => ({
      ...lessonData,
      createdBy: demoUser._id
    }))

    await Lesson.insertMany(lessons)
    console.log(`📚 Created ${lessons.length} sample lessons`)

    // Create a few more users for testing
    const testUsers = [
      {
        username: 'alice',
        email: 'alice@example.com',
        password: 'password123'
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        password: 'password123'
      },
      {
        username: 'charlie',
        email: 'charlie@example.com',
        password: 'password123'
      }
    ]

    const createdUsers = []
    for (const userData of testUsers) {
      const user = new User(userData)
      await user.save()
      createdUsers.push(user)
    }
    console.log(`👥 Created ${testUsers.length} test users`)

    // Give some users progress on lessons
    const firstLesson = await Lesson.findOne({ level: 1, order: 1 })
    const secondLesson = await Lesson.findOne({ level: 1, order: 2 })

    // Alice completes first lesson
    createdUsers[0].progress.completedLessons.push({
      lessonId: firstLesson._id,
      score: 100,
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    })
    createdUsers[0].progress.totalScore = 100
    createdUsers[0].achievements.push('first_lesson')
    await createdUsers[0].save()

    // Bob completes first two lessons
    createdUsers[1].progress.completedLessons.push({
      lessonId: firstLesson._id,
      score: 100,
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    })
    createdUsers[1].progress.completedLessons.push({
      lessonId: secondLesson._id,
      score: 85,
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    })
    createdUsers[1].progress.totalScore = 185
    createdUsers[1].achievements.push('first_lesson', 'perfect_score')
    await createdUsers[1].save()

    // Charlie completes all beginner lessons
    const beginnerLessons = await Lesson.find({ difficulty: 'beginner' })
    for (const lesson of beginnerLessons) {
      createdUsers[2].progress.completedLessons.push({
        lessonId: lesson._id,
        score: Math.floor(Math.random() * 20) + 80, // Random score 80-100
        completedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within last week
      })
    }
    createdUsers[2].progress.totalScore = createdUsers[2].progress.completedLessons.reduce((sum, completed) => sum + completed.score, 0)
    createdUsers[2].achievements.push('first_lesson', 'perfect_score', 'persistent')
    await createdUsers[2].save()

    console.log('🎯 Added sample progress data')

    console.log('\n🎉 Database seeded successfully!')
    console.log('\nDemo account created (credentials hidden in logs for security).')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    await mongoose.connection.close()
    console.log('📪 Database connection closed')
  }
}

// Run the seed function
seedDatabase()

