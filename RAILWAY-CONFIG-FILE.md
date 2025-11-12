# 📋 Railway Configuration File Guide

## 🎯 What is railway.toml?

Railway allows you to configure build and deployment settings through a `railway.toml` file instead of using the dashboard. This is more reliable and can be committed to git.

---

## ✅ Configuration File Created

I've created `railway.toml` in the root directory with the correct settings for your backend deployment.

---

## 📝 What to Fill in Railway Dashboard

If Railway asks you to configure build settings, here's what to fill:

### Option 1: Use Config File (Recommended)

**Railway will automatically detect `railway.toml` if it exists.**

The file is already created at: `/Volumes/THUNDERBOY/gamestack/railway.toml`

**Content:**
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "java -jar target/gamestack-backend-1.0.0.jar"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### Option 2: Manual Configuration in Dashboard

If you prefer to configure in the dashboard:

1. **Root Directory:**
   - Set to: `backend-spring`

2. **Build Command:**
   - Set to: `mvn clean package -DskipTests`
   - Or leave empty (Railway will auto-detect from `pom.xml`)

3. **Start Command:**
   - Set to: `java -jar target/gamestack-backend-1.0.0.jar`

4. **Buildpack/Builder:**
   - Select: `NIXPACKS` or `Auto-detect`
   - Railway will detect Java/Maven from `pom.xml`

---

## 🔧 Railway Configuration Options

### In Railway Dashboard:

**Build Settings:**
- **Root Directory:** `backend-spring` (CRITICAL!)
- **Build Command:** `mvn clean package -DskipTests` (auto-detected)
- **Start Command:** `java -jar target/gamestack-backend-1.0.0.jar` (from Procfile)

**Deployment Settings:**
- **Restart Policy:** `ON_FAILURE`
- **Max Retries:** `10`

**Environment:**
- **Variables:** Set in "Variables" tab (not in config file)

---

## 📋 Complete Configuration

### railway.toml (Root Directory)

```toml
# Railway Configuration File
# This file configures Railway to build and deploy the backend from backend-spring directory

[build]
builder = "NIXPACKS"

[deploy]
startCommand = "java -jar target/gamestack-backend-1.0.0.jar"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### backend-spring/railway.json (Alternative)

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "mvn clean package -DskipTests"
  },
  "deploy": {
    "startCommand": "java -jar target/gamestack-backend-1.0.0.jar",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 🎯 Best Practice: Use Root Directory Setting

**Recommended Approach:**

1. **In Railway Dashboard:**
   - Go to Settings → Source
   - Set **Root Directory:** `backend-spring`
   - Leave build/start commands empty (Railway will auto-detect)

2. **Railway will automatically:**
   - Detect Java/Maven from `pom.xml`
   - Build with: `mvn clean package -DskipTests`
   - Start with: `java -jar target/gamestack-backend-1.0.0.jar` (from Procfile)

---

## 🔍 What Railway Auto-Detects

When root directory is set to `backend-spring`:

1. **Detects `pom.xml`:**
   - Recognizes Java/Maven project
   - Uses Maven to build

2. **Detects `Procfile`:**
   - Reads start command: `web: java -jar target/gamestack-backend-1.0.0.jar`

3. **Detects Java Version:**
   - From `pom.xml`: `<java.version>17</java.version>`
   - Uses Java 17

4. **Builds and Deploys:**
   - Runs: `mvn clean package -DskipTests`
   - Starts: `java -jar target/gamestack-backend-1.0.0.jar`

---

## 📝 Step-by-Step Configuration

### Step 1: Set Root Directory (CRITICAL!)

**In Railway Dashboard:**
1. Go to Settings → Source
2. Find "Root Directory"
3. Set to: `backend-spring`
4. Click "Save"

### Step 2: Verify Build Settings

**Railway should auto-detect:**
- Build Command: `mvn clean package -DskipTests`
- Start Command: `java -jar target/gamestack-backend-1.0.0.jar`
- Builder: `NIXPACKS`

### Step 3: Set Environment Variables

**In Railway Dashboard:**
1. Go to Variables tab
2. Add variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CORS_ALLOWED_ORIGINS`
   - `PORT` (auto-set)

### Step 4: Deploy

1. Go to Deployments tab
2. Click "Redeploy"
3. Wait for build
4. Check build logs

---

## ✅ Recommended Settings

### In Railway Dashboard:

**Root Directory:** `backend-spring` (MUST SET THIS!)

**Build Command:** Leave empty (Railway auto-detects)

**Start Command:** Leave empty (Railway uses Procfile)

**Builder:** `NIXPACKS` or `Auto-detect`

**Environment Variables:**
```
MONGODB_URI=mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack?retryWrites=true&w=majority
JWT_SECRET=OWrpHs62OL4m9bTGJynb0aru6gTN7lq4lEHMt7VHsa+QW0IXMyCrQ8Hv8CAv4XAYI7IN4i1+SGBhP0/rtcbgXw==
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=3001
```

---

## 🎯 Summary

**What to Fill:**

1. **Root Directory:** `backend-spring` (CRITICAL!)
2. **Build Command:** Leave empty (auto-detected)
3. **Start Command:** Leave empty (uses Procfile)
4. **Environment Variables:** Set in Variables tab

**Or use config file:**
- Commit `railway.toml` to git
- Set Root Directory to `backend-spring` in dashboard
- Railway will use config file settings

---

## 🚀 Quick Answer

**In Railway Dashboard, fill in:**

1. **Root Directory:** `backend-spring`
2. **Build Command:** (Leave empty - Railway auto-detects)
3. **Start Command:** (Leave empty - Railway uses Procfile)
4. **Environment Variables:** (Set in Variables tab)

**The most important setting is: Root Directory = `backend-spring`!**

---

**Happy Deploying! 🚀**

