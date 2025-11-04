# Authentication Setup Guide

This guide explains how to set up Google Sign-In and Email OTP authentication for GameStack.

## Prerequisites

1. Gmail account for sending OTP emails
2. Google Cloud Console account for OAuth setup

## 1. Email Configuration (OTP)

### Gmail App Password Setup

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App passwords**
4. Create a new app password for "Mail"
5. Copy the 16-character password

### Configure Application Properties

Update `backend-spring/src/main/resources/application.yml`:

```yaml
spring:
  mail:
    username: your-email@gmail.com
    password: your-16-char-app-password
```

**OR** set environment variables:

```bash
export MAIL_USERNAME=your-email@gmail.com
export MAIL_PASSWORD=your-16-char-app-password
```

## 2. Google OAuth Setup

### Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Google+ API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Add authorized JavaScript origins:
     - `http://localhost:5173`
     - `http://localhost:3000`
   - Add authorized redirect URIs:
     - `http://localhost:5173`
     - `http://localhost:3001`
   - Click **Create** and copy the **Client ID** and **Client Secret**

### Configure Application

#### Backend Configuration

Update `backend-spring/src/main/resources/application.yml`:

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: your-google-client-id
            client-secret: your-google-client-secret
```

**OR** set environment variables:

```bash
export GOOGLE_CLIENT_ID=your-google-client-id
export GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Frontend Configuration

Create or update `.env` file in the `frontend` directory:

```bash
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

**OR** update `frontend/src/main.jsx` directly (not recommended for production):

```javascript
const GOOGLE_CLIENT_ID = 'your-google-client-id'
```

## 3. Testing

### Test Email OTP

1. Start the backend and frontend
2. Navigate to the login page
3. Click the **OTP** tab
4. Enter your email address
5. Click **Send OTP**
6. Check your email for the 6-digit code
7. Enter the code and click **Verify OTP**

### Test Google Sign-In

1. Navigate to the login page
2. Click the **Google** tab
3. Click the **Sign in with Google** button
4. Select your Google account
5. Grant permissions

## 4. Security Notes

### Production Recommendations

1. **Email**: Use a dedicated SMTP service (SendGrid, AWS SES, etc.) instead of Gmail
2. **OTP Expiry**: Current expiry is 10 minutes (configurable in `Otp.java`)
3. **Google OAuth**: Verify ID tokens on the backend in production
4. **Environment Variables**: Never commit credentials to version control
5. **HTTPS**: Always use HTTPS in production

### MongoDB Indexes

OTPs are automatically deleted after 10 minutes using MongoDB TTL indexes.

## 5. Troubleshooting

### Email Issues

- **"Failed to send OTP"**: Check email credentials and app password
- **Emails not received**: Check spam folder, verify email address
- **Connection timeout**: Verify Gmail SMTP settings (smtp.gmail.com:587)

### Google OAuth Issues

- **"Invalid client"**: Verify Client ID matches in frontend and backend
- **"Redirect URI mismatch"**: Ensure redirect URIs match exactly in Google Console
- **"CORS error"**: Check CORS configuration in `SecurityConfig.java`

## 6. API Endpoints

### OTP Endpoints

- `POST /api/auth/otp/send` - Send OTP to email
  ```json
  {
    "email": "user@example.com"
  }
  ```

- `POST /api/auth/otp/verify` - Verify OTP code
  ```json
  {
    "email": "user@example.com",
    "code": "123456"
  }
  ```

### Google OAuth Endpoint

- `POST /api/auth/google` - Authenticate with Google
  ```json
  {
    "email": "user@gmail.com",
    "name": "User Name",
    "googleId": "google-user-id",
    "picture": "https://..."
  }
  ```

All endpoints return JWT tokens on successful authentication.

