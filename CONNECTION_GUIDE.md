# 🚀 Frontend-Backend Connection Guide

## ✅ **Connection Status: SUCCESSFUL!**

Your frontend is now connected to the Spring Boot backend!

### 🌐 **Service URLs**

- **Frontend**: `http://localhost:5173` (React/Vite)
- **Backend**: `http://localhost:3001` (Spring Boot)
- **H2 Database Console**: `http://localhost:3001/h2-console`

### 🔧 **How It Works**

1. **Vite Proxy Configuration** (`frontend/vite.config.js`):
   ```javascript
   proxy: {
     '/api': {
       target: 'http://localhost:3001',
       changeOrigin: true,
       secure: false,
     }
   }
   ```

2. **API Client** (`frontend/src/utils/api.js`):
   - Automatically adds JWT tokens to requests
   - Handles 401 errors (redirects to login)
   - Uses `/api` base URL

3. **Authentication Store** (`frontend/src/store/authStore.js`):
   - Manages user state with Zustand
   - Persists auth data to localStorage
   - Handles login, register, logout

### 📊 **Sample Data Ready**

**Login Credentials:**
- **Admin**: `demo@gamestack.dev` / `demo123`
- **Users**: `alice@example.com`, `bob@example.com`, etc. / `password123`

**Available Endpoints:**
- ✅ `POST /api/auth/login`
- ✅ `POST /api/auth/register`
- ✅ `GET /api/auth/me`
- ✅ `PUT /api/auth/profile`
- ✅ `GET /api/lessons`
- ✅ `GET /api/leaderboard`
- ✅ `POST /api/lessons/{id}/complete`

### 🧪 **Test the Connection**

1. **Open your browser**: `http://localhost:5173`
2. **Try to register**: Click "Register" and create an account
3. **Try to login**: Use `demo@gamestack.dev` / `demo123`
4. **View lessons**: Navigate to the level select page
5. **Check leaderboard**: See the sample users and scores

### 🔄 **Running the Application**

**Start Backend:**
```bash
cd /Volumes/THUNDERBOY/gamestack/backend-spring
mvn spring-boot:run
```

**Start Frontend:**
```bash
cd /Volumes/THUNDERBOY/gamestack/frontend
npm run dev
```

**Both are currently running!**

### 📝 **API Response Format**

The backend returns responses in this format:
```json
{
  "message": "Success message",
  "user": { ... },
  "token": "jwt_token_here"
}
```

### 🎯 **What's Working**

- ✅ Frontend proxy to backend
- ✅ JWT token authentication
- ✅ User registration and login
- ✅ Protected routes
- ✅ API error handling
- ✅ CORS configuration
- ✅ Sample data loaded

### 🐛 **Troubleshooting**

If you encounter issues:

1. **Backend not responding**:
   ```bash
   cd /Volumes/THUNDERBOY/gamestack/backend-spring
   mvn spring-boot:run
   ```

2. **Frontend not loading**:
   ```bash
   cd /Volumes/THUNDERBOY/gamestack/frontend
   npm run dev
   ```

3. **Clear browser cache**: Clear localStorage if auth is stuck

4. **Check browser console**: Open DevTools to see any errors

### 🎉 **Next Steps**

1. Test the login flow
2. Complete a lesson
3. View your progress on the profile page
4. Check the leaderboard
5. Try different user accounts

---

**Happy Coding! 🚀**









