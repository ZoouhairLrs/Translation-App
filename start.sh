#!/bin/bash
# Translation Backend Startup Script
# Exit on any error
set -o errexit

echo "🚀 Starting Translation Backend..."
echo "📍 Current directory: $(pwd)"

# Change to backend directory
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

# Verify the Django app exists
if [ ! -d "translation_project" ]; then
    echo "❌ Error: translation_project directory not found!"
    exit 1
fi

echo "✅ Django app found successfully!"
echo "🚀 Starting gunicorn server..."

# Start gunicorn
exec gunicorn translation_project.wsgi:application
