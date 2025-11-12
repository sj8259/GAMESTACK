# 🚀 Vercel Deployment Settings

## ⚠️ CRITICAL: Root Directory Must Be Set!

When deploying to Vercel, you **MUST** set the root directory to `frontend` in the Vercel dashboard.

---

## 📋 Step-by-Step Vercel Configuration

### Step 1: Create Project in Vercel

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your `gamestack` repository
5. Click "Import"

### Step 2: Configure Root Directory (CRITICAL!)

1. **Before deploying, click "Configure Project"**
2. Find **"Root Directory"** setting
3. Click "Edit"
4. Set to: `frontend`
5. Click "Save"

### Step 3: Build Settings (Auto-detected)

Vercel should auto-detect:
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

If not auto-detected, set manually:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Step 4: Environment Variables

1. Go to "Environment Variables"
2. Click "Add"
3. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.railway.app/api`
   - (Replace with your actual Railway backend URL)
4. Click "Save"

### Step 5: Deploy

1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Check build logs for errors
4. Copy your frontend URL

---

## 🔍 Troubleshooting

### Error: `vite: not found`

**Solution:** Make sure root directory is set to `frontend`!

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → General
4. Verify "Root Directory" is set to `frontend`
5. If not, set it and redeploy

### Error: Build fails

**Solution:** Check build logs and verify:

1. Root directory is `frontend`
2. package-lock.json exists
3. Dependencies are installing
4. Build command is `npm run build`

### Error: Dependencies not found

**Solution:** 

1. Clear build cache: Settings → Clear Build Cache
2. Ensure package-lock.json is committed
3. Redeploy

---

## ✅ Checklist

- [ ] Root directory set to `frontend` in Vercel
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable `VITE_API_URL` set
- [ ] package-lock.json committed to git
- [ ] Build tested and working

---

## 🎉 Success!

Once root directory is set correctly, the build should work!

**The key is: Root Directory = `frontend`**

---

**Happy Deploying! 🚀**

