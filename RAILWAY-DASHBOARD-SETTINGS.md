# 📋 Railway Dashboard Settings - What to Fill

## 🎯 What to Change in Railway Dashboard

Based on your Railway settings page, here's exactly what to fill:

---

## ✅ Step-by-Step Settings

### 1. **Root Directory** (CRITICAL - MUST SET THIS!)

**Location:** Under "Source" section

**What to do:**
- Click **"Add Root Directory"** button
- **Type:** `backend-spring`
- Click **"Update"** or **"Save"**

**This is the MOST IMPORTANT setting!**

---

### 2. **Builder** (Already Set - Good!)

**Location:** Under "Build" section

**Current:** `Nixpacks` (Deprecated)

**What to do:**
- ✅ Already set to Nixpacks - This is correct!
- Railway will detect Java/Maven from `pom.xml`
- No changes needed

**Note:** Even though it says "Deprecated", it will work fine for Java/Maven projects.

---

### 3. **Build Command** (Auto-detected)

**Location:** Under "Build" section → "Custom Build Command"

**Current:** "The value is set in railway.toml"

**What to do:**
- ✅ Leave it as is (Railway will use railway.toml)
- Or you can leave it empty (Railway will auto-detect: `mvn clean package -DskipTests`)

---

### 4. **Start Command** (Auto-detected)

**Location:** Under "Deploy" section → "Custom Start Command"

**Current:** "The value is set in railway.toml"

**What to do:**
- ✅ Leave it as is (Railway will use railway.toml)
- Or you can leave it empty (Railway will use Procfile: `java -jar target/gamestack-backend-1.0.0.jar`)

---

### 5. **Environment Variables** (MUST SET THESE!)

**Location:** Go to "Variables" tab (separate from Settings)

**What to add:**

1. **MONGODB_URI**
   ```
   mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack?retryWrites=true&w=majority
   ```

2. **JWT_SECRET**
   ```
   OWrpHs62OL4m9bTGJynb0aru6gTN7lq4lEHMt7VHsa+QW0IXMyCrQ8Hv8CAv4XAYI7IN4i1+SGBhP0/rtcbgXw==
   ```

3. **CORS_ALLOWED_ORIGINS**
   ```
   https://your-frontend.vercel.app
   ```
   (Update this after deploying frontend)

4. **PORT**
   ```
   3001
   ```
   (Railway usually sets this automatically, but you can set it manually)

---

## 🎯 Summary: What to Change

### ✅ MUST CHANGE:

1. **Root Directory:** Set to `backend-spring`
   - Location: Source section
   - Click "Add Root Directory"
   - Type: `backend-spring`
   - Save

### ✅ MUST SET (Environment Variables):

Go to **"Variables"** tab and add:
- `MONGODB_URI`
- `JWT_SECRET`
- `CORS_ALLOWED_ORIGINS`
- `PORT`

### ✅ ALREADY CORRECT (No Changes Needed):

- Builder: Nixpacks ✅
- Build Command: Set in railway.toml ✅
- Start Command: Set in railway.toml ✅
- Branch: main ✅
- Public Networking: Enabled ✅

---

## 📝 Step-by-Step Instructions

### Step 1: Set Root Directory

1. **In the Settings page you're viewing:**
   - Find **"Add Root Directory"** button (under Source section)
   - Click it
   - **Type:** `backend-spring`
   - Click **"Update"** or **"Save"**

### Step 2: Set Environment Variables

1. **Click on "Variables" tab** (top navigation, next to Settings)
2. **Click "New Variable"** button
3. **Add each variable:**
   - Click "New Variable"
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack?retryWrites=true&w=majority`
   - Click "Add"
   - Repeat for other variables

### Step 3: Redeploy

1. **Go to "Deployments" tab**
2. **Click "Redeploy"** button
3. **Wait for build to complete**
4. **Check build logs**

---

## ✅ Checklist

- [ ] Root Directory set to `backend-spring`
- [ ] Environment variables added:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `CORS_ALLOWED_ORIGINS`
  - [ ] `PORT`
- [ ] Builder is Nixpacks (already set)
- [ ] Build command is set (from railway.toml)
- [ ] Start command is set (from railway.toml)
- [ ] Redeploy triggered
- [ ] Build succeeds

---

## 🎉 After These Changes

Once you set:
1. **Root Directory = `backend-spring`**
2. **Environment Variables**

Railway will:
- ✅ Build from `backend-spring` directory
- ✅ Detect Java/Maven from `pom.xml`
- ✅ Build with: `mvn clean package -DskipTests`
- ✅ Start with: `java -jar target/gamestack-backend-1.0.0.jar`
- ✅ Deploy successfully!

---

## 🚀 Quick Answer

**What to change:**

1. **Root Directory:** Click "Add Root Directory" → Type `backend-spring` → Save
2. **Variables Tab:** Add environment variables (MONGODB_URI, JWT_SECRET, etc.)
3. **Redeploy:** Go to Deployments → Click Redeploy

**That's it!**

---

**Happy Deploying! 🚀**

