import { useEffect, useState } from 'react'
import { User, Trophy, Target, Star, Calendar, Award, Gamepad2, Edit2, Upload, X } from 'lucide-react'
import useAuthStore from '../store/authStore'
import api from '../utils/api'
import AvatarSelector from '../components/avatar/AvatarSelector'
import AvatarUpload from '../components/avatar/AvatarUpload'
import { getAvatarEmoji, getAvatarName, getAvatarImage, hasAvatarImage } from '../data/starWarsAvatars'

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)
  const [showAvatarUpload, setShowAvatarUpload] = useState(false)
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false)

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

  const handleAvatarSelect = async (avatarId) => {
    setIsUpdatingAvatar(true)
    try {
      const response = await api.put('/auth/profile', { avatar: avatarId })
      if (response.data.user) {
        setProfileData(prev => ({ 
          ...prev, 
          avatar: avatarId,
          customAvatar: response.data.user.customAvatar || null
        }))
        // Update auth store
        useAuthStore.getState().updateUser({ 
          avatar: avatarId,
          customAvatar: response.data.user.customAvatar || null
        })
      }
    } catch (error) {
      console.error('Failed to update avatar:', error)
    } finally {
      setIsUpdatingAvatar(false)
    }
  }

  const handleAvatarUploadSuccess = async (uploadData) => {
    // Reload profile data to get updated avatar
    await loadProfileData()
    setShowAvatarUpload(false)
    // Update auth store
    useAuthStore.getState().updateUser({
      avatar: 'custom',
      customAvatar: uploadData.customAvatar
    })
  }

  const handleDeleteCustomAvatar = async () => {
    try {
      await api.delete('/api/users/avatar')
      await loadProfileData()
      useAuthStore.getState().updateUser({
        avatar: 'yoda',
        customAvatar: null
      })
    } catch (error) {
      console.error('Failed to delete avatar:', error)
    }
  }

  const getAvatarDisplay = () => {
    if (profileData.avatar === 'custom' && profileData.customAvatar) {
      return profileData.customAvatar
    }
    const avatarId = profileData.avatar || 'yoda'
    if (hasAvatarImage(avatarId)) {
      return getAvatarImage(avatarId)
    }
    return null
  }

  const getAvatarFallback = () => {
    if (profileData.avatar === 'custom' && profileData.customAvatar) {
      return null // Custom avatar has no emoji fallback
    }
    return getAvatarEmoji(profileData.avatar || 'yoda')
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
    <div className="min-h-screen bg-black py-8 relative">
      {/* Star Wars Background Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.15) 0%, transparent 70%)`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-900/30 to-slate-900/30 rounded-full flex items-center justify-center mx-auto border-4 border-blue-600/50 shadow-lg shadow-blue-600/30 overflow-hidden metallic-texture">
              {getAvatarDisplay() ? (
                <img 
                  src={getAvatarDisplay()} 
                  alt={getAvatarName(profileData.avatar || 'yoda')}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'block';
                    }
                  }}
                />
              ) : null}
              {getAvatarFallback() && (
                <span className="text-6xl" style={{ display: getAvatarDisplay() ? 'none' : 'block' }}>
                  {getAvatarFallback()}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 flex space-x-2">
              <button
                onClick={() => setShowAvatarUpload(true)}
                className="bg-blue-600/80 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg border-2 border-blue-500/50 transition-all hover:scale-110 star-wars-glow"
                title="Upload Custom Picture"
              >
                <Upload className="w-4 h-4" />
              </button>
              {profileData.avatar === 'custom' && profileData.customAvatar && (
                <button
                  onClick={handleDeleteCustomAvatar}
                  className="bg-red-600/80 hover:bg-red-700 text-white rounded-full p-2 shadow-lg border-2 border-red-500/50 transition-all hover:scale-110 star-wars-glow"
                  title="Remove Custom Picture"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setShowAvatarSelector(true)}
                className="bg-slate-700/80 hover:bg-slate-600 text-blue-200 rounded-full p-2 shadow-lg border-2 border-blue-600/50 transition-all hover:scale-110 star-wars-glow"
                title="Choose Star Wars Avatar"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2 star-wars-glow">
            {profileData.username}
          </h1>
          <p className="text-blue-200/70 text-lg">
            {profileData.avatar === 'custom' ? 'Custom Avatar' : getAvatarName(profileData.avatar || 'yoda')} • Level {profileData.stats.currentLevel} • {profileData.stats.completionRate}% Complete
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-blue-600/40">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-300 mb-1 star-wars-glow">
              {profileData.stats.totalLessonsCompleted}
            </div>
            <div className="text-blue-200/60 text-sm">Lessons Completed</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-blue-600/40">
              <Star className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-300 mb-1 star-wars-glow">
              {profileData.stats.totalScore}
            </div>
            <div className="text-blue-200/60 text-sm">Total Score</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-blue-600/40">
              <Trophy className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-300 mb-1 star-wars-glow">
              {profileData.achievements.length}
            </div>
            <div className="text-blue-200/60 text-sm">Achievements</div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-blue-600/40">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-300 mb-1 star-wars-glow">
              {profileData.stats.completionRate}%
            </div>
            <div className="text-blue-200/60 text-sm">Completion Rate</div>
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
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-sm border border-blue-900/30">
                      <div>
                        <div className="text-blue-100 font-medium">
                          {completed.lessonId?.title || 'Lesson'}
                        </div>
                        <div className="text-sm text-blue-200/50">
                          Level {completed.lessonId?.level || '?'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400 font-medium">
                          {completed.score} pts
                        </div>
                        <div className="text-xs text-blue-200/40">
                          {new Date(completed.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-blue-400/30 mx-auto mb-3" />
                <p className="text-blue-200/60">No completed lessons yet</p>
                <p className="text-sm text-blue-200/40 mt-1">Start your coding journey!</p>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="card">
            <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center star-wars-title">
              <Award className="w-5 h-5 mr-2 text-blue-400" />
              Achievements
            </h3>
            
            {profileData.achievements.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-900/20 rounded-sm border border-blue-700/30">
                    <div className="text-2xl">
                      {getAchievementIcon(achievement)}
                    </div>
                    <div>
                      <div className="text-blue-200 font-medium text-sm">
                        {getAchievementName(achievement)}
                      </div>
                      <div className="text-xs text-blue-200/50 capitalize">
                        {achievement.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-12 h-12 text-blue-400/30 mx-auto mb-3" />
                <p className="text-blue-200/60">No achievements yet</p>
                <p className="text-sm text-blue-200/40 mt-1">Complete lessons to unlock achievements!</p>
              </div>
            )}
          </div>
        </div>

        {/* Level Progress */}
        <div className="card mt-8">
          <h3 className="text-xl font-semibold text-blue-300 mb-4 star-wars-title">Level Progress</h3>
          
          {Object.keys(profileData.stats.levelStats).length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(profileData.stats.levelStats)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([level, count]) => (
                  <div key={level} className="text-center p-4 bg-blue-900/20 rounded-sm border border-blue-700/30">
                    <div className="text-2xl font-bold text-blue-400 mb-1 star-wars-glow">
                      {count}
                    </div>
                    <div className="text-sm text-blue-200/60">
                      Level {level}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-blue-200/60">No level progress yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Avatar Selector Modal */}
      {showAvatarSelector && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AvatarSelector
            currentAvatar={profileData.avatar === 'custom' ? 'yoda' : (profileData.avatar || 'yoda')}
            onSelect={handleAvatarSelect}
            onClose={() => setShowAvatarSelector(false)}
          />
        </div>
      )}

      {/* Avatar Upload Modal */}
      {showAvatarUpload && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <AvatarUpload
            onUploadSuccess={handleAvatarUploadSuccess}
            onCancel={() => setShowAvatarUpload(false)}
          />
        </div>
      )}
    </div>
  )
}

export default ProfilePage






