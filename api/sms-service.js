// SMS Service using Twilio
const twilio = require('twilio');

class SMSService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID || 'your-twilio-account-sid',
      process.env.TWILIO_AUTH_TOKEN || 'your-twilio-auth-token'
    );
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';
  }

  async sendPasswordResetCode(phoneNumber, resetCode) {
    try {
      // Format phone number (ensure it starts with +)
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
            
      const message = `🎵 Punjabi Music Platform\n\nYour password reset code is: ${resetCode}\n\nThis code will expire in 10 minutes for security.\n\nIf you didn't request this, please ignore this message.`;
            
      const response = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: formattedPhone
      });

      return { 
        success: true, 
        messageId: response.sid,
        code: resetCode // Return the code for verification
      };
    } catch (error) {
      console.error('SMS sending failed:', error);
      throw new Error('Failed to send SMS verification code');
    }
  }

  generateResetCode() {
    // Generate a 6-digit random code
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Alternative SMS service using AWS SNS (if preferred)
  async sendPasswordResetCodeAWS(phoneNumber, resetCode) {
    const AWS = require('aws-sdk');
    const sns = new AWS.SNS({
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    try {
      const message = `🎵 Punjabi Music Platform\n\nYour password reset code is: ${resetCode}\n\nThis code will expire in 10 minutes for security.`;
            
      const params = {
        Message: message,
        PhoneNumber: phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`
      };

      const response = await sns.publish(params).promise();
      return { 
        success: true, 
        messageId: response.MessageId,
        code: resetCode
      };
    } catch (error) {
      console.error('AWS SNS SMS sending failed:', error);
      throw new Error('Failed to send SMS verification code');
    }
  }
}

module.exports = SMSService;
