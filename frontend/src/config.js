// Frontend Configuration
const config = {
  // Backend API URL - Your Render backend
  API_URL: process.env.REACT_APP_API_URL || 'https://translation-app-f5ds.onrender.com',
  
  // Frontend domains (for reference)
  FRONTEND_DOMAINS: [
    'https://translation-app-one-fawn.vercel.app',           // Main domain
    'https://translation-app-git-main-zoouhairlrs-projects.vercel.app',  // Git main
    'https://translation-cx6dn3zmf-zoouhairlrs-projects.vercel.app'     // Preview
  ],
  
  // Available languages
  LANGUAGES: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ]
};

export default config;
