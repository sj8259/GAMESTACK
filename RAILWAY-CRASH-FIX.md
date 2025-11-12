# 🔧 Railway Crash Fix Guide

## ❌ Common Crash Causes

### 1. Missing Required Environment Variables

**Required Variables:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret (64+ characters)

**Optional Variables (won't crash if missing):**
- `MAIL_USERNAME` - Email service (optional)
- `MAIL_PASSWORD` - Email service (optional)
- `GOOGLE_CLIENT_ID` - OAuth (optional)
- `GOOGLE_CLIENT_SECRET` - OAuth (optional)
- `CORS_ALLOWED_ORIGINS` - CORS origins (has defaults)

---

## ✅ Fix Applied

I've made the application more resilient:

1. **Email Service** - Now optional, won't crash if not configured
2. **OAuth** - Disabled by default if credentials not provided
3. **Better error handling** - Logs errors instead of crashing

---

## 🔍 How to Diagnose Crashes

### Step 1: Check Railway Logs

1. Go to Railway Dashboard
2. Click on your project
3. Go to **Deployments** tab
4. Click on the latest deployment
5. Check **Deployment Logs** (runtime logs)

### Step 2: Look for Error Messages

**Common Errors:**

**MongoDB Connection Error:**
```
Exception in thread "main" com.mongodb.MongoSocketException
```
**Fix:** Check `MONGODB_URI` environment variable

**JWT Secret Error:**
```
java.lang.IllegalArgumentException: JWT secret is too short
```
**Fix:** Set `JWT_SECRET` to 64+ characters

**Port Already in Use:**
```
Port 3001 is already in use
```
**Fix:** Railway sets PORT automatically, don't hardcode it

**Out of Memory:**
```
java.lang.OutOfMemoryError
```
**Fix:** Railway may need more resources

---

## 📋 Required Environment Variables Checklist

**In Railway Dashboard → Variables:**

- [ ] `MONGODB_URI` = `mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack`
- [ ] `JWT_SECRET` = `dn7YSEYE2BXu7X2BcVCkGzIgOR6rlOqeYwg47O0nGhQVeXDhLd3qy25yGLohwnT9dkSVCcxsQhH4hLd4sSqYmA==`
- [ ] `CORS_ALLOWED_ORIGINS` = `http://localhost:5173,http://localhost:3000` (update after frontend deploy)
- [ ] `PORT` = (Railway sets this automatically, but you can set to `3001`)

**Optional (won't crash if missing):**
- [ ] `MAIL_USERNAME` = (optional - for email OTP)
- [ ] `MAIL_PASSWORD` = (optional - for email OTP)
- [ ] `GOOGLE_CLIENT_ID` = (optional - for OAuth)
- [ ] `GOOGLE_CLIENT_SECRET` = (optional - for OAuth)

---

## 🚀 Quick Fix Steps

### 1. Verify Environment Variables

**In Railway:**
1. Go to **Variables** tab
2. Verify all required variables are set
3. Check values are correct (no typos)

### 2. Check Build Logs

1. Go to **Deployments** tab
2. Click latest deployment
3. Check **Build Logs**
4. Should see: `[INFO] BUILD SUCCESS`

### 3. Check Deployment Logs

1. Go to **Deployments** tab
2. Click latest deployment
3. Check **Deployment Logs**
4. Look for error messages

### 4. Common Fixes

**If MongoDB connection fails:**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify network access in MongoDB Atlas

**If JWT errors:**
- Verify `JWT_SECRET` is set
- Make sure it's 64+ characters
- No special characters that need escaping

**If port errors:**
- Don't hardcode port in code
- Use `${PORT:3001}` (already configured)
- Railway sets PORT automatically

---

## 🔍 What the Logs Should Show

### Successful Startup:

```
=== Railway Startup Script ===
Current directory: /app
Found JAR file: target/gamestack-backend-1.0.0.jar
Starting application...

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

2025-11-12 ... Started GamestackApplication in X.XXX seconds
```

### If Crashing:

Look for the last error message before crash:
- MongoDB connection errors
- JWT configuration errors
- Port binding errors
- Missing environment variables

---

## ✅ After Fixing

1. **Redeploy** in Railway
2. **Check logs** - should see successful startup
3. **Test health endpoint:** `https://your-backend-url.railway.app/api/health`
4. Should return: `{"status":"UP"}`

---

## 📞 Still Crashing?

Share these details:

1. **Last 50 lines of Deployment Logs**
2. **Environment Variables** (names only, not values)
3. **Build Logs** (last 20 lines)
4. **Error message** (exact text)

This will help diagnose the exact issue!

---

**The app is now more resilient and won't crash from missing optional services!** 🚀

