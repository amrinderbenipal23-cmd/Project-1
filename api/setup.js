const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎵 Setting up Punjabi Music API...\n');

try {
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    
    // Create .env file if it doesn't exist
    const envPath = path.join(__dirname, '.env');
    const envExamplePath = path.join(__dirname, 'env.example');
    
    if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
        console.log('📝 Creating .env file from template...');
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ .env file created. Please update it with your API keys.');
    }
    
    console.log('\n🎉 Setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Update .env file with your API keys:');
    console.log('   - MailerSend API key for email service');
    console.log('   - Twilio credentials for SMS service');
    console.log('2. Run: npm start');
    console.log('3. API will be available at http://localhost:3001');
    
} catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
}
