#!/bin/bash
# exit on error
set -o errexit

echo "Starting build process..."
echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

echo "Making startup script executable..."
chmod +x startup.sh

echo "Changing to backend directory..."
cd backend

echo "Backend directory contents:"
ls -la

echo "Installing requirements..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Skipping migrations (no database needed for this app)..."
# python manage.py migrate

echo "Build completed successfully!"
