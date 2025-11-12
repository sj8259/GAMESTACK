# 🚨 Railway Docker Error - URGENT FIX

## ❌ Current Error

Railway is building with Docker using Node.js image, but trying to run Maven:

```
RUN npm ci
RUN mvn clean package -DskipTests
/bin/bash: line 1: mvn: command not found
```

**Root Cause:** Railway is building from **root directory** instead of `backend-spring` directory.

---

## ✅ IMMEDIATE FIX (2 minutes)

### Step 1: Set Root Directory in Railway Dashboard

**⚠️ CRITICAL: This MUST be done in Railway dashboard!**

1. **Go to Railway Dashboard:**
   - https://railway.app
   - Select your **GAMESTACK** project
   - Click on the **GAMESTACK** service (the failing one)

2. **Open Settings:**
   - Click **"Settings"** tab (top navigation)
   - Scroll to **"Source"** section

3. **Set Root Directory:**
   - Find **"Root Directory"** setting
   - Click **"Edit"** or **"Change"**
   - **Set to:** `backend-spring`
   - Click **"Save"**

4. **Verify Builder:**
   - After setting root directory, Railway should detect:
     - `pom.xml` in `backend-spring/`
     - Java/Maven project
     - Builder: `NIXPACKS` or `Auto-detect`
     - Should NOT be: `Docker`

5. **Redeploy:**
   - Go to **"Deployments"** tab
   - Click **"Redeploy"** button
   - Wait for build to complete

---

## 🔍 Why This Happens

### Railway's Detection Order:

1. **Checks root directory first:**
   - Finds `package.json` in root
   - Detects Node.js project
   - Tries to build with Node.js

2. **Reads railway.toml:**
   - But railway.toml says to build from `backend-spring`
   - Conflict: Root has Node.js, config says Java
   - Railway gets confused

3. **Tries to use Docker:**
   - Railway falls back to Docker
   - Uses Node.js image (because of root package.json)
   - Tries to run Maven → **FAILS!**

### Solution:

**Set Root Directory in Railway Dashboard:**
- Railway will start from `backend-spring/` directory
- Will find `pom.xml` first
- Will detect Java/Maven
- Will use NIXPACKS builder
- Will build correctly!

---

## 📋 What Railway Should Do (After Fix)

**Correct Build Process:**

1. **Start from `backend-spring/` directory:**
   - Railway reads from `backend-spring/`
   - Finds `pom.xml`
   - Detects Java/Maven project

2. **Use NIXPACKS Builder:**
   - NIXPACKS detects Java 17
   - Detects Maven
   - Installs Java and Maven

3. **Build with Maven:**
   - Runs: `mvn clean package -DskipTests`
   - Builds JAR file
   - Success!

4. **Start Application:**
   - Runs: `java -jar target/gamestack-backend-1.0.0.jar`
   - Application starts
   - Health check passes

---

## ✅ Checklist

- [ ] **Root Directory set to `backend-spring` in Railway dashboard** (CRITICAL!)
- [ ] Builder is `NIXPACKS` or `Auto-detect` (NOT Docker)
- [ ] Build command: `mvn clean package -DskipTests`
- [ ] Start command: `java -jar target/gamestack-backend-1.0.0.jar`
- [ ] Environment variables set
- [ ] Build succeeds

---

## 🎯 Quick Answer

**In Railway Dashboard:**

1. **Settings → Source → Root Directory:** `backend-spring`
2. **Save**
3. **Redeploy**
4. **Done!**

---

## 🚨 If Root Directory Setting Doesn't Work

### Alternative: Use Dockerfile

If Railway still tries to use Docker, I've created a proper Dockerfile:

**File:** `backend-spring/Dockerfile` (already created)

This Dockerfile:
- Uses Maven image for building
- Uses Java image for running
- Builds correctly
- Starts correctly

**To use Dockerfile:**

1. **In Railway Dashboard:**
   - Set Root Directory to `backend-spring`
   - Railway will detect `Dockerfile` in `backend-spring/`
   - Will use Docker build with Java/Maven image
   - Will build correctly!

---

## 🎉 Success!

Once root directory is set to `backend-spring`:

**Before:**
```
RUN npm ci (Node.js image)
RUN mvn clean package -DskipTests (FAILS - mvn not found)
❌ FAILED
```

**After:**
```
mvn clean package -DskipTests (Java/Maven image)
[INFO] BUILD SUCCESS
✅ SUCCESS
```

---

## 📝 Summary

**The fix is simple:**

1. **Set Root Directory = `backend-spring` in Railway dashboard**
2. **Railway will detect Java/Maven**
3. **Build will succeed**

**That's it! Just set the root directory in Railway dashboard!**

---

**Time:** 2 minutes  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

