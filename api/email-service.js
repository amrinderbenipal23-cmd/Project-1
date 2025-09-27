// Email Service using MailerSend
const MailerSend = require('mailersend');

class EmailService {
  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY || 'your-mailersend-api-key'
    });
  }

  async sendPasswordResetLink(email, resetToken) {
    try {
      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
            
      const emailParams = {
        from: {
          email: process.env.FROM_EMAIL || 'noreply@punjabimusic.com',
          name: 'Punjabi Music Platform'
        },
        to: [
          {
            email,
            name: 'User'
          }
        ],
        subject: 'Reset Your Password - Punjabi Music Platform',
        html: this.getPasswordResetEmailTemplate(resetLink),
        text: `Reset your password by clicking this link: ${resetLink}`
      };

      const response = await this.mailerSend.send(emailParams);
      return { success: true, messageId: response.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send reset email');
    }
  }

  getPasswordResetEmailTemplate(resetLink) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset - Punjabi Music</title>
            <style>
                body { font-family: 'Poppins', Arial, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #FF9933, #339933); }
                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
                .header { background: linear-gradient(135deg, #FF9933, #339933, #CC0033); color: white; padding: 30px; text-align: center; }
                .logo { font-size: 48px; margin-bottom: 10px; }
                .title { font-size: 24px; font-weight: 700; margin-bottom: 10px; }
                .subtitle { font-size: 16px; opacity: 0.9; }
                .content { padding: 40px 30px; }
                .message { font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 30px; }
                .button { display: inline-block; background: linear-gradient(135deg, #FF9933, #339933); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; margin: 20px 0; }
                .button:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
                .security-note { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0; color: #856404; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🎵</div>
                    <div class="title">Password Reset Request</div>
                    <div class="subtitle">Punjabi Music Platform</div>
                </div>
                
                <div class="content">
                    <div class="message">
                        <h2>Hello! 👋</h2>
                        <p>We received a request to reset your password for your Punjabi Music account. If you made this request, click the button below to reset your password:</p>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${resetLink}" class="button">Reset My Password 🎵</a>
                    </div>
                    
                    <div class="security-note">
                        <strong>🔒 Security Note:</strong> This link will expire in 24 hours for your security. If you didn't request this password reset, please ignore this email.
                    </div>
                    
                    <div class="message">
                        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace;">${resetLink}</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p>© 2024 Punjabi Music Platform. All rights reserved.</p>
                    <p>This email was sent to you because you requested a password reset.</p>
                </div>
            </div>
        </body>
        </html>
        `;
  }
}

module.exports = EmailService;
