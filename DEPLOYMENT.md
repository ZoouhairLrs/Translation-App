# 🚀 Deployment Guide - Translation App

## **Overview**
This guide will help you deploy your translation app to:
- **Frontend**: Vercel (React)
- **Backend**: Render (Django)
- **LibreTranslate**: Docker (unlimited usage)

## **📋 Prerequisites**
- GitHub account
- Vercel account (free)
- Render account (free)
- Docker installed locally

## **🔧 STEP 1: Prepare Your Code**

### **1.1 Push to GitHub**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### **1.2 Update Environment Variables**
- Update `frontend/env.example` with your actual backend URL
- Update `backend/env.production` with your actual frontend URL

## **🌐 STEP 2: Deploy Backend to Render**

### **2.1 Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"

### **2.2 Connect Repository**
1. Connect your GitHub repository
2. Select the repository
3. Choose the main branch

### **2.3 Configure Service**
- **Name**: `translation-backend` (or your preferred name)
- **Environment**: `Python 3`
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn translation_project.wsgi:application`

### **2.4 Set Environment Variables**
```
DEBUG=False
SECRET_KEY=your-generated-secret-key
ALLOWED_HOSTS=.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
LIBRETRANSLATE_API_URL=https://libretranslate.com
```

### **2.5 Deploy**
1. Click "Create Web Service"
2. Wait for build to complete
3. Note your backend URL: `https://your-service-name.onrender.com`

## **⚡ STEP 3: Deploy Frontend to Vercel**

### **3.1 Create Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"

### **3.2 Import Repository**
1. Import your GitHub repository
2. Select the repository
3. Vercel will auto-detect it's a React app

### **3.3 Configure Project**
- **Framework Preset**: Create React App
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### **3.4 Set Environment Variables**
```
REACT_APP_API_URL=https://your-backend-name.onrender.com
REACT_APP_BACKEND_URL=https://your-backend-name.onrender.com
```

### **3.5 Deploy**
1. Click "Deploy"
2. Wait for build to complete
3. Note your frontend URL: `https://your-project.vercel.app`

## **🐳 STEP 4: Set Up LibreTranslate (Optional)**

### **4.1 For Local Development**
```bash
# Start LibreTranslate locally
docker compose up -d

# Check if running
docker ps

# Test API
curl http://localhost:5000
```

### **4.2 For Production (Alternative)**
If you want to use your own LibreTranslate instance:
1. Deploy LibreTranslate to a cloud service
2. Update `LIBRETRANSLATE_API_URL` in Render environment variables
3. This gives you unlimited usage

## **🔗 STEP 5: Update URLs**

### **5.1 Update Backend CORS**
In Render dashboard, update environment variable:
```
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### **5.2 Update Frontend API URL**
In Vercel dashboard, update environment variable:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com
```

## **✅ STEP 6: Test Your Deployment**

### **6.1 Test Backend**
```bash
curl https://your-backend-name.onrender.com/api/translate/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","source":"en","target":"fr"}'
```

### **6.2 Test Frontend**
1. Open your Vercel URL
2. Try translating some text
3. Check browser console for errors

## **🚨 Troubleshooting**

### **Common Issues**

#### **CORS Errors**
- Ensure `CORS_ALLOWED_ORIGINS` includes your Vercel domain
- Check that the URL is exactly correct (including https://)

#### **API Connection Errors**
- Verify your backend URL in Vercel environment variables
- Check that your backend is running on Render

#### **Build Errors**
- Check Render build logs for Python errors
- Check Vercel build logs for React errors

### **Debug Commands**
```bash
# Check backend logs
# Go to Render dashboard → Your service → Logs

# Check frontend build
# Go to Vercel dashboard → Your project → Deployments → Latest
```

## **🎯 Final Checklist**

- [ ] Backend deployed to Render ✅
- [ ] Frontend deployed to Vercel ✅
- [ ] Environment variables set correctly ✅
- [ ] CORS configured properly ✅
- [ ] Translation API working ✅
- [ ] Frontend connecting to backend ✅
- [ ] LibreTranslate working (local or production) ✅

## **🌍 Your Live URLs**

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-service-name.onrender.com`
- **Local LibreTranslate**: `http://localhost:5000` (if using Docker)

## **💡 Pro Tips for Recruiter Demo**

1. **Show the live URLs** - proves you can deploy
2. **Demonstrate translation** - shows functionality works
3. **Explain the architecture** - frontend/backend separation
4. **Mention Docker** - shows DevOps knowledge
5. **Highlight unlimited usage** - shows cost optimization thinking

## **🚀 Ready to Impress!**

Your app is now live and ready to show off to recruiters! The combination of Vercel + Render + Docker shows:
- **Frontend deployment skills** (Vercel)
- **Backend deployment skills** (Render)
- **DevOps knowledge** (Docker)
- **Full-stack capabilities** (React + Django)
- **Production thinking** (environment variables, CORS, etc.)

Good luck with your interview! 🎉
