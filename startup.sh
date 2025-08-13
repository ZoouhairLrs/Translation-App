#!/bin/bash
echo "=== Translation Backend Startup ==="
echo "Current directory: $(pwd)"
echo "Setting Python path..."
export PYTHONPATH="/opt/render/project/src/backend:$PYTHONPATH"
echo "Python path: $PYTHONPATH"
echo "Changing to backend directory..."
cd backend
echo "Backend directory: $(pwd)"
echo "Listing backend contents:"
ls -la
echo "Starting gunicorn..."
exec gunicorn translation_project.wsgi:application --bind 0.0.0.0:$PORT
