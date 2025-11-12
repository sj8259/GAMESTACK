# ⚡ Railway Quick Fix

## 🎯 The Problem

Railway is trying to build the **frontend** instead of the **backend** because:
- Root directory is not set to `backend-spring`
- Railway detected root `package.json` and tried to build frontend
- But frontend dependencies aren't installed, so `vite: not found`

## ✅ The Solution (2 minutes)

### Step 1: Set Root Directory in Railway

1. **Go to Railway:**
   - https://railway.app
   - Click on your **GAMESTACK** project

2. **Open Settings:**
   - Click **"Settings"** tab
   - Scroll to **"Source"** section

3. **Set Root Directory:**
   - Find **"Root Directory"**
   - Click **"Edit"**
   - Set to: `backend-spring`
   - Click **"Save"**

### Step 2: Redeploy

1. **Trigger New Build:**
   - Click **"Redeploy"** button
   - Or push a new commit to GitHub
   - Railway will rebuild with correct root directory

2. **Verify Build:**
   - Check build logs
   - Should see: `mvn clean package -DskipTests`
   - Should NOT see: `npm run build`
   - Build should succeed!

---

## ✅ Checklist

- [ ] Root Directory = `backend-spring` in Railway
- [ ] Build command = `mvn clean package -DskipTests`
- [ ] Start command = `java -jar target/gamestack-backend-1.0.0.jar`
- [ ] Environment variables set
- [ ] Build succeeds

---

## 🎉 Done!

Once root directory is set, Railway will:
1. Detect Java/Maven project
2. Build backend correctly
3. Deploy successfully

**That's it! Just set the root directory to `backend-spring`!**

---

**Time:** 2 minutes  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

