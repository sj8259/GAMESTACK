# Quick Setup Guide for OTP and Google Sign-In

## Issue: Email OTP Not Working

**Error**: "Failed to send OTP email: Authentication failed"

### Solution:

1. **Get Gmail App Password**:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification if not enabled
   - Go to "App passwords" section
   - Create a new app password for "Mail"
   - Copy the 16-character password

2. **Set Environment Variables** (recommended):
   ```bash
   export MAIL_USERNAME=your-email@gmail.com
   export MAIL_PASSWORD=your-16-char-app-password
   ```
   
   Then restart the backend.

3. **OR Update application.yml**:
   Edit `backend-spring/src/main/resources/application.yml`:
   ```yaml
   spring:
     mail:
       username: your-email@gmail.com
       password: your-16-char-app-password
   ```

---

## Issue: Google Sign-In Not Working

**Error**: Button might not appear or shows "Invalid client"

### Solution:

1. **Get Google OAuth Credentials**:
   - Go to https://console.cloud.google.com/
   - Create a new project or select existing
   - Enable "Google+ API" (or "Google Identity Services API")
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized origins:
     - `http://localhost:5173`
     - `http://localhost:3000`
   - Add authorized redirect URIs:
     - `http://localhost:5173`
   - Copy the **Client ID**

2. **Configure Frontend**:
   
   Create `frontend/.env` file:
   ```bash
   VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   ```
   
   **IMPORTANT**: Restart the frontend dev server after creating `.env`:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Optional: Configure Backend** (for production):
   Edit `backend-spring/src/main/resources/application.yml`:
   ```yaml
   spring:
     security:
       oauth2:
         client:
           registration:
             google:
               client-id: your-client-id-here
               client-secret: your-client-secret-here
   ```

---

## Testing

### Test Email OTP:
1. Make sure email credentials are set
2. Go to login page
3. Click "OTP" tab
4. Enter your email
5. Click "Send OTP"
6. Check your email inbox

### Test Google Sign-In:
1. Make sure Google Client ID is set in `.env`
2. Restart frontend dev server
3. Go to login page
4. Click "Google" tab
5. Click "Sign in with Google" button

---

## Still Not Working?

1. **Check Backend Logs**:
   ```bash
   tail -f /tmp/springboot.log
   ```

2. **Check Frontend Console**:
   - Open browser DevTools (F12)
   - Check Console tab for errors

3. **Verify Endpoints**:
   ```bash
   # Test OTP endpoint
   curl -X POST http://localhost:3001/api/auth/otp/send \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

4. **Common Issues**:
   - Gmail: Make sure 2-Step Verification is enabled
   - Google OAuth: Make sure redirect URIs match exactly
   - Frontend: Must restart dev server after changing `.env`
