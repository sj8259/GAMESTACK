# 📊 How to View Collected Data in Web Interface

## 🎯 Quick Access

**URL**: http://localhost:5173/admin/data

## 🔐 Login Required

**Admin Account**:
- Email: `demo@gamestack.dev`
- Password: `demo123`

---

## 📋 Data View Sections

### 1. **Overview Tab** (Default)

#### Statistics Cards
- **Total Users**: All registered users
- **Lessons Available**: Published lessons count
- **Lesson Completions**: Total completed lessons
- **Average Score**: Average total score across users

#### Achievements Unlocked
- First Lesson
- Perfect Score
- Speed Demon
- Persistent
- Explorer

#### Engagement Metrics
- **Active Users**: Users who completed at least 1 lesson
- **Completions per User**: Average completions per active user

---

### 2. **Users Tab**

Table with all user data:
- **User**: Username (Admin badge if admin)
- **Email**: User email address
- **Progress**: Number of completed lessons + current level
- **Score**: Total score accumulated
- **Achievements**: List of achievements earned

---

### 3. **Lessons Tab**

Table with all lesson data:
- **Lesson**: Title and description
- **Level**: Level number and order
- **Difficulty**: beginner/intermediate/advanced (color-coded)
- **Gems**: Number of gems + obstacles
- **Status**: Published or Draft

---

## 🔍 What Data is Visible

### Per User
✅ Username  
✅ Email  
✅ Progress (completed lessons, level)  
✅ Total score  
✅ Achievements earned  
✅ Admin status  

### Per Lesson
✅ Title and description  
✅ Level and difficulty  
✅ World state (gems, obstacles)  
✅ Target state (completion criteria)  
✅ Published status  

### Aggregated Stats
✅ Total users  
✅ Total lessons  
✅ Published vs draft lessons  
✅ Total completions  
✅ Average scores  
✅ Active user count  
✅ Achievement distribution  

---

## 🚀 How to Access

### Step 1: Login as Admin
1. Go to http://localhost:5173
2. Click "Login"
3. Enter:
   - Email: `demo@gamestack.dev`
   - Password: `demo123`

### Step 2: Navigate to Admin Data
1. After login, look at the top navbar
2. Click "Admin Data" button (purple)
3. Or go directly to: http://localhost:5173/admin/data

### Step 3: View Data
- Switch between tabs: **Overview**, **Users**, **Lessons**
- Click **Refresh** to update data
- Data auto-loads on page visit

---

## 📱 Mobile View

The admin data page is fully responsive:
- Tabs available on mobile
- Scrollable tables
- Same features as desktop

---

## 🔄 Real-Time Updates

The data shown is **live** from MongoDB:
- Refresh button updates all data
- Changes reflect immediately
- No caching - always fresh data

---

## 🎨 Interface Features

### Navigation
- Tab switching
- Back button to home
- Refresh button
- Color-coded badges

### Data Visualization
- Statistics cards with icons
- Color-coded difficulty levels
- Achievement badges
- Progress indicators

### Sorting
- Users sorted by total score (descending)
- Lessons sorted by level and order

---

## 🔒 Security

**Admin Only Access**:
- Requires authentication
- Admin privileges checked
- Non-admin users redirected to home
- All data from MongoDB

---

## 📊 API Endpoints Used

```
GET /api/admin/data        - All data (stats + users + lessons)
GET /api/admin/stats       - Statistics only
GET /api/admin/users       - Users only
GET /api/admin/lessons     - Lessons only
```

All require:
- JWT authentication
- Admin role

---

## 🎯 Example Data You'll See

### Current Database
- **4 Users**: demo, alice, bob, charlie
- **5 Lessons**: First Steps, Turn and Move, Loop the Loop, Conditional Logic, Function Fundamentals
- **6 Completions**: Across test users
- **3 Active Users**: With completed lessons
- **Average Score**: 140 points

---

**Access it now**: http://localhost:5173/admin/data 🚀

