import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, BarChart3 } from 'lucide-react'
import useAuthStore from '../../store/authStore'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Levels', path: '/levels', protected: true },
    { name: 'Leaderboard', path: '/leaderboard' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b-2 border-yellow-700/50 sticky top-0 z-50 shadow-lg shadow-yellow-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/favicon.svg" 
              alt="GameStack Logo" 
              className="w-8 h-8 group-hover:scale-110 transition-transform"
            />
            <span className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform">
              GameStack
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.protected && !isAuthenticated) return null
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-400 bg-blue-900/30 star-wars-glow'
                      : 'text-slate-200 hover:text-blue-300 hover:bg-blue-900/20'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Link
                    to="/admin/data"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Admin Data</span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:text-blue-300 hover:bg-blue-900/20 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:text-blue-300 hover:bg-blue-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-yellow-200/80 hover:text-yellow-300 hover:bg-yellow-900/20 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-yellow-200/80 hover:text-yellow-300 hover:bg-yellow-900/20 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-900/20 rounded-lg mt-2 border border-blue-600/30">
              {navItems.map((item) => {
                if (item.protected && !isAuthenticated) return null
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-yellow-400 bg-yellow-900/30 star-wars-glow'
                        : 'text-yellow-200/80 hover:text-yellow-300 hover:bg-yellow-900/20'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
              
              {isAuthenticated ? (
                <>
                  {user?.isAdmin && (
                    <Link
                      to="/admin/data"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 transition-colors"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Admin Data</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-yellow-200/80 hover:text-yellow-300 hover:bg-yellow-900/20 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium text-yellow-200/80 hover:text-yellow-300 hover:bg-yellow-900/20 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center btn-primary text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar






