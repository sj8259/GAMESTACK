# 🚀 Automated Deployment Guide

This guide will help you deploy GameStack with minimal manual steps.

---

## ⚠️ Important: Account Creation Required

You'll need to create accounts on these platforms manually (they require email verification):
1. **MongoDB Atlas** - https://www.mongodb.com/cloud/atlas/register
2. **Railway** - https://railway.app
3. **Vercel** - https://vercel.com

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:
- ✅ GitHub account (for deploying from GitHub)
- ✅ GitHub repository created for this project
- ✅ Code pushed to GitHub

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare GitHub Repository

```bash
# Navigate to project
cd /Volumes/THUNDERBOY/gamestack

# Check git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Prepare for deployment: Add deployment configs"

# Push to GitHub (replace with your repository URL)
git push origin main
```

---

### Step 2: Setup MongoDB Atlas (5 minutes)

**Manual Steps Required:**

1. **Go to MongoDB Atlas:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Click "Try Free"
   - Sign up with email or Google

2. **Create Cluster:**
   - Click "Build a Database"
   - Select "FREE" (M0) tier
   - Choose a cloud provider (AWS recommended)
   - Choose a region closest to you
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Authentication Method: "Password"
   - Username: `gamestack`
   - Password: Click "Autogenerate Secure Password" (copy this!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Select "Connect your application"
   - Copy the connection string:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` with `gamestack`
   - Replace `<password>` with your database user password
   - Add database name: `/gamestack?retryWrites=true&w=majority`
   - Final string should look like:
     ```
     mongodb+srv://gamestack:yourpassword@cluster0.xxxxx.mongodb.net/gamestack?retryWrites=true&w=majority
     ```
   - **SAVE THIS CONNECTION STRING!**

---

### Step 3: Deploy Backend to Railway (10 minutes)

**Manual Steps Required:**

1. **Go to Railway:**
   - Visit: https://railway.app
   - Click "Start a New Project"
   - Sign up with GitHub (recommended)

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub account
   - Select your `gamestack` repository
   - Click "Deploy"

3. **Configure Backend:**
   - Wait for Railway to detect the project
   - Click on the service
   - Go to "Settings" tab
   - Find "Source" section
   - Set "Root Directory" to: `backend-spring`
   - Click "Save"

4. **Add Environment Variables:**
   - Go to "Variables" tab
   - Click "New Variable"
   - Add the following variables:
     
     **MONGODB_URI:**
     ```
     mongodb+srv://gamestack:yourpassword@cluster0.xxxxx.mongodb.net/gamestack?retryWrites=true&w=majority
     ```
     (Replace with your actual connection string)
     
     **JWT_SECRET:**
     ```
     your-secure-jwt-secret-key-64-characters-minimum-generate-a-random-string-here
     ```
     (Generate using: `openssl rand -base64 64`)
     
     **CORS_ALLOWED_ORIGINS:**
     ```
     https://your-frontend.vercel.app
     ```
     (Update this after deploying frontend)
     
     **PORT:**
     ```
     3001
     ```
     (Railway usually sets this automatically)

5. **Deploy:**
   - Railway will automatically detect changes and redeploy
   - Wait for deployment to complete (5-10 minutes)
   - Check "Deployments" tab for status

6. **Get Backend URL:**
   - Go to "Settings" → "Domains"
   - Copy your backend URL: `https://your-app.railway.app`
   - **SAVE THIS URL!**

7. **Test Backend:**
   ```bash
   curl https://your-app.railway.app/api/health
   ```
   Should return: `{"status":"UP"}`

---

### Step 4: Deploy Frontend to Vercel (5 minutes)

**Manual Steps Required:**

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click "Sign Up"
   - Sign up with GitHub (recommended)

2. **Create New Project:**
   - Click "Add New" → "Project"
   - Import your `gamestack` repository
   - Click "Import"

3. **Configure Frontend:**
   - Framework Preset: `Vite` (auto-detected)
   - Root Directory: `frontend` (click "Edit" to change)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Add Environment Variables:**
   - Go to "Environment Variables"
   - Click "Add"
   - Key: `VITE_API_URL`
   - Value: `https://your-app.railway.app/api`
   - (Replace with your actual Railway backend URL)
   - Click "Save"

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (2-5 minutes)
   - Check deployment status

6. **Get Frontend URL:**
   - After deployment, copy your frontend URL: `https://your-app.vercel.app`
   - **SAVE THIS URL!**

---

### Step 5: Update Backend CORS (2 minutes)

**Manual Steps Required:**

1. **Go back to Railway:**
   - Open your backend project
   - Go to "Variables" tab

2. **Update CORS_ALLOWED_ORIGINS:**
   - Find `CORS_ALLOWED_ORIGINS` variable
   - Update value to: `https://your-app.vercel.app`
   - (Replace with your actual Vercel frontend URL)
   - Click "Save"

3. **Redeploy:**
   - Railway will automatically redeploy
   - Wait for redeployment to complete (2-5 minutes)

---

### Step 6: Test Deployment (3 minutes)

1. **Test Frontend:**
   - Open your frontend URL: `https://your-app.vercel.app`
   - Check browser console for errors
   - Test registration/login
   - Test API calls

2. **Test Backend:**
   ```bash
   curl https://your-app.railway.app/api/health
   ```
   Should return: `{"status":"UP"}`

3. **Test Database:**
   - Go to MongoDB Atlas
   - Go to "Database" → "Browse Collections"
   - Check if collections are created
   - Verify data is being saved

---

## 🔧 Troubleshooting

### Backend Not Starting
- Check Railway logs: Go to "Deployments" → Click on deployment → View logs
- Verify environment variables are set correctly
- Check MongoDB connection string format
- Verify JWT_SECRET is set

### Frontend Not Loading
- Check Vercel logs: Go to "Deployments" → Click on deployment → View logs
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors
- Verify backend is running

### CORS Errors
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check backend logs for CORS errors
- Verify frontend URL is correct
- Make sure backend is redeployed after updating CORS

### Database Connection Failed
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify connection string format
- Check database user credentials
- Verify network access is allowed

---

## 📝 Environment Variables Summary

### Backend (Railway)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gamestack?retryWrites=true&w=majority
JWT_SECRET=your-secure-secret-64-characters
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=3001
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.railway.app/api
```

---

## ✅ Deployment Checklist

- [ ] GitHub repository created and code pushed
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created
- [ ] Database user created
- [ ] IP whitelist configured
- [ ] Connection string obtained
- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] Backend environment variables set
- [ ] Backend URL obtained
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables set
- [ ] Frontend URL obtained
- [ ] CORS updated in backend
- [ ] Application tested
- [ ] Deployment successful!

---

## 🎉 Success!

Your GameStack application is now live!

- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-app.railway.app/api`
- **Database:** MongoDB Atlas (cloud)

---

## 📚 Additional Resources

- **Full Deployment Guide:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Quick Start Guide:** [DEPLOYMENT-QUICKSTART.md](DEPLOYMENT-QUICKSTART.md)
- **Deployment Script:** [DEPLOY-SCRIPT.md](DEPLOY-SCRIPT.md)
- **Summary:** [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md)

---

**Time to Deploy:** ~30 minutes  
**Cost:** $0 (FREE)  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

