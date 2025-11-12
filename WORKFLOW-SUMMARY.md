# GameStack Workflow Summary 📋

## 🎯 Overview

GameStack is a gamified code learning platform where users learn programming by controlling a 3D character through Python code. This document explains the complete workflow from user interaction to data persistence.

---

## 🔄 Complete User Journey

### 1. **Application Startup**

```
User opens browser → http://localhost:5173
    ↓
App.jsx mounts
    ↓
initializeAuth() → Loads JWT token from localStorage
    ↓
If token exists → Set Authorization header → User is authenticated
    ↓
Render appropriate route (HomePage or protected pages)
```

**Key Files:**
- `App.jsx` - Main router
- `authStore.js` - Authentication state management

---

### 2. **User Authentication Flow**

#### Registration
```
User fills form → RegisterPage.jsx
    ↓
authStore.register(username, email, password)
    ↓
POST /api/auth/register → Backend (AuthController)
    ↓
UserService.validateUser() → Check if username/email exists
    ↓
UserService.createUser() → Hash password with BCrypt
    ↓
Save to MongoDB (users collection)
    ↓
JwtUtil.generateToken() → Create JWT
    ↓
Return { token, user } → Frontend
    ↓
Store in authStore + localStorage
    ↓
Redirect to /levels
```

#### Login
```
User fills form → LoginPage.jsx
    ↓
authStore.login(email, password)
    ↓
POST /api/auth/login → Backend (AuthController)
    ↓
UserService.validateCredentials() → Check password
    ↓
JwtUtil.generateToken() → Create JWT
    ↓
Return { token, user } → Frontend
    ↓
Store in authStore + localStorage
    ↓
Set Authorization header for future requests
    ↓
Redirect to /levels
```

**Key Files:**
- Frontend: `pages/LoginPage.jsx`, `pages/RegisterPage.jsx`, `store/authStore.js`
- Backend: `AuthController.java`, `UserService.java`, `JwtUtil.java`

---

### 3. **Lesson Selection Flow**

```
User navigates to /levels
    ↓
LevelSelectPage.jsx mounts
    ↓
GET /api/lessons → Backend
    ↓
LessonController.getAllLessons() → Filter published lessons
    ↓
LessonRepository.findAll() → MongoDB query
    ↓
Return lessons array → Frontend
    ↓
Display lessons grouped by level/difficulty
    ↓
User clicks lesson → Navigate to /game/:lessonId
```

**Key Files:**
- Frontend: `pages/LevelSelectPage.jsx`
- Backend: `LessonController.java`, `LessonRepository.java`

---

### 4. **Game Play Flow (Main Workflow)**

This is the core workflow where users write Python code to control a 3D character.

#### Step 1: Load Lesson
```
GamePage.jsx mounts → /game/:lessonId
    ↓
GET /api/lessons/:lessonId → Backend
    ↓
LessonController.getLessonById() → MongoDB query
    ↓
Return lesson with worldState → Frontend
    ↓
gameStore.setCurrentLesson(lesson)
    ↓
Initialize:
  - playerState (position, rotation)
  - worldState (gems, obstacles)
  - code (startingCode from lesson)
  - Reset game state
```

#### Step 2: User Writes Code
```
User types Python code in Monaco Editor
    ↓
Code stored in gameStore.code
    ↓
Example code:
  move()
  turnLeft()
  move()
  pickGem()
```

#### Step 3: Execute Code
```
User clicks "Run" button
    ↓
handleRunCode(code) → GamePage.jsx
    ↓
resetGame() → Reset to initial state
    ↓
executePythonCode(code) → codeExecutor.js
    ↓
Pyodide (Python runtime in browser):
  1. Load Python code
  2. Inject game functions (move, turnLeft, etc.)
  3. Execute code
    ↓
Python functions call gameStore actions:
  - move() → gameStore.move()
  - turnLeft() → gameStore.turnLeft()
  - pickGem() → gameStore.pickGem()
    ↓
Each action:
  1. Updates playerState (position, rotation, moves)
  2. Updates worldState (gems collected, obstacles)
  3. Enqueues action in actionQueue
    ↓
After code execution:
  runQueue() → Process actionQueue with delays
    ↓
For each action:
  - Check boundaries
  - Check collisions
  - Update 3D scene
  - Animate with 140ms delay
    ↓
React Three Fiber re-renders 3D scene
    ↓
User sees character move in real-time
```

#### Step 4: Completion Check
```
After each action:
  checkCompletion() → GamePage.jsx
    ↓
Compare playerState with lesson.targetState:
  - Position matches?
  - Gems collected >= target?
    ↓
If completed:
  1. setIsCompleted(true)
  2. Show completion modal
  3. POST /api/lessons/:id/complete
    ↓
Backend:
  LessonController.completeLesson()
    ↓
UserService.updateUserProgress()
    ↓
Update MongoDB:
  - Add to user.progress.completedLessons
  - Update totalScore
  - Update currentLevel
    ↓
Return updated user progress
    ↓
Frontend updates authStore.user.progress
```

**Key Files:**
- Frontend: `pages/GamePage.jsx`, `store/gameStore.js`, `utils/codeExecutor.js`, `components/3d/GameWorld.jsx`
- Backend: `LessonController.java`, `UserService.java`

---

### 5. **3D Rendering Flow**

```
GameWorld.jsx (React Three Fiber)
    ↓
Subscribe to gameStore:
  - playerState (position, rotation)
  - worldState (gems, obstacles)
    ↓
React Three Fiber Canvas
    ↓
Scene3D component:
  - Camera (follows player)
  - Lighting
  - Ground plane
  - PlayerCharacter (3D model)
  - Gems (3D models, conditional rendering)
  - Obstacles (3D models)
    ↓
When playerState/worldState changes:
  React re-renders → Three.js updates scene
    ↓
Smooth animations via React Three Fiber
```

**Key Files:**
- `components/3d/GameWorld.jsx`, `components/3d/Scene3D.jsx`, `components/3d/PlayerCharacter.jsx`

---

### 6. **Progress Tracking Flow**

```
User completes lesson
    ↓
POST /api/lessons/:id/complete
    ↓
Backend updates:
  - User.progress.completedLessons[]
  - User.progress.totalScore
  - User.progress.currentLevel
    ↓
GET /api/users/progress → Frontend
    ↓
Display on ProfilePage:
  - Completed lessons count
  - Current level
  - Total score
  - Achievements
```

**Key Files:**
- Frontend: `pages/ProfilePage.jsx`
- Backend: `UserController.java`, `UserService.java`

---

### 7. **Leaderboard Flow**

```
User navigates to /leaderboard
    ↓
LeaderboardPage.jsx mounts
    ↓
GET /api/leaderboard → Backend
    ↓
LeaderboardController.getLeaderboard()
    ↓
UserRepository.findAllOrderByTotalScoreDesc()
    ↓
MongoDB query → Sort by totalScore descending
    ↓
Return top users → Frontend
    ↓
Display ranked list with:
  - Username
  - Avatar
  - Total score
  - Completed lessons
```

**Key Files:**
- Frontend: `pages/LeaderboardPage.jsx`
- Backend: `LeaderboardController.java`, `UserRepository.java`

---

## 🔐 Security Flow

### JWT Authentication Flow
```
Every API request (except public endpoints)
    ↓
Frontend: Add Authorization header
  Authorization: Bearer <token>
    ↓
Backend: JwtAuthenticationFilter intercepts
    ↓
Extract token from header
    ↓
JwtUtil.validateToken(token)
    ↓
If valid:
  - Extract user ID from token
  - Load user from MongoDB
  - Set SecurityContext with user details
  - Continue to controller
    ↓
If invalid:
  - Return 401 Unauthorized
  - Frontend clears auth and redirects to /login
```

**Key Files:**
- Frontend: `utils/api.js` (axios interceptors)
- Backend: `JwtAuthenticationFilter.java`, `JwtUtil.java`, `SecurityConfig.java`

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERACTION                      │
│  (Click, Type, Navigate)                                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  REACT COMPONENTS                       │
│  (Pages, UI Components)                                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              ZUSTAND STATE STORES                       │
│  - authStore (user, token)                              │
│  - gameStore (playerState, worldState)                   │
└───────┬───────────────────────────┬─────────────────────┘
        │                           │
        │                           ▼
        │              ┌─────────────────────────────┐
        │              │    CODE EXECUTION           │
        │              │  (Pyodide Python Runtime)    │
        │              │  - move()                   │
        │              │  - turnLeft()               │
        │              │  - pickGem()                │
        │              └─────────────┬───────────────┘
        │                           │
        ▼                           ▼
┌─────────────────────────────────────────────────────────┐
│                  API CALLS (Axios)                      │
│  GET /api/lessons                                       │
│  POST /api/auth/login                                   │
│  POST /api/lessons/:id/complete                         │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST
                     │ JSON
                     ▼
┌─────────────────────────────────────────────────────────┐
│              SPRING BOOT BACKEND                        │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │ Controllers  │→ │   Services    │                   │
│  │ (REST APIs)  │  │ (Business     │                   │
│  └──────────────┘  │  Logic)      │                   │
│                     └──────┬───────┘                   │
│                            │                            │
│                     ┌──────▼───────┐                   │
│                     │  Repositories │                   │
│                     │  (Data Access)│                   │
│                     └──────┬───────┘                   │
└────────────────────────────┼───────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    MONGODB                              │
│  Collections:                                            │
│  - users (user accounts, progress)                      │
│  - lessons (lesson definitions, world states)             │
└─────────────────────────────────────────────────────────┘
```

---

## 🎮 Game Functions API

These functions are injected into the Python runtime and available to user code:

### Movement Functions
- `move()` - Move forward one step
- `moveBackward()` - Move backward one step
- `moveSteps(n)` - Move N steps forward
- `turnLeft()` - Rotate 90° left
- `turnRight()` - Rotate 90° right
- `turnAround()` - Rotate 180°
- `face(direction)` - Face north/east/south/west

### Interaction Functions
- `pickGem()` - Pick up gem at current position

### Query Functions
- `getPosition()` - Returns current (x, z) position
- `getGemsCollected()` - Returns number of gems collected
- `getMoves()` - Returns current move count
- `getDirection()` - Returns current facing direction

**Implementation:** All functions call corresponding methods in `gameStore.js`

---

## 🔄 State Management

### Auth Store (`authStore.js`)
**Purpose:** Manage user authentication and profile

**State:**
- `user` - Current user object
- `token` - JWT token
- `isAuthenticated` - Boolean
- `isLoading` - Boolean
- `error` - Error message

**Key Actions:**
- `login(email, password)` - Authenticate user
- `register(username, email, password)` - Create account
- `logout()` - Clear session
- `updateProfile(data)` - Update user profile
- `initializeAuth()` - Load from localStorage

### Game Store (`gameStore.js`)
**Purpose:** Manage game state and player actions

**State:**
- `currentLesson` - Current lesson data
- `playerState` - Position, rotation, moves, gems
- `worldState` - Gems, obstacles, initial state
- `code` - User's Python code
- `isRunning` - Execution status
- `isCompleted` - Completion status
- `actionQueue` - Queue of actions to animate

**Key Actions:**
- `setCurrentLesson(lesson)` - Load lesson
- `resetGame()` - Reset to initial state
- `move()`, `turnLeft()`, `pickGem()` - Player actions
- `runQueue()` - Process action queue with animations
- `checkCompletion()` - Verify lesson completion

---

## 📱 Page Flow

```
/ (HomePage)
    ↓
/login or /register
    ↓
/levels (Protected)
    ↓
/game/:lessonId (Protected)
    ↓
/profile (Protected)
    ↓
/leaderboard (Public)
```

**Protected Routes:** Require authentication via `ProtectedRoute` component

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (BCrypt hashed),
  progress: {
    completedLessons: [{
      lessonId: ObjectId,
      completedAt: Date,
      score: Number,
      moves: Number
    }],
    currentLevel: Number,
    totalScore: Number
  },
  achievements: [String],
  avatar: String,
  isAdmin: Boolean
}
```

### Lessons Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  level: Number,
  difficulty: String,
  worldState: {
    player: { position: {x,y,z}, rotation: {x,y,z} },
    gems: [{ position: {x,y,z}, collected: Boolean }],
    obstacles: [{ position: {x,y,z} }]
  },
  targetState: {
    playerPosition: {x, z},
    gemsCollected: Number,
    maxMoves: Number
  },
  isPublished: Boolean
}
```

---

## 🚀 Performance Optimizations

1. **Code Splitting:** Route-based lazy loading
2. **State Management:** Zustand for efficient updates
3. **3D Rendering:** React Three Fiber for optimized 3D
4. **Python Execution:** Pyodide cached in browser
5. **API Calls:** Axios interceptors for token management
6. **Database:** MongoDB indexes on frequently queried fields

---

## 🔍 Debugging Tips

1. **Frontend:** Check browser console, React DevTools, Zustand DevTools
2. **Backend:** Check Spring Boot logs, MongoDB connection
3. **Game State:** Use Zustand DevTools to inspect gameStore
4. **API Calls:** Check Network tab in browser DevTools
5. **Python Code:** Add print() statements in Python code

---

## 📝 Summary

**User Flow:**
1. Register/Login → Get JWT token
2. Select Lesson → Load lesson data
3. Write Python Code → Execute in browser
4. Code controls 3D Character → Visual feedback
5. Complete Lesson → Update progress in database
6. View Progress/Leaderboard → See achievements

**Technical Flow:**
1. React UI → Zustand Store → API Calls
2. Spring Boot Controllers → Services → Repositories
3. MongoDB Persistence → Data Sync
4. JWT Security → Authentication on every request

---

**Last Updated:** November 2024  
**Version:** 1.0.0

