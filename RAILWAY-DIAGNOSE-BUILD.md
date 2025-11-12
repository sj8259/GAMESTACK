# 🔍 Railway Build Diagnosis Guide

## ❌ Current Error

```
Error: Unable to access jarfile target/gamestack-backend-1.0.0.jar
```

This error means Railway can't find the JAR file. Let's diagnose why.

---

## 🔍 Step 1: Check Build Logs

**In Railway Dashboard:**

1. Go to **Deployments** tab
2. Click on the **latest deployment**
3. Look at **Build Logs** (NOT Deployment Logs)

### ✅ What to Look For:

**Good Build (Success):**
```
[INFO] BUILD SUCCESS
[INFO] Building jar: target/gamestack-backend-1.0.0.jar
[INFO] Replacing main artifact with repackaged archive
```

**Bad Build (Failure):**
```
[ERROR] BUILD FAILURE
[ERROR] Failed to execute goal...
```

**Wrong Builder (Problem):**
```
setup: nodejs_18, npm-9_x  ❌ WRONG!
install: npm ci
build: mvn (FAILS - mvn not found)
```

**Correct Builder:**
```
setup: jdk17, maven  ✅ CORRECT!
install: mvn dependency:go-offline
build: mvn clean package -DskipTests
```

---

## 🔍 Step 2: Check Root Directory

**In Railway Dashboard:**

1. Go to **Settings** tab
2. Check **Root Directory** field

**Should be:** `backend-spring`

**If it's empty or wrong:**
1. Click **"Add Root Directory"** or **"Edit"**
2. Type: `backend-spring`
3. Click **"Update"**
4. Go to **Deployments** → **Redeploy**

---

## 🔍 Step 3: Check Deployment Logs

**In Railway Dashboard:**

1. Go to **Deployments** tab
2. Click on the **latest deployment**
3. Look at **Deployment Logs** (runtime logs)

### With New Startup Script:

You should see:
```
=== Railway Startup Script ===
Current directory: /app
Listing current directory:
...
Looking for JAR files...
Checking target/ directory...
Found JAR file: target/gamestack-backend-1.0.0.jar
Starting application...
```

### If JAR Not Found:

You'll see:
```
ERROR: No JAR file found!
Directory structure:
...
All JAR files found:
...
Contents of current directory:
...
```

This diagnostic output will tell us exactly what's wrong!

---

## 🐛 Common Issues & Fixes

### Issue 1: Build Not Running

**Symptoms:**
- Build logs show Node.js setup instead of Java/Maven
- Error: `mvn: command not found`

**Fix:**
1. Go to **Settings** → **Root Directory**
2. Set to: `backend-spring`
3. **Redeploy**

---

### Issue 2: Build Failing

**Symptoms:**
- Build logs show: `[ERROR] BUILD FAILURE`
- Specific Maven errors

**Fix:**
- Check the error message in build logs
- Common issues:
  - Missing dependencies
  - Compilation errors
  - Network issues downloading dependencies

---

### Issue 3: JAR Not in Expected Location

**Symptoms:**
- Build succeeds
- Deployment fails: "Unable to access jarfile"

**Fix:**
- The new startup script will find the JAR automatically
- Check deployment logs for diagnostic output
- The script searches multiple locations

---

### Issue 4: Changes Not Deployed

**Symptoms:**
- Still seeing old error messages
- Startup script diagnostics not appearing

**Fix:**
1. **Push changes to GitHub:**
   ```bash
   git push origin main
   ```

2. **Wait for auto-deploy** (or manually redeploy)

3. **Check deployment logs** - should see new diagnostic output

---

## ✅ Verification Checklist

- [ ] Root Directory set to `backend-spring` in Railway Settings
- [ ] Build logs show: `setup: jdk17, maven` (NOT `nodejs_18`)
- [ ] Build logs show: `[INFO] BUILD SUCCESS`
- [ ] Build logs show: `Building jar: target/gamestack-backend-1.0.0.jar`
- [ ] Deployment logs show startup script diagnostics
- [ ] Deployment logs show: `Found JAR file: ...`
- [ ] Application starts successfully

---

## 🚀 Next Steps

1. **Check Build Logs** - Verify build is succeeding
2. **Check Root Directory** - Must be `backend-spring`
3. **Push Latest Changes** - If not already pushed
4. **Redeploy** - Wait for new deployment
5. **Check Deployment Logs** - Look for diagnostic output

---

## 📋 What to Share

If still having issues, share:

1. **Build Logs** (last 50 lines)
2. **Deployment Logs** (last 50 lines)
3. **Settings Screenshot** (showing Root Directory)
4. **Railway.toml contents** (if visible in dashboard)

This will help diagnose the exact issue!

---

**The improved startup script will provide detailed diagnostics to help identify the problem!** 🔍

