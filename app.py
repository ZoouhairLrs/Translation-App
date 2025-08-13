#!/usr/bin/env python
"""
Main application entry point for Render deployment.
This file ensures the Django app can be imported correctly.
"""
import os
import sys

# Add the backend directory to Python path
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'translation_project.settings')

# Import Django and create WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

if __name__ == '__main__':
    # For local development
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
