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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-8 relative overflow-hidden">
      {/* Dark Veil Background with Enhanced Gradients - inspired by reactbits.dev */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark base layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-slate-900"></div>
        
        {/* Enhanced gradient mesh with dark colors */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at 0% 0%, rgba(59, 130, 246, 0.25) 0%, transparent 60%),
              radial-gradient(ellipse 800px 600px at 100% 0%, rgba(139, 92, 246, 0.25) 0%, transparent 60%),
              radial-gradient(ellipse 800px 600px at 100% 100%, rgba(236, 72, 153, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 800px 600px at 0% 100%, rgba(59, 130, 246, 0.25) 0%, transparent 60%),
              radial-gradient(ellipse 1200px 1200px at 50% 50%, rgba(15, 23, 42, 0.9) 0%, transparent 70%)
            `,
            backgroundSize: '100% 100%'
          }}
        />
        
        {/* Animated flowing veil layers with vibrant gradients */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: `
              radial-gradient(ellipse 1000px 800px at top left, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 1000px 800px at top right, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 1000px 800px at bottom left, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse 1000px 800px at bottom right, rgba(59, 130, 246, 0.25) 0%, transparent 50%)
            `,
            backgroundSize: '200% 200%',
            animation: 'veilMove 20s ease-in-out infinite'
          }}
        />
        
        {/* Enhanced conic gradients for veil effect */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `
              conic-gradient(from 0deg at 30% 30%, transparent 0deg, rgba(59, 130, 246, 0.15) 90deg, rgba(139, 92, 246, 0.1) 180deg, transparent 270deg),
              conic-gradient(from 180deg at 70% 70%, transparent 0deg, rgba(139, 92, 246, 0.15) 90deg, rgba(236, 72, 153, 0.1) 180deg, transparent 270deg),
              conic-gradient(from 90deg at 50% 50%, transparent 0deg, rgba(59, 130, 246, 0.08) 120deg, transparent 240deg)
            `,
            backgroundSize: '100% 100%',
            animation: 'veilRotate 25s linear infinite'
          }}
        />
        
        {/* Dark gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        
        {/* Enhanced vibrant gradient orbs with darker contrast */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '18s', animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-pink-500/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '20s', animationDelay: '6s' }}></div>
        <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '22s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '17s', animationDelay: '4s' }}></div>
        
        {/* Subtle mesh grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 200px 200px, 200px 200px',
            backgroundPosition: '0 0, 0 0, 25px 25px, 25px 25px'
          }}
        />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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






