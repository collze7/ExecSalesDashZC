#!/bin/bash

# ReSource Pro Dashboard - Quick Deploy Script
# This script helps you deploy the dashboard to your existing Vercel project

echo "======================================"
echo "ReSource Pro Dashboard - Quick Deploy"
echo "======================================"
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from your GitHub repository root"
    exit 1
fi

echo "✅ Git repository detected"
echo ""

# Check if GitHub remote is correct
REMOTE_URL=$(git config --get remote.origin.url)
echo "📍 Repository: $REMOTE_URL"
echo ""

# Confirm with user
read -p "Is this the correct repository (https://github.com/collze7/ExecSalesDashZC)? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "📦 Starting integration..."
echo ""

# Check if nextjs-dashboard-integration.zip exists
if [ ! -f "nextjs-dashboard-integration.zip" ]; then
    echo "❌ Error: nextjs-dashboard-integration.zip not found"
    echo "Please download the zip file from the chat and place it in this directory"
    exit 1
fi

echo "✅ Found nextjs-dashboard-integration.zip"
echo ""

# Extract the zip
echo "📂 Extracting files..."
unzip -q -o nextjs-dashboard-integration.zip -d temp-dashboard
echo "✅ Extraction complete"
echo ""

# Copy files to repository
echo "📋 Copying files to repository..."

# Create directories if they don't exist
mkdir -p app/dashboard
mkdir -p components
mkdir -p public

# Copy app directory
cp -r temp-dashboard/app/* app/
echo "  ✓ Copied app directory"

# Copy components
cp -r temp-dashboard/components/* components/
echo "  ✓ Copied components directory"

# Copy public assets
cp temp-dashboard/public/logo.png public/
echo "  ✓ Copied logo.png"

# Copy configuration files
cp temp-dashboard/package.json package.json
echo "  ✓ Copied package.json"

cp temp-dashboard/next.config.js next.config.js
echo "  ✓ Copied next.config.js"

cp temp-dashboard/tailwind.config.js tailwind.config.js
echo "  ✓ Copied tailwind.config.js"

cp temp-dashboard/tsconfig.json tsconfig.json
echo "  ✓ Copied tsconfig.json"

cp temp-dashboard/postcss.config.js postcss.config.js
echo "  ✓ Copied postcss.config.js"

# Copy documentation
cp temp-dashboard/NEXTJS_INTEGRATION.md NEXTJS_INTEGRATION.md
echo "  ✓ Copied NEXTJS_INTEGRATION.md"

# Cleanup
rm -rf temp-dashboard
echo "  ✓ Cleaned up temporary files"

echo ""
echo "✅ All files copied successfully!"
echo ""

# Git status
echo "📊 Checking what changed..."
git status --short
echo ""

# Ask to commit
read -p "📝 Commit these changes? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    echo "Files have been copied but not committed"
    exit 1
fi

# Add all files
echo "➕ Adding files to git..."
git add .
echo "✅ Files staged"
echo ""

# Commit
echo "💾 Committing changes..."
git commit -m "Add ReSource Pro Sales Dashboard integration

- Add Next.js 14 App Router structure
- Add interactive dashboard with Overview, Prospects, and Commitments tabs
- Add branded home page with hero section
- Add 6 account cards with news, triggers, and outreach messages
- Add responsive design with ReSource Pro branding
- Add complete documentation and setup guide"

echo "✅ Changes committed"
echo ""

# Ask to push
read -p "🚀 Push to GitHub? This will trigger Vercel deployment. (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️  Changes committed locally but not pushed"
    echo "Run 'git push origin main' when ready to deploy"
    exit 0
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "✅ SUCCESS! Deployment initiated"
    echo "======================================"
    echo ""
    echo "🎉 Your dashboard is being deployed!"
    echo ""
    echo "📍 Monitor deployment progress:"
    echo "   https://vercel.com/collze7/execsalesdashzc"
    echo ""
    echo "🌐 Your dashboard will be live at:"
    echo "   https://exec-sales-dash-zc.vercel.app"
    echo ""
    echo "⏱️  Deployment typically takes 2-3 minutes"
    echo ""
    echo "📖 For more info, see NEXTJS_INTEGRATION.md"
    echo ""
else
    echo ""
    echo "❌ Error: Push failed"
    echo "Please check your git credentials and try again"
    exit 1
fi