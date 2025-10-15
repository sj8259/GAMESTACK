import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, CheckCircle, Star, Target } from 'lucide-react'
import api from '../utils/api'
import useAuthStore from '../store/authStore'

const LevelSelectPage = () => {
  const [lessons, setLessons] = useState([])
  const [userProgress, setUserProgress] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  
  const { user } = useAuthStore()

  useEffect(() => {
    loadLessons()
    loadUserProgress()
  }, [])

  const loadLessons = async () => {
    try {
      const response = await api.get('/lessons')
      setLessons(response.data.lessons)
    } catch (error) {
      console.error('Failed to load lessons:', error)
    }
  }

  const loadUserProgress = async () => {
    try {
      const response = await api.get('/users/progress')
      const progressMap = {}
      response.data.lessons.forEach(lesson => {
        if (lesson.progress.completed) {
          progressMap[lesson._id] = lesson.progress
        }
      })
      setUserProgress(progressMap)
    } catch (error) {
      console.error('Failed to load user progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-900/30'
      case 'intermediate': return 'text-yellow-400 bg-yellow-900/30'
      case 'advanced': return 'text-red-400 bg-red-900/30'
      default: return 'text-slate-400 bg-slate-900/30'
    }
  }

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '🟢'
      case 'intermediate': return '🟡'
      case 'advanced': return '🔴'
      default: return '⚪'
    }
  }

  const isLessonUnlocked = (lesson) => {
    // First lesson is always unlocked
    if (lesson.level === 1) return true
    
    if (lesson.level > 1) {
      // Need to complete at least one lesson from previous level
      const previousLevelLessons = lessons.filter(l => l.level === lesson.level - 1)
      return previousLevelLessons.some(l => userProgress[l._id])
    }
    
    return true
  }

  const getLessonStats = (lesson) => {
    const progress = userProgress[lesson._id]
    if (!progress) return null
    
    return {
      completed: true,
      score: progress.score,
      completedAt: progress.completedAt
    }
  }

  const filteredLessons = lessons.filter(lesson => {
    if (selectedDifficulty !== 'all' && lesson.difficulty !== selectedDifficulty) return false
    if (selectedLevel !== 'all' && lesson.level.toString() !== selectedLevel) return false
    return true
  })

  const levels = [...new Set(lessons.map(l => l.level))].sort((a, b) => a - b)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading levels...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Choose Your Adventure
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Master programming concepts through interactive 3D puzzles. 
            Complete lessons to unlock new challenges and advance your coding skills.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">
              {Object.keys(userProgress).length}
            </div>
            <div className="text-slate-400">Lessons Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">
              {levels.length}
            </div>
            <div className="text-slate-400">Total Levels</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">
              {user?.achievements?.length || 0}
            </div>
            <div className="text-slate-400">Achievements</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              {user?.progress?.totalScore || 0}
            </div>
            <div className="text-slate-400">Total Score</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level.toString()}>Level {level}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLessons.map((lesson) => {
            const isUnlocked = isLessonUnlocked(lesson)
            const stats = getLessonStats(lesson)
            
            return (
              <div
                key={lesson._id}
                className={`relative card-hover group ${
                  !isUnlocked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {/* Completion Badge */}
                {stats?.completed && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-slate-900/80 rounded-xl flex items-center justify-center z-10">
                    <Lock className="w-8 h-8 text-slate-400" />
                  </div>
                )}

                {/* Lesson Content */}
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-400">Level {lesson.level}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                          {getDifficultyIcon(lesson.difficulty)} {lesson.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Concepts */}
                  {lesson.concepts && lesson.concepts.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {lesson.concepts.slice(0, 3).map((concept, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded"
                          >
                            {concept}
                          </span>
                        ))}
                        {lesson.concepts.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-slate-700 text-slate-400 rounded">
                            +{lesson.concepts.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  {stats?.completed && (
                    <div className="mb-4 p-3 bg-green-900/20 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-green-400 font-medium">Score: {stats.score}</span>
                        </div>
                        <div className="text-slate-400">
                          {new Date(stats.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    {isUnlocked ? (
                      <Link
                        to={`/game/${lesson._id}`}
                        className="flex-1 btn-primary text-center group-hover:scale-105 transition-transform"
                      >
                        {stats?.completed ? 'Replay' : 'Start'}
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-slate-700 text-slate-400 px-4 py-2 rounded-lg cursor-not-allowed"
                      >
                        Locked
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No lessons found</h3>
            <p className="text-slate-400">Try adjusting your filters to see more lessons.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LevelSelectPage

