import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../utils/api'

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post('/auth/login', { email, password })
          const { token, user } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
          
          // Set token in axios defaults
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          return { success: true, user }
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed'
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: message
          })
          return { success: false, error: message }
        }
      },

      register: async (username, email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post('/auth/register', { username, email, password })
          const { token, user } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
          
          // Set token in axios defaults
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          return { success: true, user }
        } catch (error) {
          const message = error.response?.data?.message || 'Registration failed'
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: message
          })
          return { success: false, error: message }
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        })
        
        // Remove token from axios defaults
        delete api.defaults.headers.common['Authorization']
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.put('/auth/profile', profileData)
          const { user } = response.data
          
          set(state => ({
            user: { ...state.user, ...user },
            isLoading: false,
            error: null
          }))
          
          return { success: true, user }
        } catch (error) {
          const message = error.response?.data?.message || 'Profile update failed'
          set({ isLoading: false, error: message })
          return { success: false, error: message }
        }
      },

      updateUserProgress: (progress) => {
        set(state => ({
          user: {
            ...state.user,
            progress: { ...state.user.progress, ...progress }
          }
        }))
      },

      updateUserAchievements: (achievements) => {
        set(state => ({
          user: {
            ...state.user,
            achievements
          }
        }))
      },

      clearError: () => set({ error: null }),

      // Initialize auth state from localStorage
      initializeAuth: () => {
        const state = get()
        if (state.token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
          set({ isAuthenticated: true })
        }
      }
    }),
    {
      name: 'gamestack-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export default useAuthStore

