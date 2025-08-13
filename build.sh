#!/bin/bash
# Translation Backend Build Script
# Exit on any error
set -o errexit

echo "🚀 Starting Translation Backend Build..."
echo "📍 Current directory: $(pwd)"

# Make startup script executable
echo "🔧 Making startup script executable..."
chmod +x start.sh

# Change to backend directory (since rootDir: backend)
echo "📁 Changing to backend directory..."
cd backend

echo "📍 Backend directory: $(pwd)"
echo "📋 Backend contents:"
ls -la

# Verify we're in the right directory
if [ ! -f "manage.py" ]; then
    echo "❌ Error: manage.py not found. Are you in the backend directory?"
    exit 1
fi

echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

echo "🎨 Collecting static files..."
python manage.py collectstatic --no-input

echo "✅ Build completed successfully!"
echo "🚀 Ready to start gunicorn server..."
