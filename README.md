# Translation Languages App

A full-stack translation application built with React + Tailwind CSS frontend and Django REST Framework backend, powered by LibreTranslate API.

## Project Overview

This project took approximately **2-3 hours** to complete, including:
- Frontend React app with Tailwind CSS styling
- Django REST API backend with proper error handling
- Integration with LibreTranslate API
- CORS configuration and deployment preparation
- Comprehensive documentation and setup instructions

## Features

- **Text Translation**: Translate text between English, French, and Arabic
- **Real-time API**: Powered by LibreTranslate API
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Error Handling**: Comprehensive error handling for both frontend and backend
- **Word Count**: Bonus endpoint for text analysis
- **Loading States**: User-friendly loading indicators

## Tech Stack

- **Frontend**: ReactJS + Tailwind CSS
- **Backend**: Django + Django REST Framework
- **External API**: Self-hosted LibreTranslate (via Docker)
- **No Database Required**: Stateless API design

## Project Structure

```
Translation-languages/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env.example
├── backend/                  # Django backend application
│   ├── translation_app/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Run LibreTranslate locally (Docker)

1. Ensure you have Docker installed.
2. From the project root, start LibreTranslate:
   ```bash
   docker compose up -d
   ```
   This launches LibreTranslate at `http://localhost:5000` without API limits.

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # The default points to http://localhost:5000
   ```

5. **Run Django server:**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```

4. **Start development server:**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### POST /translate
Translates text from source language to target language.

**Request:**
```json
{
  "text": "Hello world",
  "source": "en",
  "target": "fr"
}
```

**Response:**
```json
{
  "translated_text": "Bonjour le monde",
  "word_count": 2
}
```

### POST /word-count
Counts words and characters in text.

**Request:**
```json
{
  "text": "Hello world"
}
```

**Response:**
```json
{
  "word_count": 2,
  "char_count": 11
}
```

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `build`
   - Set environment variables in Vercel dashboard

3. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Set environment variables in Netlify dashboard

### Backend Deployment (Render/Heroku)

1. **For Render:**
   - Connect your GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn translation_project.wsgi:application`
   - Set environment variables in Render dashboard

2. **For Heroku:**
   - Install Heroku CLI
   - Create new Heroku app
   - Set environment variables: `heroku config:set VARIABLE_NAME=value`
   - Deploy: `git push heroku main`

## Environment Variables

### Backend (.env)
```
LIBRETRANSLATE_API_URL=http://localhost:5000
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_BACKEND_URL=http://localhost:8000
```

## Future Improvements (If More Time Available)

1. **Enhanced Language Support**: Add more languages and language detection
2. **Translation History**: Implement local storage for translation history
3. **Offline Mode**: Add service worker for offline functionality
4. **Speech-to-Text**: Integrate Web Speech API for voice input
5. **Text-to-Speech**: Add audio playback for translated text
6. **User Authentication**: Add user accounts and translation history
7. **Rate Limiting**: Implement API rate limiting and caching
8. **Mobile App**: Create React Native mobile application
9. **Advanced Features**: Document translation, file upload support
10. **Analytics**: Track translation usage and performance metrics

## Offline Functionality

This project removes online limits by running LibreTranslate locally with Docker. When Docker is running, the app works fully offline (no external API calls). If Docker is not running, the backend returns an informative error so you can start the container.

## Speech-to-Text Integration

To integrate speech-to-text input:

1. **Web Speech API:**
   ```javascript
   const recognition = new webkitSpeechRecognition();
   recognition.continuous = false;
   recognition.interimResults = false;
   recognition.lang = 'en-US';
   ```

2. **Implementation Steps:**
   - Add microphone button to UI
   - Implement speech recognition
   - Handle different languages
   - Provide visual feedback during recording
   - Convert speech to text for translation

3. **Browser Compatibility:**
   - Check for Web Speech API support
   - Provide fallback for unsupported browsers
   - Implement polyfills where necessary

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS settings match frontend URL
2. **API Failures**: Check LibreTranslate API availability and rate limits
3. **Environment Variables**: Verify all .env files are properly configured
4. **Port Conflicts**: Ensure ports 3000 (frontend) and 8000 (backend) are available

### Debug Mode

- Backend: Set `DEBUG=True` in .env for detailed error messages
- Frontend: Use browser developer tools for debugging
- API: Check network tab for request/response details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
