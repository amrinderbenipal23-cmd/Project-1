# 🎵 Punjabi Music Platform API

Backend API service for password reset functionality using MailerSend and Twilio.

## 🚀 Features

- **Email Password Reset**: Send secure reset links via MailerSend
- **SMS Password Reset**: Send verification codes via Twilio
- **Secure Token Management**: Time-limited reset tokens
- **Beautiful Email Templates**: Music-themed HTML emails
- **Error Handling**: Comprehensive error responses

## 📋 Prerequisites

- Node.js (v14 or higher)
- MailerSend account and API key
- Twilio account and credentials (for SMS)
- AWS account (optional, for alternative SMS service)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd api
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update with your credentials:

```bash
cp env.example .env
```

Update `.env` with your API keys:

```env
# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000

# MailerSend Configuration
MAILERSEND_API_KEY=your-mailersend-api-key-here
FROM_EMAIL=noreply@punjabimusic.com

# Twilio Configuration (for SMS)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. Get API Keys

#### MailerSend Setup:
1. Sign up at [MailerSend](https://www.mailersend.com/)
2. Get your API key from the dashboard
3. Verify your domain for sending emails

#### Twilio Setup:
1. Sign up at [Twilio](https://www.twilio.com/)
2. Get Account SID and Auth Token
3. Purchase a phone number for sending SMS

### 4. Start the Server

```bash
npm start
```

The API will be available at `http://localhost:3001`

## 📡 API Endpoints

### Email Password Reset

**POST** `/api/auth/reset-password/email`

```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset link sent to your email",
  "data": {
    "email": "user@example.com",
    "expiresIn": "24 hours"
  }
}
```

### SMS Password Reset

**POST** `/api/auth/reset-password/sms`

```json
{
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset code sent to your phone",
  "data": {
    "phoneNumber": "+1234567890",
    "expiresIn": "10 minutes"
  }
}
```

### Verify SMS Code

**POST** `/api/auth/verify-reset-code`

```json
{
  "phoneNumber": "+1234567890",
  "code": "123456"
}
```

### Reset Password

**POST** `/api/auth/reset-password`

```json
{
  "token": "reset-token-from-email-or-sms",
  "newPassword": "newpassword123"
}
```

## 🎨 Email Template Features

- **Music-themed design** with Punjabi colors
- **Responsive layout** for all devices
- **Security information** and expiration times
- **Professional branding** with logo and styling
- **Fallback text** for email clients

## 🔒 Security Features

- **Time-limited tokens** (24 hours for email, 10 minutes for SMS)
- **Single-use tokens** (cannot be reused)
- **Rate limiting** (max 3 attempts for SMS codes)
- **Secure token generation** using crypto.randomBytes
- **Input validation** and sanitization

## 🧪 Testing

Test the API endpoints using curl or Postman:

```bash
# Test email reset
curl -X POST http://localhost:3001/api/auth/reset-password/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test SMS reset
curl -X POST http://localhost:3001/api/auth/reset-password/sms \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+1234567890"}'
```

## 🚀 Production Deployment

For production deployment:

1. **Use a database** (PostgreSQL, MongoDB) instead of in-memory storage
2. **Add Redis** for session management
3. **Configure HTTPS** for secure communication
4. **Add rate limiting** middleware
5. **Set up monitoring** and logging
6. **Use environment-specific** configuration

## 📞 Support

For issues or questions:
- Check the console logs for error details
- Verify your API keys are correct
- Ensure your domain is verified in MailerSend
- Check Twilio phone number is active

## 🎵 Music Platform Integration

This API is designed to work seamlessly with the Punjabi Music Platform frontend, providing secure and user-friendly password reset functionality with beautiful music-themed email templates.
