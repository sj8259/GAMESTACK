# 🎯 Current GameStack Setup

## ✅ Production Architecture

### **Backend: Node.js + MongoDB** (ACTIVE ✅)
- **Port**: 5001
- **Database**: MongoDB (localhost:27017/gamestack)
- **Status**: Fully operational
- **Location**: `backend-node/`

### **Frontend: React + Vite** (ACTIVE ✅)
- **Port**: 5173
- **Status**: Fully operational
- **Location**: `frontend/`

### **Backend: Java + Spring Boot** (REFERENCE ONLY)
- **Port**: 3001
- **Database**: H2 (in-memory)
- **Status**: Kept for reference
- **Location**: `backend-spring/`

---

## 📊 Current Data Flow

### MongoDB → Node.js → React

```
MongoDB Database
    ↓
Node.js Backend (Port 5001)
    ↓
React Frontend (Port 5173)
    ↓
User Browser
```

### Data Sources

**MongoDB Collections**:
1. **users** - User accounts, progress, achievements
2. **lessons** - Lesson content, world states, 3D data

**Database Connection**: `mongodb://localhost:27017/gamestack`

---

## 🚀 Running Application

### Start MongoDB
```bash
mongod  # Usually already running
```

### Start Backend (Node.js)
```bash
cd backend-node
npm start
```

### Start Frontend
```bash
cd frontend
npm run dev
```

### Access Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5001
- **Demo Login**: demo@gamestack.dev / demo123

---

## 📝 Data Collection Points

### From User Input
- Registration (username, email, password)
- Login credentials
- Code written in lessons

### Tracking Automatically
- Lesson completions
- Scores (0-100)
- Move counts
- Achievement unlocks
- Timestamps

### Stored in MongoDB
- ✅ User accounts (hashed passwords)
- ✅ Completed lessons history
- ✅ Total scores
- ✅ Achievements
- ✅ Leaderboard rankings

---

## 🔄 Data Flow Example

### User Completes a Lesson
```
1. User writes Python code in frontend
2. Code executes via Pyodide
3. Character moves in 3D world
4. Lesson completed (position + gems match target)
5. Frontend sends: POST /api/lessons/:id/complete
6. Node.js backend receives request
7. Updates user document in MongoDB:
   - Adds to completedLessons array
   - Updates totalScore
   - Checks for achievements
   - Saves to users collection
8. Returns success response to frontend
9. UI updates with new progress
```

---

## 📊 Sample Data in MongoDB

### Users Collection
```javascript
{
  username: "demo",
  email: "demo@gamestack.dev",
  password: "$2a$12$...", // bcrypt hashed
  progress: {
    completedLessons: [...],
    currentLevel: 1,
    totalScore: 0
  },
  achievements: []
}
```

### Lessons Collection
```javascript
{
  title: "First Steps",
  description: "Learn the basics...",
  instructions: "Use move()...",
  level: 1,
  order: 1,
  worldState: {
    player: { position: {x:0,y:0,z:0}, rotation: {x:0,y:0,z:0} },
    gems: [{ position: {x:2,y:0.5,z:0} }],
    obstacles: []
  },
  targetState: {
    playerPosition: {x:2,y:0,z:0},
    gemsCollected: 1,
    maxMoves: 5
  },
  isPublished: true
}
```

---

## 🔍 Data Access Points

### Browser → Frontend
- User interacts with UI
- Code input through Monaco Editor
- 3D world rendering via Three.js

### Frontend → Backend (Node.js)
- API calls to `/api/*` endpoints
- Authentication via JWT tokens
- Data fetching and submission

### Backend → MongoDB
- User queries
- Progress updates
- Lesson data retrieval

---

## 🎯 Why This Architecture?

### Node.js + MongoDB
✅ **Fast**: Asynchronous, non-blocking  
✅ **Flexible**: Document-based data  
✅ **Proven**: Production-ready stack  
✅ **Simple**: Easy to maintain  

### React Frontend
✅ **Fast**: Vite build system  
✅ **Modern**: Latest React features  
✅ **3D**: Three.js for game world  
✅ **Responsive**: Works on all devices  

### Java Backend (Reference)
- Kept for comparison
- Not actively used
- Could be converted later if needed

---

## 🗄️ Database Schema

### Users Collection
```
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (bcrypt hashed),
  progress: {
    completedLessons: [{ lessonId, completedAt, score }],
    currentLevel: Number,
    totalScore: Number
  },
  achievements: [String],
  avatar: String,
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Lessons Collection
```
{
  _id: ObjectId,
  title: String,
  description: String,
  instructions: String,
  hints: [String],
  level: Number (1-50),
  order: Number,
  difficulty: String,
  concepts: [String],
  startingCode: String,
  worldState: {
    player: { position, rotation },
    gems: [{ position }],
    obstacles: [{ position, type }]
  },
  targetState: {
    playerPosition: {x,y,z},
    gemsCollected: Number,
    maxMoves: Number
  },
  successMessage: String,
  isPublished: Boolean,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## ✅ Current Status

### What's Working
✅ User authentication  
✅ Registration & login  
✅ Lesson viewing & playing  
✅ Code execution with Pyodide  
✅ 3D character movement  
✅ Progress tracking  
✅ Achievement system  
✅ Leaderboard  
✅ Obstacle collision detection  
✅ Character reset on run  
✅ All 5 lessons functional  

### What's NOT Running
❌ Java Spring Boot backend (reference only)  
❌ H2 database (unused)  

---

## 🎉 Summary

**Your application is fully operational** with the **Node.js + MongoDB** stack!

- MongoDB stores all data
- Node.js provides the API
- React displays the UI
- Everything connects perfectly

**No need for Java backend** - the Node.js version is working great!

---

## 📄 Documentation Files

- `QUICK_START.md` - How to start the app
- `DATA_COLLECTION_ANALYSIS.md` - What data we collect
- `CHARACTER_RESET_FIX.md` - Reset fix details
- `OBSTACLE_COLLISION_FIX.md` - Collision handling
- `GAME_LOGIC_ANALYSIS.md` - CodeCombat comparison
- `STATUS.md` - Overall status

---

**Status: Production Ready! 🚀**

