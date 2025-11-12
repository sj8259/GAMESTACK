# 🔍 Check Railway Logs - Debugging Guide

## ❌ If App is Still Crashing

Please check the Railway logs and share the **exact error message**. Here's how:

### Step 1: Get Deployment Logs

1. Go to **Railway Dashboard**
2. Click on your project
3. Go to **Deployments** tab
4. Click on the **latest deployment**
5. Click on **Deployment Logs** (runtime logs, not build logs)
6. Scroll to the **bottom** (most recent errors)
7. Copy the **last 50-100 lines**

### Step 2: Common Error Patterns

**Share the error message if you see any of these:**

#### MongoDB Connection Error:
```
MongoSocketException: Unable to connect
```
**Fix:** Check `MONGODB_URI` environment variable

#### JWT Secret Error:
```
IllegalArgumentException: JWT secret is too short
```
**Fix:** Set `JWT_SECRET` to 64+ characters

#### Port Error:
```
Port 3001 is already in use
```
**Fix:** Railway sets PORT automatically - don't hardcode

#### Out of Memory:
```
OutOfMemoryError: Java heap space
```
**Fix:** Railway may need more resources

#### Mail Configuration Error:
```
MailAuthenticationException
```
**Fix:** Mail is now optional - shouldn't crash

#### Bean Creation Error:
```
Error creating bean with name 'javaMailSender'
```
**Fix:** Should be fixed with latest changes

---

## 📋 What to Share

Please share:

1. **Last 50 lines of Deployment Logs** (from Railway)
2. **Error message** (exact text)
3. **Environment Variables** (names only, not values):
   - Which variables are set?
   - Which are missing?

---

## ✅ Quick Checklist

Before sharing logs, verify:

- [ ] `MONGODB_URI` is set in Railway Variables
- [ ] `JWT_SECRET` is set in Railway Variables (64+ characters)
- [ ] Root Directory = `backend-spring` in Railway Settings
- [ ] Latest code is pushed to GitHub
- [ ] Railway has redeployed after latest push

---

## 🚀 After Sharing Logs

Once you share the logs, I can:
1. Identify the exact error
2. Provide a specific fix
3. Update the code if needed

**The logs will tell us exactly what's wrong!** 🔍

