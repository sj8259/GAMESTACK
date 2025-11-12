# 🔧 Railway Build Error Fix

## ❌ Error Identified

The error shows Railway is trying to build from the **root directory** instead of `backend-spring`:

```
> gamestack@1.0.0 build
> cd frontend && npm run build
sh: 1: vite: not found
```

**Problem:** Railway detected the root `package.json` and is trying to build the frontend, but this is the **backend** deployment.

## ✅ Solution: Set Root Directory in Railway

### Step 1: Fix Railway Configuration

1. **Go to Railway Dashboard:**
   - Open your project: https://railway.app
   - Click on the **GAMESTACK** service

2. **Set Root Directory:**
   - Go to **Settings** tab
   - Find **"Source"** section
   - Look for **"Root Directory"** setting
   - Set it to: `backend-spring`
   - Click **"Save"**

3. **Verify Build Configuration:**
   - Railway should detect it's a Java/Maven project
   - Build command should be: `mvn clean package -DskipTests`
   - Start command should be: `java -jar target/gamestack-backend-1.0.0.jar`

### Step 2: Update Railway Configuration (Optional)

If Railway still doesn't detect correctly, you can:

1. **Use Nixpacks Configuration:**
   - File: `backend-spring/nixpacks.toml` (already created)
   - This explicitly tells Railway this is a Java project

2. **Verify railway.json:**
   - File: `backend-spring/railway.json` (already exists)
   - Contains correct build and start commands

### Step 3: Redeploy

1. **Trigger New Deployment:**
   - Go to Railway dashboard
   - Click "Redeploy" or push a new commit
   - Railway will rebuild with the correct root directory

2. **Check Build Logs:**
   - Should see: `mvn clean package -DskipTests`
   - Should NOT see: `npm run build`
   - Build should complete successfully

---

## 🔍 How to Verify

### Before Fix:
```
> gamestack@1.0.0 build
> cd frontend && npm run build
sh: 1: vite: not found
```

### After Fix:
```
mvn clean package -DskipTests
[INFO] Building jar: target/gamestack-backend-1.0.0.jar
[INFO] BUILD SUCCESS
```

---

## 📋 Railway Settings Checklist

- [ ] Root Directory set to `backend-spring`
- [ ] Build command: `mvn clean package -DskipTests`
- [ ] Start command: `java -jar target/gamestack-backend-1.0.0.jar`
- [ ] Environment variables set:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `CORS_ALLOWED_ORIGINS`
  - [ ] `PORT` (auto-set by Railway)

---

## 🚀 Quick Fix Steps

1. **Go to Railway Dashboard:**
   - https://railway.app
   - Select your project
   - Click on GAMESTACK service

2. **Go to Settings:**
   - Click "Settings" tab
   - Find "Root Directory"
   - Set to: `backend-spring`
   - Click "Save"

3. **Redeploy:**
   - Click "Redeploy" or push new commit
   - Wait for build to complete
   - Check build logs

---

## ⚠️ Important Notes

1. **Root Directory Must Be Set:**
   - Railway needs to know to build from `backend-spring`, not root
   - This is the #1 cause of this error

2. **Don't Deploy Frontend to Railway:**
   - Frontend should be deployed to **Vercel**, not Railway
   - Railway is only for the backend (Java/Spring Boot)

3. **Backend vs Frontend:**
   - **Backend (Railway):** Java/Maven project in `backend-spring/`
   - **Frontend (Vercel):** React/Vite project in `frontend/`

---

## ✅ After Fix

Once the root directory is set correctly:
- Railway will detect Java/Maven project
- Build will run: `mvn clean package -DskipTests`
- Backend will start: `java -jar target/gamestack-backend-1.0.0.jar`
- Deployment will succeed!

---

## 🎉 Success!

After setting the root directory to `backend-spring`, the build should work!

**The key is: Root Directory = `backend-spring` in Railway settings!**

---

**Next Steps:**
1. Set root directory in Railway
2. Redeploy
3. Verify build succeeds
4. Deploy frontend to Vercel separately

---

**Happy Deploying! 🚀**

