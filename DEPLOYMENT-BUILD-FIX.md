# 🔧 Deployment Build Fix

## Issue: `vite: not found` Error

The build is failing because `vite` command is not found during deployment.

## ✅ Solution

### For Vercel Deployment:

1. **Set Root Directory:**
   - In Vercel dashboard: Settings → General → Root Directory
   - Set to: `frontend`

2. **Build Settings:**
   - Framework Preset: `Vite` (auto-detected)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

3. **Environment Variables:**
   - `VITE_API_URL` = `https://your-backend.railway.app/api`

### For Netlify Deployment:

1. **Set Base Directory:**
   - In Netlify dashboard: Site settings → Build & deploy → Base directory
   - Set to: `frontend`

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables:**
   - `VITE_API_URL` = `https://your-backend.railway.app/api`

---

## 📋 Important: Root Directory

**⚠️ Critical:** Make sure the deployment platform knows the root directory is `frontend`!

- **Vercel:** Set "Root Directory" to `frontend` in project settings
- **Netlify:** Set "Base directory" to `frontend` in build settings

---

## 🔍 Troubleshooting

### If build still fails:

1. **Check package-lock.json is committed:**
   ```bash
   cd frontend
   git add package-lock.json
   git commit -m "Add package-lock.json"
   git push
   ```

2. **Clear build cache:**
   - Vercel: Settings → Clear Build Cache
   - Netlify: Site settings → Clear cache

3. **Verify dependencies:**
   ```bash
   cd frontend
   rm -rf node_modules
   npm install
   npm run build
   ```

---

## ✅ Checklist

- [ ] Root directory set to `frontend` in Vercel/Netlify
- [ ] package-lock.json committed to git
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables configured
- [ ] Build tested locally

---

**The key issue is setting the root directory to `frontend` in your deployment platform!**

