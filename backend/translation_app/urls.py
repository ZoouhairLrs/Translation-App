"""
URL configuration for translation_app.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('translate/', views.translate_text, name='translate'),
    path('word-count/', views.word_count, name='word_count'),
]
