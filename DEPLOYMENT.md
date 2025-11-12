# GameStack Deployment Guide 🚀

Complete guide to deploy GameStack using **100% FREE** hosting services.

---

## 📋 Deployment Overview

```
Frontend (Vercel/Netlify) → Backend API (Railway/Render) → Database (MongoDB Atlas)
```

### Free Hosting Services

**Frontend:**
- ✅ **Vercel** (Recommended) - Free tier, unlimited
- ✅ **Netlify** - Free tier, 100GB bandwidth
- ✅ **Cloudflare Pages** - Free tier, unlimited
- ✅ **GitHub Pages** - Free tier, static sites

**Backend:**
- ✅ **Railway** (Recommended) - Free tier, $5 credit/month
- ✅ **Render** - Free tier, 750 hours/month
- ✅ **Fly.io** - Free tier, 3 shared VMs
- ✅ **Cyclic** - Free tier, serverless

**Database:**
- ✅ **MongoDB Atlas** - Free tier, 512MB storage

---

## 🗄️ Step 1: Setup MongoDB Atlas (Free)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free account
3. Create a new cluster (Free tier M0)

### 2. Configure Database
1. **Create Database User:**
   - Database Access → Add New User
   - Username: `gamestack`
   - Password: Generate secure password
   - Save credentials

2. **Whitelist IP Address:**
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`
   - (Or add specific IPs for security)

3. **Get Connection String:**
   - Clusters → Connect → Connect your application
   - Copy connection string:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/gamestack?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your credentials

### 3. Test Connection
- Use MongoDB Compass or `mongosh` to test connection
- Verify database is accessible

---

## 🎨 Step 2: Deploy Frontend (Vercel - Recommended)

### Option A: Vercel Deployment

#### 1. Prepare Frontend for Production

**Update `vite.config.js` for production:**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    rollupOptions: {
      external: ['monaco-editor'],
    },
  },
  // Production base path
  base: '/',
})
```

**Update `frontend/src/utils/api.js` to use environment variable:**

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

#### 2. Create Vercel Configuration

Create `vercel.json` in frontend directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 3. Deploy to Vercel

**Method 1: Via Vercel Dashboard**
1. Go to [Vercel](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Set Root Directory: `frontend`
6. Add Environment Variables:
   - `VITE_API_URL` = Your backend API URL (e.g., `https://your-backend.railway.app/api`)
7. Click "Deploy"

**Method 2: Via Vercel CLI**
```bash
cd frontend
npm install -g vercel
vercel login
vercel
# Follow prompts
vercel --prod
```

#### 4. Configure Environment Variables
- Go to Vercel Dashboard → Project → Settings → Environment Variables
- Add:
  - `VITE_API_URL` = `https://your-backend.railway.app/api`

### Option B: Netlify Deployment

#### 1. Create Netlify Configuration

Create `netlify.toml` in frontend directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Deploy to Netlify
1. Go to [Netlify](https://www.netlify.com)
2. Sign up/login with GitHub
3. Click "New site from Git"
4. Connect GitHub repository
5. Set:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add Environment Variables:
   - `VITE_API_URL` = Your backend API URL
7. Click "Deploy site"

### Option C: Cloudflare Pages

#### 1. Deploy to Cloudflare Pages
1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Sign up/login
3. Click "Create a project"
4. Connect GitHub repository
5. Set:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Add Environment Variables:
   - `VITE_API_URL` = Your backend API URL
7. Click "Save and Deploy"

---

## ⚙️ Step 3: Deploy Backend (Railway - Recommended)

### Option A: Railway Deployment

#### 1. Prepare Backend for Production

**Update `application.yml` for production:**

```yaml
server:
  port: ${PORT:3001}

spring:
  application:
    name: gamestack-backend
  main:
    allow-bean-definition-overriding: true
  
  data:
    mongodb:
      uri: ${MONGODB_URI:mongodb://localhost:27017/gamestack}
      auto-index-creation: false
  
  security:
    jwt:
      secret: ${JWT_SECRET:your_jwt_secret_key_here}
      expiration: 604800000
    oauth2:
      client:
        registration:
          google:
            client-id: ${GOOGLE_CLIENT_ID:}
            client-secret: ${GOOGLE_CLIENT_SECRET:}
            scope:
              - email
              - profile

app:
  name: GameStack

logging:
  level:
    com.gamestack: INFO
    org.springframework.security: INFO

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always
```

#### 2. Create Railway Configuration

Create `railway.json` in backend-spring directory:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "mvn clean package -DskipTests"
  },
  "deploy": {
    "startCommand": "java -jar target/gamestack-backend-1.0.0.jar",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### 3. Create Procfile (Alternative)

Create `Procfile` in backend-spring directory:

```
web: java -jar target/gamestack-backend-1.0.0.jar
```

#### 4. Deploy to Railway

**Method 1: Via Railway Dashboard**
1. Go to [Railway](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your repository
6. Set Root Directory: `backend-spring`
7. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Generate a secure JWT secret (64+ characters)
   - `PORT` = `3001` (Railway sets this automatically)
   - `GOOGLE_CLIENT_ID` = (Optional) Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET` = (Optional) Your Google OAuth client secret
8. Click "Deploy"

**Method 2: Via Railway CLI**
```bash
cd backend-spring
npm install -g @railway/cli
railway login
railway init
railway up
railway variables set MONGODB_URI="your-mongodb-uri"
railway variables set JWT_SECRET="your-jwt-secret"
railway deploy
```

#### 5. Get Backend URL
- Railway will provide a URL like: `https://your-app.railway.app`
- Update frontend `VITE_API_URL` to: `https://your-app.railway.app/api`

### Option B: Render Deployment

#### 1. Create Render Configuration

Create `render.yaml` in backend-spring directory:

```yaml
services:
  - type: web
    name: gamestack-backend
    env: java
    buildCommand: mvn clean package -DskipTests
    startCommand: java -jar target/gamestack-backend-1.0.0.jar
    envVars:
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: PORT
        value: 3001
```

#### 2. Deploy to Render
1. Go to [Render](https://render.com)
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Set:
   - Name: `gamestack-backend`
   - Root Directory: `backend-spring`
   - Environment: `Java`
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -jar target/gamestack-backend-1.0.0.jar`
6. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Generate a secure JWT secret
   - `PORT` = `3001`
7. Click "Create Web Service"

### Option C: Fly.io Deployment

#### 1. Create Fly.io Configuration

Create `Dockerfile` in backend-spring directory (if not exists):

```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 3001
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Create `fly.toml`:

```toml
app = "gamestack-backend"
primary_region = "iad"

[build]

[env]
  PORT = "3001"

[http_service]
  internal_port = 3001
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[[services]]
  protocol = "tcp"
  internal_port = 3001
```

#### 2. Deploy to Fly.io
```bash
cd backend-spring
flyctl auth login
flyctl launch
# Follow prompts
flyctl secrets set MONGODB_URI="your-mongodb-uri"
flyctl secrets set JWT_SECRET="your-jwt-secret"
flyctl deploy
```

---

## 🔧 Step 4: Configure CORS

### Update Backend CORS Configuration

Update `SecurityConfig.java` to allow your frontend domain:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:5173",
        "https://your-frontend.vercel.app",
        "https://your-frontend.netlify.app"
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

Or use environment variable:

```java
@Value("${cors.allowed-origins:http://localhost:5173}")
private String allowedOrigins;

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

Add to `application.yml`:

```yaml
cors:
  allowed-origins: ${CORS_ALLOWED_ORIGINS:http://localhost:5173}
```

---

## 📝 Step 5: Environment Variables Summary

### Frontend Environment Variables

**Vercel/Netlify/Cloudflare:**
- `VITE_API_URL` = `https://your-backend.railway.app/api`

### Backend Environment Variables

**Railway/Render/Fly.io:**
- `MONGODB_URI` = `mongodb+srv://username:password@cluster.mongodb.net/gamestack?retryWrites=true&w=majority`
- `JWT_SECRET` = `your-secure-jwt-secret-key-64-characters-minimum`
- `PORT` = `3001` (usually set automatically)
- `CORS_ALLOWED_ORIGINS` = `https://your-frontend.vercel.app,https://your-frontend.netlify.app`
- `GOOGLE_CLIENT_ID` = (Optional) Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` = (Optional) Your Google OAuth client secret

---

## 🚀 Quick Deployment Checklist

### Pre-Deployment
- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Database user created
- [ ] IP whitelist configured
- [ ] Connection string copied
- [ ] JWT secret generated
- [ ] GitHub repository created
- [ ] Code pushed to GitHub

### Frontend Deployment
- [ ] Vercel/Netlify account created
- [ ] Frontend repository connected
- [ ] Build configuration set
- [ ] Environment variables configured
- [ ] Frontend deployed successfully
- [ ] Frontend URL obtained

### Backend Deployment
- [ ] Railway/Render account created
- [ ] Backend repository connected
- [ ] Build configuration set
- [ ] Environment variables configured
- [ ] Backend deployed successfully
- [ ] Backend URL obtained
- [ ] CORS configured
- [ ] Health check working

### Post-Deployment
- [ ] Frontend API URL updated
- [ ] CORS origins updated
- [ ] Application tested
- [ ] Database connection verified
- [ ] Authentication working
- [ ] API endpoints tested

---

## 🔍 Testing Deployment

### 1. Test Backend
```bash
# Health check
curl https://your-backend.railway.app/api/health

# Should return: {"status":"UP"}
```

### 2. Test Frontend
```bash
# Open in browser
https://your-frontend.vercel.app

# Check console for errors
# Test login/register
# Test API calls
```

### 3. Test Database
- Check MongoDB Atlas dashboard
- Verify collections are created
- Test data insertion

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem: API calls failing**
- Check `VITE_API_URL` is set correctly
- Check CORS configuration in backend
- Check browser console for errors

**Problem: Build failing**
- Check Node.js version (18+)
- Check dependencies are installed
- Check build logs

### Backend Issues

**Problem: Database connection failing**
- Check MongoDB Atlas IP whitelist
- Check connection string format
- Check database credentials
- Check network connectivity

**Problem: Build failing**
- Check Java version (17+)
- Check Maven configuration
- Check build logs

**Problem: CORS errors**
- Check CORS configuration
- Check allowed origins
- Check frontend URL

### Database Issues

**Problem: Connection timeout**
- Check IP whitelist
- Check network access
- Check connection string

**Problem: Authentication failing**
- Check database credentials
- Check user permissions
- Check connection string format

---

## 💰 Free Tier Limits

### Vercel
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ HTTPS included

### Netlify
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Custom domains
- ✅ HTTPS included

### Railway
- ✅ $5 free credit/month
- ✅ 500 hours runtime/month
- ✅ Custom domains
- ✅ HTTPS included

### Render
- ✅ 750 hours/month
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ HTTPS included

### MongoDB Atlas
- ✅ 512MB storage
- ✅ Shared cluster
- ✅ No credit card required

---

## 📚 Additional Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

### Tutorials
- [Deploy React App to Vercel](https://vercel.com/guides/deploying-react-with-vercel)
- [Deploy Spring Boot to Railway](https://docs.railway.app/guides/spring-boot)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)

---

## 🎉 Success!

Once deployed, your GameStack application will be live at:
- **Frontend:** `https://your-frontend.vercel.app`
- **Backend:** `https://your-backend.railway.app/api`
- **Database:** MongoDB Atlas (cloud)

**Happy Deploying! 🚀**

---

**Last Updated:** November 2024  
**Version:** 1.0.0

