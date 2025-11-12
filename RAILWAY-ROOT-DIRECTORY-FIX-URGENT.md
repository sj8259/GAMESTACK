# 🚨 URGENT: Railway Root Directory Fix

## ❌ Current Error

Railway is detecting Node.js from root directory and trying to run Maven:

```
setup: nodejs_18, npm-9_x
install: npm ci
build: mvn clean package -DskipTests
ERROR: mvn: command not found
```

**Problem:** Railway is building from **root directory** (detects Node.js) instead of `backend-spring` (Java/Maven).

---

## ✅ SOLUTION: Set Root Directory in Railway Dashboard

### Step 1: Set Root Directory (CRITICAL!)

**In Railway Dashboard:**

1. **Go to Settings tab** (you're already there)
2. **Find "Add Root Directory"** button (under Source section)
3. **Click "Add Root Directory"**
4. **Type:** `backend-spring`
5. **Click "Update" or "Save"**

### Step 2: Verify Root Directory is Set

**After setting, you should see:**
- Root Directory: `backend-spring` (displayed in Settings)

### Step 3: Redeploy

1. **Go to "Deployments" tab**
2. **Click "Redeploy" button**
3. **Wait for build**

### Step 4: Verify Build

**After setting root directory, build logs should show:**

```
setup: jdk17, maven
install: mvn dependency:go-offline
build: mvn clean package -DskipTests
✅ SUCCESS
```

**Should NOT show:**
```
setup: nodejs_18, npm-9_x
install: npm ci
build: mvn (FAILS)
```

---

## 🔍 Why This Happens

### Railway's Detection Process:

1. **Without Root Directory:**
   - Railway starts from repository root
   - Finds `package.json` first → Detects Node.js
   - Installs Node.js and npm
   - Tries to run Maven → **FAILS** (Maven not installed)

2. **With Root Directory Set to `backend-spring`:**
   - Railway starts from `backend-spring/` directory
   - Finds `pom.xml` first → Detects Java/Maven
   - Installs Java 17 and Maven
   - Runs Maven build → **SUCCESS!**

---

## 📋 What to Change in Railway Dashboard

### In the Settings Page You're Viewing:

1. **Find "Add Root Directory" button**
   - Location: Under "Source" section
   - Click it

2. **Type:** `backend-spring`
   - Exactly as shown: `backend-spring`
   - No leading slash, no trailing slash

3. **Click "Update" or "Save"**

4. **Verify it's set:**
   - You should see: `Root Directory: backend-spring`

---

## ✅ After Setting Root Directory

**Railway will:**
- ✅ Start from `backend-spring/` directory
- ✅ Detect `pom.xml` (Java/Maven project)
- ✅ Install Java 17 and Maven
- ✅ Build with: `mvn clean package -DskipTests`
- ✅ Start with: `java -jar target/gamestack-backend-1.0.0.jar`
- ✅ Deploy successfully!

---

## 🎯 Quick Fix

**In Railway Dashboard Settings:**

1. **Click "Add Root Directory"**
2. **Type:** `backend-spring`
3. **Click "Update"**
4. **Go to Deployments → Redeploy**

**That's it!**

---

## 📝 Files Updated

I've also updated the config files to include `rootDirectory`:

- ✅ `railway.toml` - Added `rootDirectory = "backend-spring"`
- ✅ `railway.json` - Added `"rootDirectory": "backend-spring"`
- ✅ `backend-spring/nixpacks.toml` - Explicit Java/Maven configuration

**But the dashboard setting is still required!**

---

## ✅ Checklist

- [ ] Root Directory set to `backend-spring` in Railway dashboard
- [ ] Root Directory shows: `backend-spring` in Settings
- [ ] Redeploy triggered
- [ ] Build logs show: `setup: jdk17, maven` (NOT `nodejs_18`)
- [ ] Build succeeds

---

## 🎉 Success!

Once root directory is set to `backend-spring`:

**Before:**
```
setup: nodejs_18, npm-9_x
install: npm ci
build: mvn (FAILS - mvn not found)
❌ FAILED
```

**After:**
```
setup: jdk17, maven
install: mvn dependency:go-offline
build: mvn clean package -DskipTests
✅ SUCCESS
```

---

## 🚀 Next Steps

1. **Set Root Directory in Railway dashboard** (2 minutes)
2. **Redeploy** (5 minutes)
3. **Verify build succeeds**
4. **Deploy frontend to Vercel**

---

**The key fix: Set Root Directory = `backend-spring` in Railway dashboard!**

---

**Time:** 2 minutes  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

