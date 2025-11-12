# GameStack Deployment Script 🚀

Interactive deployment script to deploy GameStack using FREE hosting services.

---

## 🎯 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ MongoDB Atlas account (or create one)
- ✅ Vercel account (or create one)
- ✅ Railway account (or create one)

---

## 📋 Step-by-Step Deployment

### Step 1: Prepare GitHub Repository

```bash
# Navigate to project directory
cd /Volumes/THUNDERBOY/gamestack

# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Prepare for deployment: Add deployment configs and environment variable support"

# Push to GitHub (if remote exists)
git push origin main
```

**If you don't have a GitHub repository:**
```bash
# Create a new repository on GitHub
# Then run:
git remote add origin https://github.com/yourusername/gamestack.git
git branch -M main
git push -u origin main
```

---

### Step 2: Setup MongoDB Atlas (Free)

1. **Go to MongoDB Atlas:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free account

2. **Create Cluster:**
   - Click "Build a Database"
   - Select "FREE" (M0) tier
   - Choose a cloud provider and region
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `gamestack`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Select "Connect your application"
   - Copy the connection string:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your credentials
   - Add database name: `/gamestack?retryWrites=true&w=majority`
   - Final string:
     ```
     mongodb+srv://gamestack:yourpassword@cluster0.xxxxx.mongodb.net/gamestack?retryWrites=true&w=majority
     ```
   - **Save this connection string!**

---

### Step 3: Deploy Backend to Railway

1. **Go to Railway:**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your `gamestack` repository
   - Click "Deploy"

3. **Configure Backend:**
   - Click on the project
   - Go to "Settings" → "Source"
   - Set Root Directory: `backend-spring`
   - Click "Save"

4. **Add Environment Variables:**
   - Go to "Variables" tab
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://gamestack:yourpassword@cluster0.xxxxx.mongodb.net/gamestack?retryWrites=true&w=majority
     JWT_SECRET=your-secure-jwt-secret-key-64-characters-minimum-generate-a-random-string
     CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
     PORT=3001
     ```
   - **Note:** Update `CORS_ALLOWED_ORIGINS` after deploying frontend

5. **Generate JWT Secret:**
   ```bash
   # Generate a secure JWT secret (64 characters)
   openssl rand -base64 64
   # Or use an online generator: https://randomkeygen.com/
   ```

6. **Deploy:**
   - Railway will automatically build and deploy
   - Wait for deployment to complete (5-10 minutes)
   - Check "Deployments" tab for status

7. **Get Backend URL:**
   - Go to "Settings" → "Domains"
   - Copy your backend URL: `https://your-app.railway.app`
   - **Save this URL!**

8. **Test Backend:**
   ```bash
   # Test health endpoint
   curl https://your-app.railway.app/api/health
   # Should return: {"status":"UP"}
   ```

---

### Step 4: Deploy Frontend to Vercel

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Sign up with GitHub

2. **Create New Project:**
   - Click "Add New" → "Project"
   - Import your `gamestack` repository
   - Click "Import"

3. **Configure Frontend:**
   - Framework Preset: `Vite` (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Add Environment Variables:**
   - Go to "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-app.railway.app/api
     ```
   - **Replace** `your-app.railway.app` with your actual Railway backend URL

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (2-5 minutes)
   - Check deployment status

6. **Get Frontend URL:**
   - After deployment, copy your frontend URL: `https://your-app.vercel.app`
   - **Save this URL!**

---

### Step 5: Update Backend CORS

1. **Go back to Railway:**
   - Open your backend project
   - Go to "Variables" tab

2. **Update CORS_ALLOWED_ORIGINS:**
   - Update `CORS_ALLOWED_ORIGINS` with your frontend URL:
     ```
     CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
     ```
   - Click "Save"
   - Railway will automatically redeploy

3. **Wait for Redeployment:**
   - Wait for backend to redeploy (2-5 minutes)

---

### Step 6: Test Deployment

1. **Test Frontend:**
   - Open your frontend URL: `https://your-app.vercel.app`
   - Check browser console for errors
   - Test registration/login
   - Test API calls

2. **Test Backend:**
   - Test health endpoint:
     ```bash
     curl https://your-app.railway.app/api/health
     ```
   - Should return: `{"status":"UP"}`

3. **Test Database:**
   - Go to MongoDB Atlas
   - Check "Collections" → "gamestack"
   - Verify collections are created

---

## 🔧 Troubleshooting

### Backend Not Starting
- Check Railway logs for errors
- Verify environment variables are set correctly
- Check MongoDB connection string format
- Verify JWT_SECRET is set

### Frontend Not Loading
- Check Vercel logs for errors
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors
- Verify backend is running

### CORS Errors
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check backend logs for CORS errors
- Verify frontend URL is correct

### Database Connection Failed
- Check MongoDB Atlas IP whitelist
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
- **Summary:** [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md)

---

**Time to Deploy:** ~30 minutes  
**Cost:** $0 (FREE)  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

