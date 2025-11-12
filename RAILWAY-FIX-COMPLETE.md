# 🔧 Railway Build Error - Complete Fix Guide

## ❌ Error Analysis

From the Railway logs, the error shows:

```
> gamestack@1.0.0 build
> cd frontend && npm run build
sh: 1: vite: not found
```

**Root Cause:**
- Railway is building from the **root directory** (repository root)
- Railway detected the root `package.json` file
- Railway tried to run `npm run build` which runs `cd frontend && npm run build`
- But frontend dependencies aren't installed, so `vite` command is not found
- **This is a BACKEND deployment, not frontend!**

---

## ✅ Solution: Set Root Directory in Railway

### The Fix (2 minutes):

1. **Go to Railway Dashboard:**
   - https://railway.app
   - Login to your account
   - Click on your **GAMESTACK** project

2. **Open Service Settings:**
   - Click on the **GAMESTACK** service (the failing one)
   - Click **"Settings"** tab (top navigation)

3. **Set Root Directory:**
   - Scroll to **"Source"** section
   - Find **"Root Directory"** setting
   - Click **"Edit"** or **"Change"**
   - Set to: `backend-spring`
   - Click **"Save"**

4. **Redeploy:**
   - Go to **"Deployments"** tab
   - Click **"Redeploy"** button
   - Wait for build to complete

---

## 🔍 Verification

### Before Fix:
```
> gamestack@1.0.0 build
> cd frontend && npm run build
sh: 1: vite: not found
❌ FAILED
```

### After Fix:
```
mvn clean package -DskipTests
[INFO] Building jar: target/gamestack-backend-1.0.0.jar
[INFO] BUILD SUCCESS
✅ SUCCESS
```

---

## 📋 Railway Configuration

### Correct Settings:

**Root Directory:** `backend-spring`

**Build Command:** `mvn clean package -DskipTests`
- Railway will auto-detect this for Java/Maven projects

**Start Command:** `java -jar target/gamestack-backend-1.0.0.jar`
- Railway will auto-detect this from Procfile

**Environment Variables:**
- `MONGODB_URI` = `mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack?retryWrites=true&w=majority`
- `JWT_SECRET` = `OWrpHs62OL4m9bTGJynb0aru6gTN7lq4lEHMt7VHsa+QW0IXMyCrQ8Hv8CAv4XAYI7IN4i1+SGBhP0/rtcbgXw==`
- `CORS_ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`
- `PORT` = `3001` (auto-set by Railway)

---

## 🎯 Why This Happens

### Railway's Auto-Detection:

1. **Railway scans the repository:**
   - Looks for `package.json` → Detects Node.js project
   - Looks for `pom.xml` → Detects Java/Maven project
   - Looks for `Dockerfile` → Uses Docker build

2. **Without Root Directory:**
   - Railway starts from repository root
   - Finds root `package.json` first
   - Tries to build as Node.js project
   - Fails because it's actually a Java project

3. **With Root Directory Set:**
   - Railway starts from `backend-spring/` directory
   - Finds `pom.xml` first
   - Detects Java/Maven project
   - Builds correctly with Maven

---

## 🔧 Additional Configuration Files

### Files Created:

1. **`backend-spring/railway.json`** ✅
   - Tells Railway this is a Java/Maven project
   - Specifies build and start commands

2. **`backend-spring/Procfile`** ✅
   - Specifies start command for Railway
   - `web: java -jar target/gamestack-backend-1.0.0.jar`

3. **`backend-spring/nixpacks.toml`** ✅
   - Explicitly tells Railway this is a Java project
   - Specifies Java version 17

---

## 📝 Step-by-Step Fix

### Step 1: Open Railway Dashboard
1. Go to https://railway.app
2. Login
3. Select your project

### Step 2: Open Service Settings
1. Click on **GAMESTACK** service
2. Click **"Settings"** tab

### Step 3: Set Root Directory
1. Scroll to **"Source"** section
2. Find **"Root Directory"**
3. Click **"Edit"**
4. Set to: `backend-spring`
5. Click **"Save"**

### Step 4: Verify Configuration
- Build command should be: `mvn clean package -DskipTests`
- Start command should be: `java -jar target/gamestack-backend-1.0.0.jar`
- Framework should be: Java/Maven

### Step 5: Redeploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"**
3. Wait for build
4. Check build logs

### Step 6: Verify Success
- Build should succeed
- Backend should start
- Health check should work: `curl https://your-app.railway.app/api/health`

---

## ✅ Checklist

- [ ] Root Directory set to `backend-spring` in Railway
- [ ] Build command: `mvn clean package -DskipTests`
- [ ] Start command: `java -jar target/gamestack-backend-1.0.0.jar`
- [ ] Environment variables set correctly
- [ ] Build succeeds
- [ ] Backend starts successfully
- [ ] Health check works

---

## 🚀 Next Steps

After fixing Railway backend:

1. **Get Backend URL:**
   - Copy backend URL from Railway: `https://your-app.railway.app`

2. **Deploy Frontend to Vercel:**
   - Go to https://vercel.com
   - Deploy frontend (root directory: `frontend`)
   - Add environment variable: `VITE_API_URL` = `https://your-backend.railway.app/api`

3. **Update CORS:**
   - Go back to Railway
   - Update `CORS_ALLOWED_ORIGINS` with your Vercel frontend URL
   - Redeploy backend

4. **Test Deployment:**
   - Open frontend URL
   - Test registration/login
   - Verify API calls work

---

## 🎉 Success!

Once root directory is set correctly:
1. ✅ Railway detects Java/Maven project
2. ✅ Build runs: `mvn clean package -DskipTests`
3. ✅ Backend starts: `java -jar target/gamestack-backend-1.0.0.jar`
4. ✅ Deployment succeeds!

---

## 📚 Related Files

- **`RAILWAY-ROOT-DIRECTORY-FIX.md`** - Detailed fix instructions
- **`RAILWAY-QUICK-FIX.md`** - Quick fix steps
- **`RAILWAY-FIX.md`** - Complete fix guide
- **`backend-spring/railway.json`** - Railway configuration
- **`backend-spring/Procfile`** - Start command
- **`backend-spring/nixpacks.toml`** - Nixpacks configuration

---

**The key fix: Set Root Directory = `backend-spring` in Railway settings!**

---

**Time:** 2 minutes  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

