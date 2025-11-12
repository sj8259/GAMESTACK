# 🔧 Railway Root Directory Fix - URGENT

## ❌ Current Error

Railway is building from the **root directory** instead of `backend-spring`:

```
> gamestack@1.0.0 build
> cd frontend && npm run build
sh: 1: vite: not found
```

**Why:** Railway detected the root `package.json` and is trying to build the **frontend**, but this is the **backend** deployment!

---

## ✅ Fix: Set Root Directory in Railway Dashboard

### Step 1: Open Railway Dashboard

1. Go to: https://railway.app
2. Login to your account
3. Click on your **GAMESTACK** project

### Step 2: Open Service Settings

1. Click on the **GAMESTACK** service (the one that's failing)
2. Click on **"Settings"** tab (top right)

### Step 3: Set Root Directory

1. Scroll down to **"Source"** section
2. Find **"Root Directory"** setting
3. Click **"Edit"** or **"Change"**
4. Enter: `backend-spring`
5. Click **"Save"** or **"Update"**

### Step 4: Verify Build Configuration

After setting root directory, verify:
- **Build Command:** `mvn clean package -DskipTests`
- **Start Command:** `java -jar target/gamestack-backend-1.0.0.jar`
- Railway should detect it's a Java/Maven project

### Step 5: Redeploy

1. Go back to **"Deployments"** tab
2. Click **"Redeploy"** button
3. Or push a new commit to GitHub
4. Wait for build to complete

### Step 6: Verify Build

Check build logs - you should see:
```
mvn clean package -DskipTests
[INFO] Building jar: target/gamestack-backend-1.0.0.jar
[INFO] BUILD SUCCESS
```

**You should NOT see:**
```
npm run build
vite: not found
```

---

## 📋 Screenshot Guide

1. **Railway Dashboard:**
   - Go to https://railway.app
   - Select your project

2. **Service Settings:**
   - Click on GAMESTACK service
   - Click "Settings" tab

3. **Root Directory:**
   - Find "Root Directory" in Source section
   - Set to: `backend-spring`
   - Save

4. **Redeploy:**
   - Go to "Deployments" tab
   - Click "Redeploy"
   - Wait for build

---

## 🔍 How to Verify Root Directory is Set

After setting root directory:

1. **Check Settings:**
   - Go to Settings → Source
   - Root Directory should show: `backend-spring`

2. **Check Build Logs:**
   - Should see: `mvn clean package -DskipTests`
   - Should NOT see: `npm run build`

3. **Check Build Success:**
   - Build should complete successfully
   - Backend should start: `java -jar target/gamestack-backend-1.0.0.jar`

---

## ⚠️ Important Notes

1. **Root Directory MUST be `backend-spring`:**
   - This tells Railway to build from the backend directory
   - Not from the root directory

2. **Backend vs Frontend:**
   - **Backend (Railway):** Java/Maven in `backend-spring/`
   - **Frontend (Vercel):** React/Vite in `frontend/`
   - They are separate deployments!

3. **Don't Build Frontend in Railway:**
   - Frontend should be deployed to **Vercel**
   - Backend should be deployed to **Railway**

---

## ✅ Checklist

- [ ] Root Directory set to `backend-spring` in Railway
- [ ] Build command: `mvn clean package -DskipTests`
- [ ] Start command: `java -jar target/gamestack-backend-1.0.0.jar`
- [ ] Environment variables set:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `CORS_ALLOWED_ORIGINS`
  - [ ] `PORT`
- [ ] Build succeeds
- [ ] Backend starts successfully

---

## 🎉 Success!

Once root directory is set to `backend-spring`:
1. Railway will detect Java/Maven project
2. Build will run: `mvn clean package -DskipTests`
3. Backend will start: `java -jar target/gamestack-backend-1.0.0.jar`
4. Deployment will succeed!

---

## 🚀 Next Steps

After fixing Railway:
1. Verify backend is running
2. Get backend URL: `https://your-app.railway.app`
3. Deploy frontend to Vercel
4. Update `VITE_API_URL` in Vercel
5. Update `CORS_ALLOWED_ORIGINS` in Railway

---

**The key fix: Root Directory = `backend-spring` in Railway settings!**

---

**Time:** 2 minutes  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

