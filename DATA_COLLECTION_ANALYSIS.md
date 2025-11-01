# 📊 Data Collection and Storage Analysis

## 🗄️ Database: MongoDB

**Location**: `mongodb://localhost:27017/gamestack`  
**Database Name**: `gamestack`  
**Collections**: `users`, `lessons`

---

## 📝 Data We Collect

### 1. **User Data** (`users` collection)

#### Registration & Authentication
- **Username** (unique, 3-30 chars)
- **Email** (unique, validated format)
- **Password** (hashed with bcrypt, salt rounds: 12)
- **Created/Updated timestamps**

#### Progress Tracking
```javascript
progress: {
  completedLessons: [{
    lessonId: ObjectId,      // Reference to lesson
    completedAt: Date,       // When completed
    score: Number (0-100)    // Performance score
  }],
  currentLevel: Number,      // Current level (1+)
  totalScore: Number         // Sum of all scores
}
```

#### Achievements
```javascript
achievements: [
  'first_lesson',     // Completed first lesson
  'perfect_score',    // Got 100% on a lesson
  'speed_demon',      // Completed in half the max moves
  'persistent',       // Persistent learner badge
  'explorer'          // Explored different concepts
]
```

#### Profile
- **Avatar** (string, default: 'default')
- **Admin status** (boolean, default: false)

---

### 2. **Lesson Data** (`lessons` collection)

#### Lesson Metadata
- **Title** (max 100 chars)
- **Description** (max 500 chars)
- **Instructions** (text)
- **Hints** (array of strings)
- **Level** (1-50)
- **Order** (within level)
- **Difficulty** ('beginner' | 'intermediate' | 'advanced')
- **Concepts** (array: 'variables', 'loops', 'conditionals', etc.)
- **Starting code** (Python code template)
- **Success message**
- **isPublished** (boolean)
- **Created by** (User reference)
- **Created/Updated timestamps**

#### 3D World State
```javascript
worldState: {
  player: {
    position: { x, y, z },
    rotation: { x, y, z }
  },
  gems: [{
    position: { x, y, z },
    collected: boolean
  }],
  obstacles: [{
    position: { x, y, z },
    type: 'wall' | 'pit' | 'spike'
  }]
}
```

#### Target Completion
```javascript
targetState: {
  playerPosition: { x, y, z },
  gemsCollected: Number,
  maxMoves: Number
}
```

---

## 🔄 Data Flow

### Registration
```
User submits form → Validate → Hash password → Save to MongoDB
```

### Login
```
User submits credentials → Compare password hash → Generate JWT → Return token
```

### Lesson Completion
```
User completes lesson → 
  - Add to completedLessons array
  - Update totalScore
  - Check for achievements
  - Save to MongoDB
```

### Progress Tracking
```
User visits profile → 
  - Calculate level from completed lessons
  - Show total score
  - Display achievements
  - Show lesson completion history
```

---

## 📍 Where Data is Stored

### Development
- **Database**: MongoDB on `localhost:27017`
- **Database Name**: `gamestack`
- **Collections**: `users`, `lessons`

### Data Files
- **Seed Data**: `backend-node/scripts/seedDatabase.js`
- **Sample Lessons**: `backend-node/data/sampleLessons.js`
- **Config**: `backend-node/config.env`

---

## 🔒 Data Security

### Passwords
- ✅ **Hashed** with bcrypt (12 salt rounds)
- ✅ **Never stored in plain text**
- ✅ **No password recovery** (would need email service)

### JWT Tokens
- ✅ **Signed** with secret key
- ✅ **Expires** after 7 days
- ✅ **HttpOnly** cookies (if implemented)
- ✅ **Bearer token** authentication

### API Security
- ✅ **Authentication middleware** on protected routes
- ✅ **Validation** on all inputs
- ✅ **Rate limiting** (can be added)
- ✅ **CORS** configured
- ✅ **Helmet** security headers

---

## 📊 Current Data

### Sample Data in Development

#### Users
- **demo** - admin account (hashed password)
- **alice** - test user with 1 lesson completed
- **bob** - test user with 2 lessons completed  
- **charlie** - test user with 3 lessons completed

#### Lessons
- **5 lessons** total
  - 3 beginner (Level 1)
  - 2 intermediate (Level 2)

---

## 🎯 What We DON'T Collect

### Privacy-Focused Design
❌ No tracking cookies  
❌ No analytics pixels  
❌ No third-party services  
❌ No personal details beyond email  
❌ No IP address logging  
❌ No browsing history  
❌ No location data  
❌ No device fingerprinting  

### Session Data
❌ No session storage  
❌ Only JWT tokens (stateless)  

---

## 🔍 Data Access Points

### Public Endpoints
- `GET /api/lessons` - List published lessons
- `GET /api/lessons/:id` - Get lesson details
- `GET /api/leaderboard` - Public rankings

### Protected Endpoints (require authentication)
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT token
- `GET /api/auth/me` - Current user
- `POST /api/lessons/:id/complete` - Save completion
- `GET /api/users/profile` - User progress
- `GET /api/users/progress` - Lesson progress
- `GET /api/users/achievements` - User achievements

---

## 📈 Analytics Possibilities

### What Could Be Tracked (future)
- Average completion time per lesson
- Most difficult concepts
- Drop-off rates
- Feature usage stats
- Error patterns
- Popular lesson paths

### Current Tracking
✅ Lesson completion counts  
✅ Total scores  
✅ Achievement unlocks  
✅ Leaderboard rankings  

---

## 🗑️ Data Deletion

### User Control
- No delete account feature yet
- Would need to implement:
  - Account deletion endpoint
  - Cascade delete progress
  - GDPR compliance

---

## ✅ Summary

### We Collect
1. **User credentials** (hashed passwords)
2. **Learning progress** (completed lessons, scores)
3. **Achievements** (gamification)
4. **Lesson content** (3D world states)

### We Store
- All data in **MongoDB**
- **Secure** authentication
- **Privacy-focused** design
- **No analytics tracking**

### We Don't Track
- ❌ Browsing behavior
- ❌ Personal details
- ❌ Third-party data
- ❌ Cookies/analytics

---

**Current Status**: Privacy-first, minimal data collection, secure storage ✅

