# 🌍 Translation App - Full Stack Web Application

A modern, responsive translation application built with Django REST API backend and React frontend, featuring real-time translation capabilities using Google Translate API.

## 🚀 Live Demo

- **Frontend**: [https://translation-app-one-fawn.vercel.app](https://translation-app-one-fawn.vercel.app)
- **Backend API**: [https://translation-app-f5ds.onrender.com](https://translation-app-f5ds.onrender.com)

## ✨ Features

- **🌐 Multi-language Support**: English, French, and Arabic
- **⚡ Real-time Translation**: Instant translation using Google Translate API
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **📊 Word Count**: Automatic word counting for translated text
- **🔒 CORS Enabled**: Secure cross-origin communication
- **🚀 Production Ready**: Deployed on Vercel (frontend) and Render (backend)

## 🏗️ Architecture

```
Frontend (React + Tailwind) ←→ Backend (Django REST API) ←→ Google Translate API
     ↓                              ↓                           ↓
  Vercel                        Render                    Google Cloud
```

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Frontend deployment platform

### Backend
- **Django 4.2.7** - Python web framework
- **Django REST Framework** - API development
- **Gunicorn** - WSGI HTTP Server
- **Render** - Backend deployment platform

### APIs & Services
- **Google Translate API** - Translation service (no API key required)
- **CORS Headers** - Cross-origin resource sharing

## 📁 Project Structure

```
Translation-App/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── config.js        # Configuration file
│   │   └── App.js          # Main application component
│   └── package.json
├── backend/                  # Django backend application
│   ├── translation_app/     # Main Django app
│   ├── translation_project/ # Django project settings
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- Git

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 API Endpoints

### Translation API
- **POST** `/api/translate/`
  - Request body: `{"text": "Hello world", "source": "en", "target": "fr"}`
  - Response: `{"translated_text": "Bonjour le monde", "original_text": "Hello world", "word_count": 2}`

### Word Count API
- **POST** `/api/word-count/`
  - Request body: `{"text": "Hello world"}`
  - Response: `{"word_count": 2, "char_count": 11}`

## 🔧 Environment Variables

### Backend (Django)
```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

## 🚀 Deployment

### Frontend (Vercel)
- Automatic deployment from GitHub
- Custom domain support
- Global CDN

### Backend (Render)
- Python web service
- Automatic builds from GitHub
- Environment variable management
- Health monitoring

## 🎯 Key Features for Recruiters

### 1. **Full Stack Development**
- Complete web application with frontend and backend
- API design and implementation
- Database-less architecture (stateless API)

### 2. **Modern Technologies**
- Latest versions of Django and React
- Responsive design principles
- RESTful API architecture

### 3. **Production Deployment**
- Multi-platform deployment (Vercel + Render)
- Environment configuration
- CORS and security setup

### 4. **API Integration**
- Third-party API integration (Google Translate)
- Error handling and logging
- Request/response validation

### 5. **Code Quality**
- Clean, documented code
- Proper error handling
- Logging and monitoring

## 🔍 What This Project Demonstrates

- **Backend Development**: Django REST API with proper structure
- **Frontend Development**: React components with modern UI/UX
- **API Design**: RESTful endpoints with proper validation
- **Deployment**: Multi-platform deployment strategy
- **Integration**: Third-party API integration
- **Security**: CORS configuration and environment management
- **Performance**: Optimized for production use

## 📱 Screenshots

The application features a clean, modern interface with:
- Language selection dropdowns
- Text input area
- Translation results display
- Word count information
- Responsive design for all devices

## 🎉 Ready for Production

This application is:
- ✅ **Fully functional** with live translation
- ✅ **Production deployed** on reliable platforms
- ✅ **Scalable** architecture
- ✅ **Secure** with proper CORS and environment management
- ✅ **Professional** code quality and documentation

## 📞 Contact

- **GitHub**: [ZoouhairLrs](https://github.com/ZoouhairLrs)
- **Project**: [Translation-App Repository](https://github.com/ZoouhairLrs/Translation-App)

---

**Built with ❤️ using Django, React, and modern web technologies**
