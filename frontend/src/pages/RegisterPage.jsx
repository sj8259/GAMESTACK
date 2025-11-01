import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, X } from 'lucide-react'
import useAuthStore from '../store/authStore'
import VantaBackground from '../components/VantaBackground'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    match: false
  })

  const { register, isAuthenticated, clearError } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/levels')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    clearError()
  }, [clearError])

  useEffect(() => {
    // Password validation
    const checks = {
      length: formData.password.length >= 6,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /\d/.test(formData.password),
      match: formData.password === formData.confirmPassword && formData.password !== ''
    }
    setPasswordChecks(checks)
  }, [formData.password, formData.confirmPassword])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (!passwordChecks.length || !passwordChecks.uppercase || !passwordChecks.lowercase || !passwordChecks.number) {
      setError('Password does not meet requirements')
      setIsLoading(false)
      return
    }

    if (!passwordChecks.match) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const result = await register(formData.username, formData.email, formData.password)
      
      if (result.success) {
        navigate('/levels')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getCheckIcon = (check) => {
    return check ? (
      <Check className="w-4 h-4 text-green-400" />
    ) : (
      <X className="w-4 h-4 text-red-400" />
    )
  }

  const getCheckColor = (check) => {
    return check ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Vanta.js RINGS Background - Purple/Pink Theme (Opposite of Login) */}
      <VantaBackground 
        options={{
          backgroundColor: 0x0a0a0a,
          color: 0xec4899, // Pink/Magenta - opposite color of blue login
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded-full flex items-center justify-center border-2 border-pink-600/50">
              <img src="/favicon.svg" alt="GameStack" className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-pink-300 mb-2 star-wars-title">
            Join GameStack
          </h2>
          <p className="text-pink-200/70">
            Start your coding adventure today
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-pink-200 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-pink-400/60" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-pink-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-pink-400/60" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-pink-200 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-pink-400/60" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-pink-400/60 hover:text-pink-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-pink-400/60 hover:text-pink-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {formData.password && (
              <div className="bg-pink-900/20 rounded-sm border border-pink-700/30 p-3 space-y-2">
                <div className="text-sm font-medium text-pink-200 mb-2">Password Requirements:</div>
                <div className="space-y-1 text-sm">
                  <div className={`flex items-center space-x-2 ${getCheckColor(passwordChecks.length)}`}>
                    {getCheckIcon(passwordChecks.length)}
                    <span>At least 6 characters</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${getCheckColor(passwordChecks.uppercase)}`}>
                    {getCheckIcon(passwordChecks.uppercase)}
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${getCheckColor(passwordChecks.lowercase)}`}>
                    {getCheckIcon(passwordChecks.lowercase)}
                    <span>One lowercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${getCheckColor(passwordChecks.number)}`}>
                    {getCheckIcon(passwordChecks.number)}
                    <span>One number</span>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-pink-200 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-pink-400/60" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-pink-400/60 hover:text-pink-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-pink-400/60 hover:text-pink-300" />
                  )}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className={`flex items-center space-x-2 mt-2 text-sm ${getCheckColor(passwordChecks.match)}`}>
                  {getCheckIcon(passwordChecks.match)}
                  <span>Passwords {passwordChecks.match ? 'match' : 'do not match'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !passwordChecks.match || !passwordChecks.length || !passwordChecks.uppercase || !passwordChecks.lowercase || !passwordChecks.number}
            className="w-full btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating account...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                Create Account
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-pink-700/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/50 text-pink-200/70">Already have an account?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="text-pink-400 hover:text-pink-300 font-medium transition-colors star-wars-glow"
            >
              Sign in to your account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage






