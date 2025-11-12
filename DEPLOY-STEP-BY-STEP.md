# 🚀 Complete Deployment Guide - Step by Step

## ✅ Pre-Deployment Checklist

- [x] Code is ready
- [x] MongoDB Atlas connection string ready
- [x] JWT secret generated
- [x] Configuration files updated
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel

---

## 📦 Step 1: Push Code to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Prepare for deployment: Add Railway and Vercel configs"

# Push to GitHub
git push origin main
```

**Or I can do this for you!** Just say "push to GitHub".

---

## 🚂 Step 2: Deploy Backend to Railway

### 2.1 Create Railway Project

1. Go to https://railway.app
2. Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Select your `gamestack` repository
6. Railway will start deploying (it will fail first - that's OK!)

### 2.2 Configure Root Directory

1. Go to **Settings** tab
2. Find **"Root Directory"** section
3. Click **"Add Root Directory"**
4. Type: `backend-spring`
5. Click **"Update"**

### 2.3 Add Environment Variables

1. Go to **Variables** tab
2. Click **"New Variable"** for each:

   **Variable 1:**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack`

   **Variable 2:**
   - Name: `JWT_SECRET`
   - Value: `dn7YSEYE2BXu7X2BcVCkGzIgOR6rlOqeYwg47O0nGhQVeXDhLd3qy25yGLohwnT9dkSVCcxsQhH4hLd4sSqYmA==`

   **Variable 3:**
   - Name: `CORS_ALLOWED_ORIGINS`
   - Value: `http://localhost:5173,http://localhost:3000` (we'll update this later)

   **Variable 4 (Optional):**
   - Name: `PORT`
   - Value: `3001`

### 2.4 Redeploy

1. Go to **Deployments** tab
2. Click **"Redeploy"** (or wait for auto-deploy)
3. Watch the build logs
4. Wait for deployment to complete

### 2.5 Get Backend URL

1. Go to **Settings** tab
2. Find **"Domains"** section
3. Click **"Generate Domain"** (or use the default)
4. Copy the URL (e.g., `https://gamestack-backend-production.up.railway.app`)
5. **Save this URL!** You'll need it for frontend

### 2.6 Test Backend

Open in browser: `https://your-backend-url.railway.app/api/health`

Should return: `{"status":"UP"}`

---

## ▲ Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Project

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your `gamestack` repository
5. Click **"Import"**

### 3.2 Configure Project Settings

1. **Root Directory:** Click **"Edit"** → Set to `frontend`
2. **Framework Preset:** Vite (should auto-detect)
3. **Build Command:** `npm run build` (should auto-detect)
4. **Output Directory:** `dist` (should auto-detect)

### 3.3 Add Environment Variable

1. Scroll down to **"Environment Variables"**
2. Click **"Add"**
3. Name: `VITE_API_URL`
4. Value: `https://your-backend-url.railway.app/api` (use the URL from Step 2.5)
5. Click **"Save"**

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Vercel will show you the deployment URL

### 3.5 Get Frontend URL

1. After deployment, copy the URL (e.g., `https://gamestack.vercel.app`)
2. **Save this URL!** You'll need it for CORS update

---

## 🔄 Step 4: Update CORS in Railway

1. Go back to Railway Dashboard
2. Go to **Variables** tab
3. Find `CORS_ALLOWED_ORIGINS` variable
4. Click **"Edit"**
5. Update value to: `https://your-frontend-url.vercel.app` (use URL from Step 3.5)
6. Click **"Update"**
7. Go to **Deployments** tab
8. Click **"Redeploy"**

---

## ✅ Step 5: Test Everything!

### Test Backend
- Health check: `https://your-backend-url.railway.app/api/health`
- API info: `https://your-backend-url.railway.app/`

### Test Frontend
- Open: `https://your-frontend-url.vercel.app`
- Try to register/login
- Check if API calls work

### Test Full Flow
1. Register a new user
2. Login
3. Access dashboard
4. Try a lesson

---

## 🎉 Success!

Your app should now be live!

**Frontend:** `https://your-frontend-url.vercel.app`  
**Backend:** `https://your-backend-url.railway.app`

---

## 🐛 Troubleshooting

### Backend Issues

**Build fails with "mvn: command not found":**
- ✅ Make sure Root Directory is set to `backend-spring` in Railway Settings

**CORS errors:**
- ✅ Make sure `CORS_ALLOWED_ORIGINS` includes your frontend URL
- ✅ Redeploy backend after updating CORS

**Database connection fails:**
- ✅ Check `MONGODB_URI` is correct
- ✅ Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Frontend Issues

**API calls fail:**
- ✅ Check `VITE_API_URL` is set correctly
- ✅ Make sure backend URL is accessible
- ✅ Check browser console for errors

**Build fails:**
- ✅ Make sure Root Directory is set to `frontend` in Vercel
- ✅ Check build logs for specific errors

---

## 📞 Need Help?

Check these files:
- `DEPLOYMENT-CREDENTIALS.md` - All environment variables
- `RAILWAY-ROOT-DIRECTORY-FIX-URGENT.md` - Railway setup guide
- `START-HERE-DEPLOY.md` - Quick reference

---

**Ready to deploy!** 🚀

