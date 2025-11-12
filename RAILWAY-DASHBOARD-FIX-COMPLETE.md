# 🔧 Railway Dashboard Settings - Complete Fix Guide

## ❌ Current Problem

The service is crashing with:
```
Error: Unable to access jarfile target/gamestack-backend-1.0.0.jar
```

**Root Cause:** Railway is building from the repository root instead of `backend-spring` directory, so it's not finding the JAR file.

---

## ✅ SOLUTION: Set Root Directory in Railway Dashboard

### Step 1: Navigate to Service Settings

1. Go to Railway Dashboard: https://railway.app
2. Click on your project: **ample-joy**
3. Click on the service: **passionate-enjoyment**
4. Click on **Settings** tab (in the service navigation)

### Step 2: Set Root Directory

1. Scroll down to **"Source"** section
2. Find **"Root Directory"** heading
3. **Click on the empty area** below "Root Directory" heading
4. **Type:** `backend-spring`
5. **Press Enter** or click **Save/Update** button

**Important:** The Root Directory field might be empty. You need to add it manually.

### Step 3: Set Custom Start Command (if needed)

1. Scroll down to **"Deploy"** section
2. Find **"Custom Start Command"** heading
3. **Click on the empty area** below it
4. **Type:** `bash start.sh`
5. **Press Enter** or click **Save/Update** button

**Note:** This should already be set in `railway.json`, but you can verify it here.

### Step 4: Verify Settings

After setting, you should see:
- **Root Directory:** `backend-spring`
- **Custom Start Command:** `bash start.sh` (or from config file)

### Step 5: Redeploy

1. Go to **Deployments** tab
2. Click **"Redeploy"** button (or wait for auto-deploy)
3. Watch the build logs

---

## 🔍 What to Look For in Build Logs

**After setting Root Directory, build logs should show:**

```
setup: jdk17, maven  ✅ CORRECT!
install: mvn dependency:go-offline
build: mvn clean package -DskipTests
[INFO] BUILD SUCCESS
[INFO] Building jar: target/gamestack-backend-1.0.0.jar
```

**Should NOT show:**
```
setup: nodejs_18, npm-9_x  ❌ WRONG!
install: npm ci
build: mvn (FAILS - mvn not found)
```

---

## 🔍 What to Look For in Deployment Logs

**After setting Start Command, deployment logs should show:**

```
=== Railway Startup Script ===
Current directory: /app
Checking if target directory exists...
Target directory found!
Found JAR file: target/gamestack-backend-1.0.0.jar
Starting application...
```

**Should NOT show:**
```
Error: Unable to access jarfile target/gamestack-backend-1.0.0.jar
```

---

## 📋 Alternative: Use Railway Config File

If you can't set Root Directory in the dashboard, Railway should read it from the config file. Make sure:

1. **`railway.json`** exists in `backend-spring/` directory
2. **`railway.toml`** exists in root directory
3. Both have `rootDirectory = "backend-spring"`

**Current config files:**
- ✅ `railway.json` - Has `rootDirectory: "backend-spring"`
- ✅ `railway.toml` - Has `rootDirectory = "backend-spring"`
- ✅ `backend-spring/nixpacks.toml` - Has correct build config

**But Railway might need it set in dashboard too!**

---

## 🎯 Quick Checklist

- [ ] Root Directory = `backend-spring` in Railway Dashboard Settings
- [ ] Custom Start Command = `bash start.sh` (or from config)
- [ ] Build logs show: `setup: jdk17, maven` (NOT `nodejs_18`)
- [ ] Build logs show: `BUILD SUCCESS` and JAR file created
- [ ] Deployment logs show: Startup script running
- [ ] Deployment logs show: `Found JAR file: ...`

---

## 🚀 After Fixing

Once Root Directory is set:

1. **Redeploy** the service
2. **Check build logs** - should show Java/Maven setup
3. **Check deployment logs** - should show startup script
4. **Service should start successfully!**

---

## 📞 If Still Not Working

If Root Directory field is not editable or doesn't appear:

1. **Check if Railway Config File is being used:**
   - Look for "Railway Config File" section in Settings
   - Should show: `backend-spring/railway.json` or `railway.toml`

2. **Try adding Railway Config File path:**
   - Click "Add File Path" button
   - Enter: `railway.toml` or `backend-spring/railway.json`

3. **Verify the config file is in the repository:**
   - Check GitHub to ensure `railway.json` and `railway.toml` are committed

---

**The key fix: Set Root Directory = `backend-spring` in Railway Dashboard Settings!** 🎯

