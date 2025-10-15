import { useEffect, useState } from 'react'
import { User, Trophy, Target, Star, Calendar, Award, Gamepad2 } from 'lucide-react'
import useAuthStore from '../store/authStore'
import api from '../utils/api'

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    try {
      const response = await api.get('/users/profile')
      setProfileData(response.data.user)
    } catch (error) {
      console.error('Failed to load profile data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getAchievementIcon = (achievement) => {
    switch (achievement) {
      case 'first_lesson': return '🎯'
      case 'perfect_score': return '⭐'
      case 'speed_demon': return '⚡'
      case 'persistent': return '🔥'
      case 'explorer': return '🗺️'
      default: return '🏆'
    }
  }

  const getAchievementName = (achievement) => {
    switch (achievement) {
      case 'first_lesson': return 'First Steps'
      case 'perfect_score': return 'Perfectionist'
      case 'speed_demon': return 'Speed Demon'
      case 'persistent': return 'Persistent'
      case 'explorer': return 'Explorer'
      default: return 'Achievement'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400">Failed to load profile data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            {profileData.username}
          </h1>
          <p className="text-slate-400">
            Level {profileData.stats.currentLevel} • {profileData.stats.completionRate}% Complete
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {profileData.stats.totalLessonsCompleted}
            </div>
            <div className="text-slate-400 text-sm">Lessons Completed</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {profileData.stats.totalScore}
            </div>
            <div className="text-slate-400 text-sm">Total Score</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {profileData.achievements.length}
            </div>
            <div className="text-slate-400 text-sm">Achievements</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {profileData.stats.completionRate}%
            </div>
            <div className="text-slate-400 text-sm">Completion Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Progress */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Gamepad2 className="w-5 h-5 mr-2 text-blue-400" />
              Recent Progress
            </h3>
            
            {profileData.progress.completedLessons.length > 0 ? (
              <div className="space-y-3">
                {profileData.progress.completedLessons
                  .slice(-5)
                  .reverse()
                  .map((completed, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">
                          {completed.lessonId?.title || 'Lesson'}
                        </div>
                        <div className="text-sm text-slate-400">
                          Level {completed.lessonId?.level || '?'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-medium">
                          {completed.score} pts
                        </div>
                        <div className="text-xs text-slate-400">
                          {new Date(completed.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-400">No completed lessons yet</p>
                <p className="text-sm text-slate-500 mt-1">Start your coding journey!</p>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Achievements
            </h3>
            
            {profileData.achievements.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl">
                      {getAchievementIcon(achievement)}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">
                        {getAchievementName(achievement)}
                      </div>
                      <div className="text-xs text-slate-400 capitalize">
                        {achievement.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-400">No achievements yet</p>
                <p className="text-sm text-slate-500 mt-1">Complete lessons to unlock achievements!</p>
              </div>
            )}
          </div>
        </div>

        {/* Level Progress */}
        <div className="card mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Level Progress</h3>
          
          {Object.keys(profileData.stats.levelStats).length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(profileData.stats.levelStats)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([level, count]) => (
                  <div key={level} className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {count}
                    </div>
                    <div className="text-sm text-slate-400">
                      Level {level}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-slate-400">No level progress yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

