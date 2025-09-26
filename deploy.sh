#!/bin/bash

# Punjabi Music Collaboration Platform - Deployment Script

echo "🎵 Deploying Punjabi Music Collaboration Platform..."

# Create assets directory if it doesn't exist
mkdir -p assets

# Copy SVG files to assets directory
cp logo.svg assets/
cp role_icons.svg assets/
cp ui_components.svg assets/
cp navigation_icons.svg assets/
cp punjabi_patterns.svg assets/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Create deployment directory
echo "📁 Creating deployment directory..."
mkdir -p dist

# Copy all files to dist
cp -r *.html *.md *.svg styles/ js/ dist/
cp -r assets/ dist/

# Create .gitignore for deployment
cat > dist/.gitignore << EOF
node_modules/
*.log
.DS_Store
.env
EOF

# Create deployment README
cat > dist/DEPLOYMENT.md << EOF
# Punjabi Music Collaboration Platform - Deployment

## Quick Start

1. **Local Development:**
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

2. **Production Build:**
   \`\`\`bash
   npm run build
   \`\`\`

3. **Deploy to GitHub Pages:**
   \`\`\`bash
   npm run deploy
   \`\`\`

## File Structure

- \`index.html\` - Main landing page
- \`splash_screen.html\` - App splash screen
- \`authentication.html\` - Login/registration
- \`role_selection.html\` - Role selection interface
- \`profile_setup.html\` - Profile creation
- \`dashboard.html\` - Main dashboard
- \`matchmaking_collaboration.html\` - Artist collaboration
- \`influencer_marketplace.html\` - Influencer marketplace
- \`live_shows.html\` - Live shows & bands
- \`events_hub.html\` - Industry events
- \`*.svg\` - Design assets
- \`styles/\` - CSS styles
- \`js/\` - JavaScript functionality

## Deployment Options

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch

### Netlify
1. Connect GitHub repository to Netlify
2. Set build command: \`npm run build\`
3. Set publish directory: \`dist\`

### Vercel
1. Connect GitHub repository to Vercel
2. Set build command: \`npm run build\`
3. Set output directory: \`dist\`

### Firebase Hosting
1. Install Firebase CLI: \`npm install -g firebase-tools\`
2. Initialize: \`firebase init hosting\`
3. Deploy: \`firebase deploy\`

## Custom Domain
Update the domain in \`index.html\` and other files as needed.

## Environment Variables
No environment variables required for static deployment.

## Support
For deployment issues, check the main README.md file.
EOF

echo "✅ Deployment files created successfully!"
echo "📁 Files ready in 'dist' directory"
echo "🚀 Ready for deployment to any static hosting service"
echo ""
echo "Deployment options:"
echo "  - GitHub Pages: Push to GitHub and enable Pages"
echo "  - Netlify: Connect repository and deploy"
echo "  - Vercel: Connect repository and deploy"
echo "  - Firebase: firebase deploy"
echo ""
echo "🎵 Punjabi Music Collaboration Platform is ready to go live!"
