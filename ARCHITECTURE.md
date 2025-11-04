# GameStack Architecture Documentation

## 📐 System Overview

GameStack is a full-stack gamified code learning platform that combines:
- **Frontend**: React + Vite (SPA with 3D visualization)
- **Backend**: Spring Boot (REST API)
- **Database**: MongoDB (NoSQL document store)
- **3D Rendering**: Three.js + React Three Fiber
- **Code Execution**: Pyodide (Python runtime in browser)

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  React + Vite (Port 5173)                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ React UI │→ │ Zustand  │→ │ Three.js │→ │ Pyodide  │   │
│  │ Components│  │  Store   │  │  3D View │  │  Python  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
                       │ JSON
┌──────────────────────▼──────────────────────────────────────┐
│                      Backend API                             │
│         Spring Boot (Port 3001)                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Controllers│→ │ Services │→ │ MongoDB  │                  │
│  │   (REST)  │  │  (Logic) │  │ Repository│                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│       │              │              │                        │
│       └──────────────┴──────────────┘                        │
│                  Spring Security                              │
│                    (JWT Auth)                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ MongoDB Protocol
┌──────────────────────▼──────────────────────────────────────┐
│                      MongoDB                                 │
│              (Document Database)                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  users   │  │ lessons  │  │  (other) │                  │
│  │ collection│  │collection│  │          │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Frontend Architecture

### Technology Stack
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0
- **Routing**: React Router DOM 6.20.1
- **State Management**: Zustand 4.4.7
- **3D Graphics**: 
  - Three.js 0.180.0
  - React Three Fiber 8.15.12
  - @react-three/drei 9.88.13
- **Code Editor**: Monaco Editor (@monaco-editor/react 4.6.0)
- **Python Runtime**: Pyodide 0.28.3
- **HTTP Client**: Axios 1.6.2
- **Styling**: TailwindCSS 3.3.6
- **Animations**: Framer Motion 12.23.24

### Directory Structure
```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── 3d/             # 3D scene components (GameWorld, etc.)
│   │   ├── auth/           # Authentication components
│   │   ├── editor/         # Code editor components
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   └── ...
│   ├── pages/              # Page components (routes)
│   │   ├── HomePage.jsx
│   │   ├── LevelSelectPage.jsx
│   │   ├── GamePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── LeaderboardPage.jsx
│   │   └── AdminDataPage.jsx
│   ├── store/              # Zustand state management
│   │   ├── authStore.js    # Authentication state
│   │   └── gameStore.js    # Game state (player, world, actions)
│   ├── utils/              # Utility functions
│   │   ├── api.js          # Axios instance & API calls
│   │   ├── codeExecutor.js # Pyodide integration
│   │   └── ...
│   ├── App.jsx             # Main app component & routing
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

### State Management (Zustand)

#### Auth Store (`authStore.js`)
```javascript
State:
  - user: User object
  - token: JWT token
  - isAuthenticated: boolean
  - isLoading: boolean
  - error: string

Actions:
  - login(email, password)
  - register(username, email, password)
  - logout()
  - updateProfile(profileData)
  - initializeAuth() // Load from localStorage
```

#### Game Store (`gameStore.js`)
```javascript
State:
  - currentLesson: Lesson object
  - worldState: WorldState (gems, obstacles)
  - playerState: PlayerState (position, rotation)
  - actionQueue: Array of actions
  - isRunning: boolean
  - isCompleted: boolean
  - error: string

Actions:
  - setCurrentLesson(lesson)
  - resetGame()
  - enqueueAction(action)
  - runQueue()
  - stopExecution()
  - updatePlayerState(position, rotation)
  - checkCompletion()
```

### Data Flow

```
User Action → Component → Store Action → API Call → Backend
                ↓                                    ↓
            UI Update ← Store Update ← API Response
```

### Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── HomePage
│   ├── LoginPage
│   ├── RegisterPage
│   ├── LevelSelectPage
│   ├── GamePage
│   │   ├── CodeEditor (Monaco)
│   │   └── GameWorld (React Three Fiber)
│   │       └── SceneContent (Three.js)
│   ├── ProfilePage
│   ├── LeaderboardPage
│   └── AdminDataPage
└── Footer
```

### Code Execution Flow

1. User writes Python code in Monaco Editor
2. Click "Run" → `executePythonCode()` in `codeExecutor.js`
3. Pyodide executes Python code in browser
4. Python code calls game functions (`move()`, `turnLeft()`, etc.)
5. Game functions enqueue actions in `gameStore`
6. `gameStore.runQueue()` processes actions
7. Actions update `playerState` and `worldState`
8. React Three Fiber re-renders 3D scene
9. Completion check runs after each action

## ⚙️ Backend Architecture

### Technology Stack
- **Framework**: Spring Boot 3.2
- **Language**: Java 17+
- **Build Tool**: Maven 3.6+
- **Database**: MongoDB (Spring Data MongoDB)
- **Security**: Spring Security + JWT
- **API**: RESTful API

### Directory Structure
```
backend-spring/
├── src/main/java/com/gamestack/
│   ├── controller/          # REST Controllers
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── LessonController.java
│   │   ├── AdminController.java
│   │   ├── LeaderboardController.java
│   │   ├── WebController.java
│   │   └── HealthController.java
│   ├── service/             # Business Logic
│   │   ├── UserService.java
│   │   ├── LessonService.java
│   │   ├── DataSyncService.java
│   │   └── ...
│   ├── repository/          # Data Access Layer
│   │   ├── UserRepository.java (MongoRepository)
│   │   └── LessonRepository.java (MongoRepository)
│   ├── entity/              # MongoDB Documents
│   │   ├── User.java
│   │   ├── Lesson.java
│   │   ├── UserProgress.java (embedded)
│   │   ├── CompletedLesson.java (embedded)
│   │   ├── WorldState.java (embedded)
│   │   └── ...
│   ├── security/            # Security Configuration
│   │   ├── SecurityConfig.java
│   │   ├── JwtUtil.java
│   │   └── JwtAuthenticationFilter.java
│   ├── config/              # Configuration
│   │   └── MongoConfig.java
│   └── GamestackApplication.java
├── src/main/resources/
│   ├── application.yml      # Application config
│   ├── static/              # Static files (HTML)
│   │   └── data-view.html   # Web interface
│   └── ...
└── pom.xml                  # Maven dependencies
```

### Layer Architecture

```
┌─────────────────────────────────────┐
│      REST Controllers Layer         │
│  (@RestController, @GetMapping)     │
│  - Request/Response handling        │
│  - Input validation                 │
│  - Security annotations             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Service Layer                 │
│  (@Service)                         │
│  - Business logic                   │
│  - Data transformation              │
│  - Transaction management           │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Repository Layer              │
│  (MongoRepository<T, ID>)           │
│  - Database operations              │
│  - Custom queries                   │
│  - Data access                      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Entity/Document Layer         │
│  (@Document, @Field)                │
│  - Data models                      │
│  - MongoDB mapping                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│           MongoDB                    │
│      (Document Database)             │
└─────────────────────────────────────┘
```

### Security Architecture

```
Request → JwtAuthenticationFilter → SecurityConfig
                                      │
                                      ├─ Public endpoints: /api/auth/**, /api/lessons/**
                                      └─ Protected endpoints: /api/users/**, /api/admin/**
                                         │
                                         └─ JWT Validation → User Details → Authorization
```

**JWT Flow:**
1. User logs in → `/api/auth/login`
2. Backend validates credentials → Generates JWT
3. Frontend stores JWT in localStorage
4. Subsequent requests include `Authorization: Bearer <token>`
5. `JwtAuthenticationFilter` validates token
6. Spring Security sets authentication context
7. `@PreAuthorize` annotations check roles

### Entity/Document Models

#### User Document
```java
@Document(collection = "users")
{
  "_id": ObjectId,
  "username": String (unique),
  "email": String (unique),
  "password": String (BCrypt hashed),
  "progress": {
    "completedLessons": [CompletedLesson],
    "currentLevel": Integer,
    "totalScore": Integer
  },
  "achievements": [String],
  "avatar": String,
  "customAvatar": String,
  "isAdmin": Boolean,
  "createdAt": LocalDateTime,
  "updatedAt": LocalDateTime
}
```

#### Lesson Document
```java
@Document(collection = "lessons")
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "instructions": String,
  "level": Integer,
  "order": Integer,
  "difficulty": String, // "beginner", "intermediate", "advanced"
  "concepts": [String],
  "startingCode": String,
  "worldState": {
    "player": { "position": {x,y,z}, "rotation": {x,y,z} },
    "gems": [{ "position": {x,y,z}, "collected": Boolean }],
    "obstacles": [{ "position": {x,y,z}, "type": String }]
  },
  "targetState": {
    "playerPosition": {x,y,z},
    "gemsCollected": Integer,
    "maxMoves": Integer
  },
  "isPublished": Boolean,
  "createdBy": String (User ID),
  "createdAt": LocalDateTime,
  "updatedAt": LocalDateTime
}
```

## 🔄 API Architecture

### RESTful API Design

**Base URL**: `http://localhost:3001/api`

#### Authentication Endpoints
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login (returns JWT)
GET    /api/auth/me          # Get current user
PUT    /api/auth/profile     # Update profile
```

#### Lesson Endpoints
```
GET    /api/lessons          # Get all published lessons
GET    /api/lessons/:id      # Get specific lesson
POST   /api/lessons/:id/complete  # Complete lesson
GET    /api/lessons/:id/progress  # Get lesson progress
```

#### User Endpoints
```
GET    /api/users/profile    # Get user profile (authenticated)
GET    /api/users/progress   # Get user progress (authenticated)
GET    /api/users/achievements # Get achievements (authenticated)
```

#### Admin Endpoints
```
GET    /api/admin/stats      # Get admin statistics (admin only)
GET    /api/admin/users      # Get all users (admin only)
GET    /api/admin/lessons    # Get all lessons (admin only)
```

#### Leaderboard Endpoints
```
GET    /api/leaderboard      # Get leaderboard
GET    /api/leaderboard/my-position # Get user's position
```

### Request/Response Formats

**Request Example (Login):**
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response Example:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6905abbd5f9bda4a0820bd37",
    "username": "demo",
    "email": "demo@example.com",
    "avatar": "yoda",
    "isAdmin": false
  }
}
```

## 🗄️ Database Architecture

### MongoDB Collections

#### users Collection
- **Indexes**: `username` (unique), `email` (unique)
- **Documents**: User accounts with embedded progress

#### lessons Collection
- **Indexes**: `level`, `order`, `isPublished`, `difficulty`
- **Documents**: Lesson definitions with embedded world states

### Data Relationships

```
User (1) ──< (Many) CompletedLesson
  │
  └── UserProgress (embedded)
      └── completedLessons[] → Lesson IDs

Lesson (1) ──< (Many) CompletedLesson (via lessonId reference)
  │
  └── WorldState (embedded)
      ├── Player (embedded)
      ├── Gems[] (embedded)
      └── Obstacles[] (embedded)
```

### Data Synchronization

The `DataSyncService` can sync data from an external MongoDB instance:
- `syncUsers()` - Sync all users
- `syncLessons()` - Sync all lessons
- `syncAll()` - Sync everything
- Scheduled sync runs every hour

## 🔐 Security Architecture

### Authentication Flow
```
1. User submits credentials → AuthController
2. UserService validates credentials
3. JwtUtil generates JWT token
4. Token returned to frontend
5. Frontend stores token in localStorage
```

### Authorization Flow
```
1. Request with JWT token
2. JwtAuthenticationFilter intercepts
3. JwtUtil validates token
4. UserRepository loads user
5. Authorities built from isAdmin flag
6. SecurityContext set with user details
7. @PreAuthorize checks role
8. Request proceeds if authorized
```

### Security Configuration
- **CORS**: Enabled for `localhost:5173` and `localhost:3000`
- **CSRF**: Disabled (stateless JWT)
- **Session**: Stateless (no sessions)
- **Password**: BCrypt hashing

## 🚀 Deployment Architecture

### Development
```
Frontend (Vite Dev Server) → Port 5173
  ↓ Proxy API calls
Backend (Spring Boot) → Port 3001
  ↓ MongoDB connection
MongoDB → Local/Remote instance
```

### Production (Recommended)
```
┌─────────────────────────────────────────┐
│         CDN / Static Hosting            │
│    (Vercel/Netlify/S3 + CloudFront)     │
│         React Build (dist/)             │
└─────────────────────────────────────────┘
                    │
                    │ API Calls
┌───────────────────▼───────────────────────┐
│         Application Server                │
│    (Railway/Render/Fly.io/EC2)           │
│         Spring Boot JAR                   │
└───────────────────┬───────────────────────┘
                    │
┌───────────────────▼───────────────────────┐
│         Database                          │
│    (MongoDB Atlas / Self-hosted)          │
└───────────────────────────────────────────┘
```

## 📊 Data Flow Examples

### User Completes a Lesson
```
1. Frontend: User clicks "Run" → Python code executes
2. Frontend: Code completes → checkCompletion() → isCompleted = true
3. Frontend: POST /api/lessons/:id/complete (with JWT)
4. Backend: LessonController.completeLesson()
5. Backend: UserService updates user progress
6. Backend: Save CompletedLesson to User.progress.completedLessons
7. Backend: Update totalScore and currentLevel
8. Backend: Return updated user progress
9. Frontend: Update gameStore with completion status
10. Frontend: Show success message
```

### User Views Leaderboard
```
1. Frontend: User navigates to /leaderboard
2. Frontend: GET /api/leaderboard
3. Backend: LeaderboardController.getLeaderboard()
4. Backend: UserRepository.findAllOrderByTotalScoreDesc()
5. Backend: Return sorted user list
6. Frontend: Display leaderboard with user rankings
```

## 🔧 Configuration

### Frontend Configuration
- **API Base URL**: Defined in `vite.config.js` proxy
- **Environment**: Development (Vite) vs Production build
- **State Persistence**: Zustand with localStorage

### Backend Configuration
- **application.yml**: MongoDB connection, JWT settings, CORS
- **Port**: 3001 (configurable)
- **MongoDB**: Connection string, database name
- **JWT**: Secret key, expiration time

## 📈 Scalability Considerations

### Frontend
- Code splitting (route-based)
- Lazy loading of 3D components
- Pyodide caching
- Asset optimization (Vite)

### Backend
- Stateless design (JWT) → horizontal scaling
- MongoDB indexes for performance
- Connection pooling
- Caching strategy (future)

### Database
- MongoDB sharding (if needed)
- Replica sets for availability
- Index optimization

## 🛠️ Development Workflow

1. **Frontend Development**
   ```bash
   cd frontend
   npm install
   npm run dev  # Starts Vite dev server
   ```

2. **Backend Development**
   ```bash
   cd backend-spring
   mvn spring-boot:run  # Starts Spring Boot
   ```

3. **Database**
   - MongoDB running locally or remote
   - Connection configured in `application.yml`

4. **Testing**
   - Frontend: Component testing (future)
   - Backend: Unit tests, Integration tests (future)
   - E2E: Manual testing via web interface

## 🔍 Monitoring & Logging

### Current
- Spring Boot default logging
- Console logs for debugging

### Future Enhancements
- Structured logging (Logback)
- Error tracking (Sentry)
- Performance monitoring
- Analytics

---

**Last Updated**: November 2024
**Version**: 1.0.0
