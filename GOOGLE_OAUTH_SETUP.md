# Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API and Google OAuth2 API

## Step 2: Configure OAuth Consent Screen

1. In Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: "Punjabi Music Collaboration"
   - User support email: your email
   - Developer contact: your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (your email addresses)

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
5. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)

## Step 4: Update Configuration

1. Copy your Client ID from Google Console
2. Replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` in `safari-mobile.html` with your actual Client ID
3. Update the domain in `google-oauth-config.js` if needed

## Step 5: Test the Integration

1. Open the app in your browser
2. Click "Login with Google"
3. Complete the OAuth flow
4. Check browser console for user data

## Security Notes

- Never commit your actual Client ID to public repositories
- Use environment variables for production
- Implement proper token validation on your backend
- Consider using PKCE for additional security

## Troubleshooting

- **"This app isn't verified"**: Normal for development, users can click "Advanced" > "Go to app"
- **CORS errors**: Make sure your domain is in authorized origins
- **Token errors**: Check that scopes are properly configured
- **Redirect errors**: Ensure redirect URIs match exactly

## Production Deployment

1. Update authorized origins to your production domain
2. Update redirect URIs to your production domain
3. Submit for verification if you want to remove the "unverified app" warning
4. Implement proper backend token validation
