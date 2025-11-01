import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, BookOpen, Trophy, TrendingUp, Award, BarChart3, Database } from 'lucide-react'
import api from '../utils/api'
import useAuthStore from '../store/authStore'

const AdminDataPage = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [lessons, setLessons] = useState([])
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Check if user is admin
    if (user && !user.isAdmin) {
      navigate('/')
      return
    }

    fetchData()
  }, [user, navigate])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      const [statsRes, usersRes, lessonsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
        api.get('/admin/lessons')
      ])

      setStats(statsRes.data.stats)
      setUsers(usersRes.data.users || [])
      setLessons(lessonsRes.data.lessons || [])
      setError(null)
    } catch (err) {
      console.error('Failed to fetch admin data:', err)
      setError('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading admin data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-slate-400">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="h-6 w-px bg-slate-600"></div>
            
            <div className="flex items-center space-x-2">
              <Database className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-bold text-white">Admin Data View</h1>
            </div>
          </div>

          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800/30 px-6 py-3">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'users'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Users ({stats?.totalUsers || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'lessons'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lessons ({stats?.totalLessons || 0})</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-blue-500" />
                  <span className="text-xs text-slate-400">Total</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{stats?.totalUsers || 0}</h3>
                <p className="text-sm text-slate-400">Registered Users</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="w-8 h-8 text-green-500" />
                  <span className="text-xs text-slate-400">Published</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{stats?.publishedLessons || 0}</h3>
                <p className="text-sm text-slate-400">Lessons Available</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <span className="text-xs text-slate-400">Completed</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{stats?.totalCompletions || 0}</h3>
                <p className="text-sm text-slate-400">Lesson Completions</p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                  <span className="text-xs text-slate-400">Average</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{stats?.averageScore || 0}</h3>
                <p className="text-sm text-slate-400">Total Score</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Achievements Unlocked
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(stats?.achievements || {}).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{value}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Engagement Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-green-400">{stats?.activeUsers || 0}</div>
                  <div className="text-sm text-slate-400">Active Users</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {stats?.totalUsers > 0 
                      ? Math.round((stats.activeUsers / stats.totalUsers) * 100) 
                      : 0}% of total users
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">
                    {stats?.totalCompletions > 0 
                      ? Math.round((stats.activeUsers / stats.totalCompletions) * 10) / 10 
                      : 0}
                  </div>
                  <div className="text-sm text-slate-400">Completions per User</div>
                  <div className="text-xs text-slate-500 mt-1">Average across active users</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">All Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Achievements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {users.map((user, idx) => (
                    <tr key={user._id || idx} className="hover:bg-slate-700/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-white">{user.username}</div>
                          {user.isAdmin && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">Admin</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-300">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {user.progress?.completedLessons?.length || 0} lessons
                        </div>
                        <div className="text-xs text-slate-400">Level {user.progress?.currentLevel || 1}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {user.progress?.totalScore || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {user.achievements?.slice(0, 3).map((ach, i) => (
                            <span key={i} className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">
                              {ach.replace('_', ' ')}
                            </span>
                          ))}
                          {user.achievements?.length > 3 && (
                            <span className="px-2 py-0.5 text-xs bg-slate-600 text-slate-300 rounded">
                              +{user.achievements.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">All Lessons</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Lesson</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Difficulty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Gems</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {lessons.map((lesson, idx) => (
                    <tr key={lesson._id || idx} className="hover:bg-slate-700/30">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{lesson.title}</div>
                        <div className="text-xs text-slate-400 mt-1">{lesson.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">Level {lesson.level}</div>
                        <div className="text-xs text-slate-400">Order {lesson.order}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded ${
                          lesson.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                          lesson.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {lesson.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {lesson.worldState?.gems?.length || 0}
                        </div>
                        <div className="text-xs text-slate-400">
                          {lesson.worldState?.obstacles?.length || 0} obstacles
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lesson.isPublished ? (
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">Published</span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-slate-600 text-slate-400 rounded">Draft</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDataPage

