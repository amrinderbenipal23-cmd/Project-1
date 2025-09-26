const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const EmailService = require('./email-service');
const SMSService = require('./sms-service');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
const emailService = new EmailService();
const smsService = new SMSService();

// In-memory storage for demo (use Redis or database in production)
const resetTokens = new Map();
const resetCodes = new Map();

// Generate secure reset token
function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Email password reset endpoint
app.post('/api/auth/reset-password/email', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email address is required' 
            });
        }

        // Generate reset token
        const resetToken = generateResetToken();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Store token (in production, use database)
        resetTokens.set(resetToken, {
            email,
            expiresAt,
            used: false
        });

        // Send email
        await emailService.sendPasswordResetLink(email, resetToken);

        res.json({
            success: true,
            message: 'Password reset link sent to your email',
            data: {
                email,
                expiresIn: '24 hours'
            }
        });

    } catch (error) {
        console.error('Email reset error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send reset email. Please try again later.'
        });
    }
});

// SMS password reset endpoint
app.post('/api/auth/reset-password/sms', async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ 
                success: false, 
                message: 'Phone number is required' 
            });
        }

        // Generate reset code
        const resetCode = smsService.generateResetCode();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Store code (in production, use database)
        resetCodes.set(phoneNumber, {
            code: resetCode,
            expiresAt,
            attempts: 0,
            maxAttempts: 3
        });

        // Send SMS
        await smsService.sendPasswordResetCode(phoneNumber, resetCode);

        res.json({
            success: true,
            message: 'Password reset code sent to your phone',
            data: {
                phoneNumber,
                expiresIn: '10 minutes'
            }
        });

    } catch (error) {
        console.error('SMS reset error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send SMS code. Please try again later.'
        });
    }
});

// Verify reset code endpoint
app.post('/api/auth/verify-reset-code', async (req, res) => {
    try {
        const { phoneNumber, code } = req.body;

        if (!phoneNumber || !code) {
            return res.status(400).json({ 
                success: false, 
                message: 'Phone number and code are required' 
            });
        }

        const storedData = resetCodes.get(phoneNumber);
        
        if (!storedData) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset code'
            });
        }

        if (storedData.attempts >= storedData.maxAttempts) {
            resetCodes.delete(phoneNumber);
            return res.status(400).json({
                success: false,
                message: 'Too many attempts. Please request a new code.'
            });
        }

        if (new Date() > storedData.expiresAt) {
            resetCodes.delete(phoneNumber);
            return res.status(400).json({
                success: false,
                message: 'Reset code has expired. Please request a new one.'
            });
        }

        if (storedData.code !== code) {
            storedData.attempts++;
            resetCodes.set(phoneNumber, storedData);
            return res.status(400).json({
                success: false,
                message: 'Invalid reset code'
            });
        }

        // Code is valid, generate a temporary token for password reset
        const resetToken = generateResetToken();
        resetTokens.set(resetToken, {
            phoneNumber,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
            used: false
        });

        // Clean up the code
        resetCodes.delete(phoneNumber);

        res.json({
            success: true,
            message: 'Code verified successfully',
            data: {
                resetToken,
                expiresIn: '30 minutes'
            }
        });

    } catch (error) {
        console.error('Code verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify code. Please try again.'
        });
    }
});

// Reset password endpoint
app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ 
                success: false, 
                message: 'Token and new password are required' 
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        const storedData = resetTokens.get(token);
        
        if (!storedData) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        if (storedData.used) {
            return res.status(400).json({
                success: false,
                message: 'Reset token has already been used'
            });
        }

        if (new Date() > storedData.expiresAt) {
            resetTokens.delete(token);
            return res.status(400).json({
                success: false,
                message: 'Reset token has expired'
            });
        }

        // Mark token as used
        storedData.used = true;
        resetTokens.set(token, storedData);

        // In production, update password in database
        // await updateUserPassword(storedData.email || storedData.phoneNumber, newPassword);

        res.json({
            success: true,
            message: 'Password has been reset successfully',
            data: {
                resetAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reset password. Please try again.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Punjabi Music API is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎵 Punjabi Music API server running on port ${PORT}`);
    console.log(`📧 Email service: ${process.env.MAILERSEND_API_KEY ? 'Configured' : 'Not configured'}`);
    console.log(`📱 SMS service: ${process.env.TWILIO_ACCOUNT_SID ? 'Configured' : 'Not configured'}`);
});

module.exports = app;
