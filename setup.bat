@echo off
chcp 65001 >nul
echo 🚀 Starting Translation Languages App Setup...
echo ================================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16 or higher.
    pause
    exit /b 1
)

REM Check if pip is installed
pip --version >nul 2>&1
if errorlevel 1 (
    echo ❌ pip is not installed. Please install pip.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!
echo.

REM Backend Setup
echo 🔧 Setting up Django Backend...
echo --------------------------------

cd backend

REM Create virtual environment
echo 📦 Creating Python virtual environment...
python -m venv venv

REM Activate virtual environment
echo 🔌 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install requirements
echo 📥 Installing Python dependencies...
pip install -r requirements.txt

REM Create .env file from example
if not exist .env (
    echo 📝 Creating .env file from template...
    copy env.example .env
    echo ⚠️  Please edit backend\.env with your configuration!
) else (
    echo ✅ .env file already exists
)

REM Deactivate virtual environment
deactivate

echo ✅ Backend setup completed!
echo.

REM Frontend Setup
echo 🔧 Setting up React Frontend...
echo --------------------------------

cd ..\frontend

REM Install dependencies
echo 📥 Installing Node.js dependencies...
npm install

REM Create .env file from example
if not exist .env (
    echo 📝 Creating .env file from template...
    copy env.example .env
    echo ⚠️  Please edit frontend\.env with your configuration!
) else (
    echo ✅ .env file already exists
)

echo ✅ Frontend setup completed!
echo.

REM Return to root directory
cd ..

echo 🎉 Setup completed successfully!
echo ================================================
echo.
echo 📋 Next steps:
echo 1. Edit backend\.env with your LibreTranslate API configuration
echo 2. Edit frontend\.env with your backend API URL
echo 3. Start the backend: cd backend ^&^& venv\Scripts\activate ^&^& python manage.py runserver
echo 4. Start the frontend: cd frontend ^&^& npm start
echo.
echo 🌐 Backend will be available at: http://localhost:8000
echo 🌐 Frontend will be available at: http://localhost:3000
echo.
echo 📚 For more information, see README.md
echo.
echo Happy translating! 🚀
pause
