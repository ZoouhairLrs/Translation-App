#!/bin/bash

# Translation Languages App Setup Script
# This script will set up both the frontend and backend applications

echo "🚀 Starting Translation Languages App Setup..."
echo "================================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip3."
    exit 1
fi

echo "✅ Prerequisites check passed!"
echo ""

# Backend Setup
echo "🔧 Setting up Django Backend..."
echo "--------------------------------"

cd backend

# Create virtual environment
echo "📦 Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit backend/.env with your configuration!"
else
    echo "✅ .env file already exists"
fi

# Deactivate virtual environment
deactivate

echo "✅ Backend setup completed!"
echo ""

# Frontend Setup
echo "🔧 Setting up React Frontend..."
echo "--------------------------------"

cd ../frontend

# Install dependencies
echo "📥 Installing Node.js dependencies..."
npm install

# Create .env file from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit frontend/.env with your configuration!"
else
    echo "✅ .env file already exists"
fi

echo "✅ Frontend setup completed!"
echo ""

# Return to root directory
cd ..

echo "🎉 Setup completed successfully!"
echo "================================================"
echo ""
echo "📋 Next steps:"
echo "1. Edit backend/.env with your LibreTranslate API configuration"
echo "2. Edit frontend/.env with your backend API URL"
echo "3. Start the backend: cd backend && source venv/bin/activate && python manage.py runserver"
echo "4. Start the frontend: cd frontend && npm start"
echo ""
echo "🌐 Backend will be available at: http://localhost:8000"
echo "🌐 Frontend will be available at: http://localhost:3000"
echo ""
echo "📚 For more information, see README.md"
echo ""
echo "Happy translating! 🚀"
