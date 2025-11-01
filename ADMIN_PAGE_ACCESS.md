# 🔧 Admin Data Page Access Guide

## ✅ Current Status

**All systems are ready!**

### What's Working
✅ Backend running on port 5001  
✅ Frontend running on port 5173  
✅ Admin endpoints created  
✅ isAdmin flag included in login  
✅ Admin page route registered  
✅ Navbar link added  

---

## 🚀 How to Access Admin Data

### Step 1: Logout and Login Again
If you're already logged in, you need to refresh your session:

1. **Logout**: Click the logout button
2. **Login again**: 
   - Go to http://localhost:5173/login
   - Email: `demo@gamestack.dev`
   - Password: `demo123`
3. You should now see "Admin Data" in the navbar

### Step 2: Click Admin Data Button
1. Look for **purple "Admin Data"** button in navbar
2. Or go to: http://localhost:5173/admin/data

---

## 🔍 Troubleshooting

### If Admin Data button doesn't show:

1. **Check you're logged in** as demo user
2. **Clear browser cache**:
   - Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Or clear localStorage
3. **Logout and login again** to refresh user data

### If you get redirected:

**Not logged in**: Will redirect to `/login`  
**Not admin**: Will redirect to `/`

### If page shows "Failed to load data":

1. **Check backend is running**:
   ```bash
   curl http://localhost:5001/api/health
   ```

2. **Check MongoDB is running**:
   ```bash
   ps aux | grep mongod
   ```

3. **Check logs**:
   ```bash
   tail -50 /tmp/node-backend.log
   ```

---

## 🧪 Quick Test

### Test if admin endpoints work:
```bash
# Login and get token
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@gamestack.dev","password":"demo123"}' \
  | python3 -c "import json, sys; print(json.load(sys.stdin)['token'])" > /tmp/token.txt

# Get admin stats
curl http://localhost:5001/api/admin/stats \
  -H "Authorization: Bearer $(cat /tmp/token.txt)"
```

---

## 📊 What You Should See

### Overview Tab
- 4 stats cards (Users, Lessons, Completions, Average Score)
- Achievements section with 5 achievement types
- Engagement metrics

### Users Tab
- Table with 4 users: demo, alice, bob, charlie
- Progress, scores, achievements

### Lessons Tab
- Table with 5 lessons
- Level, difficulty, gems, status

---

## 🎯 Direct Access URLs

**Admin Data Page**: http://localhost:5173/admin/data  
**Login Page**: http://localhost:5173/login  

---

## 🔐 Admin Account

```
Email: demo@gamestack.dev
Password: demo123
isAdmin: true
```

---

**If still not working, please share:**
1. Browser console errors (F12 → Console)
2. Network tab showing failed requests
3. Any error messages on screen

