// Google OAuth Configuration
// Replace these with your actual Google OAuth credentials

const GOOGLE_OAUTH_CONFIG = {
    // Get these from Google Cloud Console: https://console.cloud.google.com/
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    
    // Your domain (for production)
    domain: 'yourdomain.com',
    
    // Redirect URI (must be registered in Google Console)
    redirectUri: window.location.origin,
    
    // Scopes for user data
    scopes: [
        'email',
        'profile',
        'openid'
    ]
};

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_OAUTH_CONFIG;
}
