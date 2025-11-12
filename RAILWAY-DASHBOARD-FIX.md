# 🚨 Railway Dashboard Fix - URGENT

## ❌ Error: Docker Build Using Node.js Image

Railway is trying to build with Docker using Node.js image, but needs Java/Maven:

```
RUN npm ci
RUN mvn clean package -DskipTests
/bin/bash: line 1: mvn: command not found
```

---

## ✅ SOLUTION: Set Root Directory in Railway Dashboard

### Step 1: Open Railway Dashboard

1. Go to: https://railway.app
2. Login to your account
3. Select your **GAMESTACK** project
4. Click on the **GAMESTACK** service (the failing one)

### Step 2: Open Settings

1. Click on **"Settings"** tab (top navigation bar)
2. Scroll down to **"Source"** section

### Step 3: Set Root Directory (CRITICAL!)

1. Find **"Root Directory"** setting
2. Click **"Edit"** or **"Change"** button
3. **Type:** `backend-spring`
4. Click **"Save"** or **"Update"**

### Step 4: Verify Builder

After setting root directory:

1. Railway should auto-detect:
   - **Builder:** `NIXPACKS` or `Auto-detect` (NOT Docker)
   - **Language:** Java/Maven
   - **Build Command:** `mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/gamestack-backend-1.0.0.jar`

2. **If Builder is still "Docker":**
   - That's OK - Railway will use `backend-spring/Dockerfile` (already created)
   - Dockerfile uses Maven image (correct)
   - Will build correctly!

### Step 5: Redeploy

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** button
3. Wait for build to complete
4. Check build logs

---

## 🔍 What Should Happen

### Before Fix:
```
Root Directory: (empty or root)
Builder: Docker
Base Image: Node.js
Build Command: npm ci → mvn (FAILS - mvn not found)
❌ FAILED
```

### After Fix:
```
Root Directory: backend-spring
Builder: NIXPACKS or Docker (with Java/Maven image)
Base Image: Java/Maven
Build Command: mvn clean package -DskipTests
✅ SUCCESS
```

---

## 📋 Railway Dashboard Settings

**Settings → Source:**

- **Root Directory:** `backend-spring` ⚠️ **MUST SET THIS!**
- **Builder:** `NIXPACKS` or `Auto-detect` (Railway will auto-detect)
- **Build Command:** (Leave empty - Railway auto-detects)
- **Start Command:** (Leave empty - Railway uses Procfile)

**Settings → Variables:**

Add these environment variables:

```
MONGODB_URI=mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack?retryWrites=true&w=majority
JWT_SECRET=OWrpHs62OL4m9bTGJynb0aru6gTN7lq4lEHMt7VHsa+QW0IXMyCrQ8Hv8CAv4XAYI7IN4i1+SGBhP0/rtcbgXw==
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=3001
```

---

## ✅ Files Created

1. **`backend-spring/Dockerfile`** ✅
   - Proper Dockerfile using Maven image
   - Will work if Railway uses Docker builder

2. **`railway.toml`** ✅
   - Railway configuration file
   - Specifies NIXPACKS builder

3. **`railway.json`** ✅
   - Railway configuration (JSON format)
   - Specifies NIXPACKS builder

---

## 🎯 Quick Fix (2 minutes)

1. **Open Railway Dashboard:**
   - https://railway.app
   - Select GAMESTACK project
   - Click on GAMESTACK service

2. **Set Root Directory:**
   - Settings → Source → Root Directory
   - Set to: `backend-spring`
   - Save

3. **Redeploy:**
   - Deployments → Redeploy
   - Wait for build
   - Verify success

---

## ✅ Checklist

- [ ] Root Directory set to `backend-spring` in Railway dashboard
- [ ] Builder is `NIXPACKS` or detects Java/Maven
- [ ] Build command: `mvn clean package -DskipTests`
- [ ] Start command: `java -jar target/gamestack-backend-1.0.0.jar`
- [ ] Environment variables set
- [ ] Build succeeds

---

## 🎉 Success!

Once root directory is set to `backend-spring`:

- ✅ Railway will detect Java/Maven from `pom.xml`
- ✅ Will use NIXPACKS builder (or Dockerfile with Maven image)
- ✅ Build will run: `mvn clean package -DskipTests`
- ✅ Backend will start: `java -jar target/gamestack-backend-1.0.0.jar`
- ✅ Deployment will succeed!

---

## 🚀 Next Steps

After fixing Railway:

1. **Verify Backend is Running:**
   - Check Railway dashboard
   - Verify build succeeded
   - Get backend URL: `https://your-app.railway.app`

2. **Deploy Frontend to Vercel:**
   - Deploy frontend to Vercel
   - Set root directory to `frontend`
   - Add `VITE_API_URL` environment variable

3. **Update CORS:**
   - Update `CORS_ALLOWED_ORIGINS` in Railway
   - Redeploy backend

---

## 📝 Summary

**The fix is:**

1. **Set Root Directory = `backend-spring` in Railway dashboard**
2. **Railway will detect Java/Maven**
3. **Build will succeed**

**That's it! Just set the root directory in Railway dashboard!**

---

**Time:** 2 minutes  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

