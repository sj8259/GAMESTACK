# GameStack Quick Deployment Guide 🚀

Fast deployment guide using **FREE** hosting services.

---

## 🎯 Quick Deployment Steps

### 1. Setup MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free account
3. Create cluster (Free M0)
4. Create database user
5. Whitelist IP: `0.0.0.0/0` (allow all)
6. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/gamestack?retryWrites=true&w=majority
   ```

### 2. Deploy Backend to Railway (10 minutes)

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set Root Directory: `backend-spring`
6. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Generate a secure 64+ character secret
   - `CORS_ALLOWED_ORIGINS` = `https://your-frontend.vercel.app` (update after frontend deploy)
7. Wait for deployment
8. Copy your backend URL: `https://your-app.railway.app`

### 3. Deploy Frontend to Vercel (5 minutes)

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Set Root Directory: `frontend`
6. Add Environment Variable:
   - `VITE_API_URL` = `https://your-app.railway.app/api`
7. Click "Deploy"
8. Copy your frontend URL: `https://your-app.vercel.app`

### 4. Update Backend CORS (2 minutes)

1. Go back to Railway dashboard
2. Update `CORS_ALLOWED_ORIGINS` environment variable:
   - `https://your-app.vercel.app`
3. Redeploy backend

### 5. Test Deployment (2 minutes)

1. Open frontend URL: `https://your-app.vercel.app`
2. Test registration/login
3. Test API calls
4. Check browser console for errors

---

## 📋 Environment Variables Checklist

### Frontend (Vercel)
- ✅ `VITE_API_URL` = `https://your-backend.railway.app/api`

### Backend (Railway)
- ✅ `MONGODB_URI` = `mongodb+srv://...`
- ✅ `JWT_SECRET` = `your-secure-secret-64-characters`
- ✅ `CORS_ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`
- ✅ `PORT` = `3001` (usually auto-set)

---

## 🔧 Configuration Files Created

### Frontend
- ✅ `vercel.json` - Vercel configuration
- ✅ `netlify.toml` - Netlify configuration
- ✅ `api.js` - Updated to use environment variables

### Backend
- ✅ `railway.json` - Railway configuration
- ✅ `Procfile` - Process file
- ✅ `render.yaml` - Render configuration

---

## 🚀 Alternative Hosting Options

### Frontend Alternatives
- **Netlify**: Use `netlify.toml` configuration
- **Cloudflare Pages**: Similar to Vercel
- **GitHub Pages**: Static hosting

### Backend Alternatives
- **Render**: Use `render.yaml` configuration
- **Fly.io**: Use Docker deployment
- **Cyclic**: Serverless deployment

---

## 🐛 Common Issues

### CORS Errors
- **Solution**: Update `CORS_ALLOWED_ORIGINS` in backend with frontend URL

### API Not Working
- **Solution**: Check `VITE_API_URL` is set correctly in frontend

### Database Connection Failed
- **Solution**: Check MongoDB Atlas IP whitelist and connection string

### Build Failing
- **Solution**: Check build logs and verify all dependencies are correct

---

## 📚 Full Documentation

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Connection string obtained
- [ ] Backend deployed to Railway
- [ ] Backend URL obtained
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL obtained
- [ ] Environment variables configured
- [ ] CORS updated
- [ ] Application tested
- [ ] Deployment successful!

---

**Time to Deploy:** ~25 minutes  
**Cost:** $0 (100% FREE)  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

