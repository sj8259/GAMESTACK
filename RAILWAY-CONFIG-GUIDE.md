# 📋 Railway Configuration File Guide

## 🎯 What to Fill in Railway Config File

Railway allows you to manage build and deployment settings through a configuration file. Here's what to fill:

---

## ✅ Configuration Files Created

I've created **two** configuration files for you:

1. **`railway.toml`** - TOML format (recommended)
2. **`railway.json`** - JSON format (alternative)

Both files configure Railway to:
- Build from `backend-spring` directory
- Use Maven to build
- Start with Java command

---

## 📝 Railway Configuration (railway.toml)

**File:** `railway.toml` (in root directory)

```toml
# Railway Configuration File
# This file configures Railway to build and deploy the backend from backend-spring directory

[build]
builder = "NIXPACKS"
rootDirectory = "backend-spring"
buildCommand = "mvn clean package -DskipTests"

[deploy]
startCommand = "java -jar target/gamestack-backend-1.0.0.jar"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### Key Settings Explained:

1. **`builder = "NIXPACKS"`**
   - Tells Railway to use Nixpacks builder
   - Auto-detects Java/Maven from `pom.xml`

2. **`rootDirectory = "backend-spring"`** ⚠️ **CRITICAL!**
   - Sets the root directory to `backend-spring`
   - This is the **most important** setting!
   - Tells Railway where to build from

3. **`buildCommand = "mvn clean package -DskipTests"`**
   - Maven command to build the project
   - Creates JAR file in `target/` directory

4. **`startCommand = "java -jar target/gamestack-backend-1.0.0.jar"`**
   - Command to start the application
   - Runs the Spring Boot JAR file

---

## 📝 Railway Configuration (railway.json)

**File:** `railway.json` (in root directory)

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "rootDirectory": "backend-spring",
    "buildCommand": "mvn clean package -DskipTests"
  },
  "deploy": {
    "startCommand": "java -jar target/gamestack-backend-1.0.0.jar",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Key Settings Explained:

1. **`"rootDirectory": "backend-spring"`** ⚠️ **CRITICAL!**
   - Sets the root directory to `backend-spring`
   - This is the **most important** setting!

2. **`"builder": "NIXPACKS"`**
   - Tells Railway to use Nixpacks builder
   - Auto-detects Java/Maven

3. **`"buildCommand": "mvn clean package -DskipTests"`**
   - Maven build command

4. **`"startCommand": "java -jar target/gamestack-backend-1.0.0.jar"`**
   - Java start command

---

## 🔧 What Each Setting Does

### Build Settings:

| Setting | Value | Purpose |
|---------|-------|---------|
| `builder` | `NIXPACKS` | Uses Nixpacks to detect Java/Maven |
| `rootDirectory` | `backend-spring` | **CRITICAL:** Builds from backend directory |
| `buildCommand` | `mvn clean package -DskipTests` | Maven command to build JAR |

### Deploy Settings:

| Setting | Value | Purpose |
|---------|-------|---------|
| `startCommand` | `java -jar target/...` | Command to start the application |
| `restartPolicyType` | `ON_FAILURE` | Restart if deployment fails |
| `restartPolicyMaxRetries` | `10` | Maximum restart attempts |

---

## ✅ How to Use

### Option 1: Use Config File (Recommended)

1. **Commit the config file:**
   ```bash
   git add railway.toml
   git commit -m "Add Railway configuration"
   git push
   ```

2. **Railway will automatically:**
   - Detect `railway.toml` or `railway.json`
   - Use the settings from the file
   - Build from `backend-spring` directory

3. **No need to configure in dashboard!**
   - Railway reads the config file
   - Settings are version-controlled
   - Consistent across deployments

### Option 2: Configure in Dashboard

If you prefer to configure in the dashboard:

1. **Root Directory:**
   - Set to: `backend-spring`

2. **Build Command:**
   - Set to: `mvn clean package -DskipTests`

3. **Start Command:**
   - Set to: `java -jar target/gamestack-backend-1.0.0.jar`

---

## 🎯 Recommended Approach

**Use the config file!**

1. ✅ Commit `railway.toml` to git
2. ✅ Push to GitHub
3. ✅ Railway automatically detects and uses it
4. ✅ No need to configure in dashboard
5. ✅ Settings are version-controlled

---

## 📋 Complete Configuration

### railway.toml (Root Directory)

```toml
[build]
builder = "NIXPACKS"
rootDirectory = "backend-spring"
buildCommand = "mvn clean package -DskipTests"

[deploy]
startCommand = "java -jar target/gamestack-backend-1.0.0.jar"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### Environment Variables (Set in Dashboard)

These are NOT in the config file - set them in Railway dashboard:

```
MONGODB_URI=mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack?retryWrites=true&w=majority
JWT_SECRET=OWrpHs62OL4m9bTGJynb0aru6gTN7lq4lEHMt7VHsa+QW0IXMyCrQ8Hv8CAv4XAYI7IN4i1+SGBhP0/rtcbgXw==
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=3001
```

---

## ✅ Checklist

- [x] `railway.toml` created with correct settings
- [x] `railway.json` created with correct settings
- [x] `rootDirectory` set to `backend-spring`
- [x] `buildCommand` set to Maven command
- [x] `startCommand` set to Java command
- [ ] Config file committed to git
- [ ] Config file pushed to GitHub
- [ ] Railway detects config file
- [ ] Build succeeds

---

## 🚀 Next Steps

1. **Commit the config file:**
   ```bash
   git add railway.toml railway.json
   git commit -m "Add Railway configuration file"
   git push
   ```

2. **Railway will automatically:**
   - Detect the config file
   - Use the settings
   - Build from `backend-spring` directory
   - Deploy successfully

3. **Verify deployment:**
   - Check Railway dashboard
   - Verify build succeeds
   - Check backend URL

---

## 🎉 Success!

Once the config file is committed and pushed:
- Railway will detect it automatically
- Build will run from `backend-spring` directory
- Deployment will succeed!

**The key setting is: `rootDirectory = "backend-spring"`!**

---

**Happy Deploying! 🚀**

