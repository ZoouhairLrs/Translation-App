#!/bin/bash
echo "Starting translation backend..."
echo "Current directory: $(pwd)"
echo "Changing to backend directory..."
cd backend
echo "Backend directory: $(pwd)"
echo "Starting gunicorn..."
exec gunicorn translation_project.wsgi:application
