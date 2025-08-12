#!/bin/bash

echo "🚀 Translation App Deployment Script"
echo "=================================="

echo ""
echo "📋 STEP 1: Prepare for Deployment"
echo "1. Make sure all changes are committed to GitHub"
echo "2. Ensure you have Vercel and Render accounts"
echo ""

echo "🌐 STEP 2: Deploy Backend to Render"
echo "1. Go to https://render.com"
echo "2. Create new Web Service"
echo "3. Connect your GitHub repo"
echo "4. Use build command: ./build.sh"
echo "5. Use start command: gunicorn translation_project.wsgi:application"
echo ""

echo "⚡ STEP 3: Deploy Frontend to Vercel"
echo "1. Go to https://vercel.com"
echo "2. Import your GitHub repo"
echo "3. Set root directory to: frontend"
echo "4. Set environment variables:"
echo "   REACT_APP_API_URL=https://your-backend-name.onrender.com"
echo ""

echo "🐳 STEP 4: Start LibreTranslate (Optional)"
echo "docker compose up -d"
echo ""

echo "✅ STEP 5: Test Your Deployment"
echo "1. Test backend: curl your-backend-url/api/translate/"
echo "2. Test frontend: Open your Vercel URL"
echo "3. Try translating some text"
echo ""

echo "🎯 Ready to deploy! Follow the detailed guide in DEPLOYMENT.md"
echo "Good luck with your interview! 🚀"
