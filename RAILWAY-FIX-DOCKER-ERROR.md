# 🔧 Railway Docker Build Error Fix

## ❌ Error Analysis

The error shows Railway is trying to build with Docker using a Node.js image:

```
RUN npm ci
RUN mvn clean package -DskipTests
/bin/bash: line 1: mvn: command not found
```

**Problem:**
- Railway is using Docker builder instead of NIXPACKS
- Railway is detecting root directory (Node.js)
- Trying to run Maven in Node.js image (impossible)
- `mvn` command doesn't exist in Node.js image

---

## ✅ Solution: Set Root Directory in Railway Dashboard

The **MOST IMPORTANT** fix is to set the **Root Directory** in Railway dashboard:

### Step 1: Set Root Directory in Railway Dashboard

1. **Go to Railway Dashboard:**
   - https://railway.app
   - Select your **GAMESTACK** project
   - Click on the **GAMESTACK** service

2. **Open Settings:**
   - Click **"Settings"** tab
   - Scroll to **"Source"** section

3. **Set Root Directory:**
   - Find **"Root Directory"** setting
   - Click **"Edit"** or **"Change"**
   - Set to: `backend-spring`
   - Click **"Save"**

4. **Verify Builder:**
   - Railway should detect Java/Maven from `pom.xml`
   - Builder should be: `NIXPACKS` or `Auto-detect`
   - Should NOT use Docker

5. **Redeploy:**
   - Go to **"Deployments"** tab
   - Click **"Redeploy"**
   - Wait for build

---

## 🔧 Alternative: Disable Docker Build

If Railway is still trying to use Docker:

### Option 1: Remove docker-compose.yml from Root (Temporary)

Railway might be detecting `docker-compose.yml` and trying to use Docker.

**Don't delete it**, but make sure Railway knows to use NIXPACKS:

1. **Set Root Directory to `backend-spring`** (most important!)
2. **Verify no Dockerfile in root** (there isn't one)
3. **Ensure railway.toml specifies NIXPACKS**

### Option 2: Create Proper Dockerfile for Backend

If Railway insists on using Docker, create a proper Dockerfile:

**File:** `backend-spring/Dockerfile`

```dockerfile
# Multi-stage build for Spring Boot
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml first for better caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Production stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy JAR from builder
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## 🎯 Recommended Solution

**Use Railway Dashboard Settings (Easiest):**

1. **Set Root Directory to `backend-spring`** in Railway dashboard
2. **Railway will auto-detect:**
   - Java/Maven from `pom.xml`
   - Use NIXPACKS builder
   - Build with Maven
   - Start with Java

3. **No Dockerfile needed!**
   - Railway uses NIXPACKS
   - Auto-detects Java/Maven
   - Builds correctly

---

## 📋 Step-by-Step Fix

### Step 1: Set Root Directory (CRITICAL!)

**In Railway Dashboard:**
1. Go to Settings → Source
2. Find "Root Directory"
3. Set to: `backend-spring`
4. Click "Save"

### Step 2: Verify Builder

**After setting root directory:**
- Railway should detect `pom.xml`
- Builder should be: `NIXPACKS` or `Auto-detect`
- Should NOT be: `Docker`

### Step 3: Verify Build Command

**Railway should auto-detect:**
- Build Command: `mvn clean package -DskipTests`
- Start Command: `java -jar target/gamestack-backend-1.0.0.jar`

### Step 4: Redeploy

1. Go to Deployments tab
2. Click "Redeploy"
3. Wait for build
4. Check build logs

### Step 5: Verify Build

**Build logs should show:**
```
mvn clean package -DskipTests
[INFO] Building jar: target/gamestack-backend-1.0.0.jar
[INFO] BUILD SUCCESS
```

**Should NOT show:**
```
RUN npm ci
RUN mvn clean package -DskipTests
mvn: command not found
```

---

## 🔍 Why This Happens

### Railway's Detection Order:

1. **Checks for Dockerfile:**
   - If found → Uses Docker builder
   - If not found → Continue

2. **Checks root directory:**
   - Finds `package.json` → Detects Node.js
   - Tries to build with Node.js
   - But config says to use Maven → Error!

3. **With Root Directory Set:**
   - Starts from `backend-spring/`
   - Finds `pom.xml` → Detects Java/Maven
   - Uses NIXPACKS builder
   - Builds correctly!

---

## ✅ Checklist

- [ ] Root Directory set to `backend-spring` in Railway dashboard
- [ ] Builder is `NIXPACKS` or `Auto-detect` (NOT Docker)
- [ ] Build command: `mvn clean package -DskipTests`
- [ ] Start command: `java -jar target/gamestack-backend-1.0.0.jar`
- [ ] No Dockerfile in root directory
- [ ] railway.toml exists with NIXPACKS builder
- [ ] Build succeeds

---

## 🚀 Quick Fix

**In Railway Dashboard:**

1. **Settings → Source → Root Directory:** `backend-spring`
2. **Save**
3. **Redeploy**
4. **Done!**

---

## 🎉 Success!

Once root directory is set correctly:
- ✅ Railway detects Java/Maven
- ✅ Uses NIXPACKS builder
- ✅ Builds with Maven
- ✅ Deploys successfully!

**The key fix: Set Root Directory = `backend-spring` in Railway dashboard!**

---

**Time:** 2 minutes  
**Difficulty:** Easy

---

**Happy Deploying! 🚀**

