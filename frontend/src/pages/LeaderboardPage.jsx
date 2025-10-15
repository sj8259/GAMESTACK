import { useEffect, useState, useCallback } from 'react'
import { Trophy, Crown, Medal, Award, Calendar, Target } from 'lucide-react'
import api from '../utils/api'

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [myPosition, setMyPosition] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('all')

  const loadLeaderboard = useCallback(async () => {
    try {
      const response = await api.get(`/leaderboard?period=${selectedPeriod}`)
      setLeaderboard(response.data.leaderboard)
    } catch (error) {
      console.error('Failed to load leaderboard:', error)
    }
  }, [selectedPeriod])

  const loadMyPosition = useCallback(async () => {
    try {
      const response = await api.get('/leaderboard/my-position')
      setMyPosition(response.data.position)
    } catch (error) {
      console.error('Failed to load position:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLeaderboard()
    loadMyPosition()
  }, [loadLeaderboard, loadMyPosition])

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <span className="text-slate-400 font-bold">#{rank}</span>
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30'
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30'
      default: return 'bg-slate-800/50 border-slate-700/50'
    }
  }

  const periods = [
    { value: 'all', label: 'All Time' },
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-slate-300">
            See how you stack up against other coders
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* My Position */}
        {myPosition && (
          <div className="mb-8">
            <div className="card bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">You</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{myPosition.username}</h3>
                    <p className="text-slate-400">Your position in the leaderboard</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">#{myPosition.rank}</div>
                  <div className="text-sm text-slate-400">{myPosition.totalScore} points</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="space-y-4">
          {leaderboard.map((user) => (
            <div
              key={user._id}
              className={`card-hover ${getRankColor(user.rank)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{user.username}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{user.completedLessons} lessons</span>
                        </span>
                        {user.lastActive && (
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(user.lastActive).toLocaleDateString()}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-1">
                    {user.totalScore}
                  </div>
                  <div className="text-sm text-slate-400">points</div>
                </div>
              </div>

              {/* Achievements */}
              {user.achievements && user.achievements.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400">Achievements:</span>
                    <div className="flex space-x-1">
                      {user.achievements.slice(0, 5).map((achievement, idx) => (
                        <span key={idx} className="text-lg">
                          {achievement === 'first_lesson' && '🎯'}
                          {achievement === 'perfect_score' && '⭐'}
                          {achievement === 'speed_demon' && '⚡'}
                          {achievement === 'persistent' && '🔥'}
                          {achievement === 'explorer' && '🗺️'}
                        </span>
                      ))}
                      {user.achievements.length > 5 && (
                        <span className="text-xs text-slate-400">+{user.achievements.length - 5}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {leaderboard.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No rankings yet</h3>
            <p className="text-slate-400">Be the first to complete lessons and climb the leaderboard!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeaderboardPage

