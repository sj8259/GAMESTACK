# 🔐 Deployment Credentials

## ✅ Generated Credentials

### JWT Secret (Generated)
```
dn7YSEYE2BXu7X2BcVCkGzIgOR6rlOqeYwg47O0nGhQVeXDhLd3qy25yGLohwnT9dkSVCcxsQhH4hLd4sSqYmA==
```

### MongoDB Atlas Connection String
```
mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack
```

---

## 🚂 Railway (Backend) Environment Variables

Add these in Railway Dashboard → Your Project → Variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack` |
| `JWT_SECRET` | `dn7YSEYE2BXu7X2BcVCkGzIgOR6rlOqeYwg47O0nGhQVeXDhLd3qy25yGLohwnT9dkSVCcxsQhH4hLd4sSqYmA==` |
| `CORS_ALLOWED_ORIGINS` | `https://your-frontend-url.vercel.app` (update after frontend deployment) |
| `PORT` | `3001` (Railway sets this automatically, but you can specify) |

**Note:** Update `CORS_ALLOWED_ORIGINS` after you deploy the frontend and get the Vercel URL.

---

## ▲ Vercel (Frontend) Environment Variables

Add these in Vercel Dashboard → Your Project → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend-url.railway.app/api` (update after backend deployment) |

**Note:** Update `VITE_API_URL` after you deploy the backend and get the Railway URL.

---

## 📝 Deployment Order

1. **Push code to GitHub** ✅
2. **Deploy Backend to Railway:**
   - Set Root Directory: `backend-spring`
   - Add environment variables (MONGODB_URI, JWT_SECRET)
   - Deploy
   - Copy backend URL (e.g., `https://gamestack-backend.railway.app`)

3. **Deploy Frontend to Vercel:**
   - Set Root Directory: `frontend`
   - Add environment variable: `VITE_API_URL` = `https://your-backend-url.railway.app/api`
   - Deploy
   - Copy frontend URL (e.g., `https://gamestack.vercel.app`)

4. **Update CORS in Railway:**
   - Go back to Railway
   - Update `CORS_ALLOWED_ORIGINS` = `https://your-frontend-url.vercel.app`
   - Redeploy backend

5. **Test the deployment!** 🎉

---

## 🔒 Security Notes

- ✅ JWT secret is securely generated (64+ characters)
- ✅ MongoDB credentials are in environment variables (not in code)
- ✅ All sensitive data is excluded from Git (`.gitignore`)

---

**Ready to deploy!** 🚀

