# 🔐 Deployment Environment Variables Example

## ⚠️ Important: Replace with Your Actual Values

This is an example file. Replace the placeholder values with your actual credentials.

---

## 🔑 Environment Variables for Deployment

### Backend (Railway)

Add these environment variables in Railway:

1. **MONGODB_URI**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/gamestack?retryWrites=true&w=majority
   ```
   Replace with your actual MongoDB Atlas connection string

2. **JWT_SECRET**
   ```
   your-secure-jwt-secret-key-64-characters-minimum
   ```
   Generate using: `openssl rand -base64 64`

3. **CORS_ALLOWED_ORIGINS**
   ```
   https://your-frontend.vercel.app
   ```
   Update this after deploying frontend

4. **PORT**
   ```
   3001
   ```
   Railway usually sets this automatically

---

### Frontend (Vercel)

Add this environment variable in Vercel:

1. **VITE_API_URL**
   ```
   https://your-backend.railway.app/api
   ```
   Replace with your actual Railway backend URL

---

## 🔧 Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
openssl rand -base64 64
```

Or use this online generator: https://randomkeygen.com/

**Save the generated secret!** You'll need it for Railway deployment.

---

## ⚠️ Security Note

**Never commit actual credentials to git!**

- Use `.gitignore` to exclude files with sensitive data
- Use example files (`.example.txt`) for templates
- Set environment variables in deployment platform dashboards
- Keep credentials secure and private

---

**Happy Deploying! 🚀**

