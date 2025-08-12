"""
Views for the translation app.
"""
import logging
from django.conf import settings
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status
import requests

# Set up logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@parser_classes([JSONParser])
def translate_text(request):
    """
    Translate text from source language to target language using LibreTranslate API.
    """
    try:
        # Extract data from request
        data = request.data
        
        # Validate required fields
        if not data:
            return Response(
                {'error': 'No data provided'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        text = data.get('text', '').strip()
        source = data.get('source', '').strip()
        target = data.get('target', '').strip()
        
        # Validate text
        if not text:
            return Response(
                {'error': 'Text field is required and cannot be empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate language codes
        valid_languages = ['en', 'fr', 'ar']
        if source not in valid_languages:
            return Response(
                {'error': f'Invalid source language. Must be one of: {", ".join(valid_languages)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if target not in valid_languages:
            return Response(
                {'error': f'Invalid target language. Must be one of: {", ".join(valid_languages)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if source and target are the same
        if source == target:
            return Response(
                {
                    'translated_text': text,
                    'word_count': len(text.split())
                }, 
                status=status.HTTP_200_OK
            )
        
        # Prepare payload for LibreTranslate API
        payload = {
            'q': text,
            'source': source,
            'target': target,
            'format': 'text'
        }
        
        try:
            api_url = f"{settings.LIBRETRANSLATE_API_URL}/translate"
            headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
            response = requests.post(api_url, json=payload, headers=headers, timeout=30)

            if response.status_code != 200:
                try:
                    err = response.json()
                except Exception:
                    err = {'error': 'Translation failed'}
                logger.error(f"LibreTranslate error: {response.status_code} {err}")
                return Response(
                    {'error': err.get('error', 'Translation failed')},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )

            data_json = response.json()
            translated_text = data_json.get('translatedText', '')
            if not translated_text:
                return Response(
                    {'error': 'No translated text received from service'},
                    status=status.HTTP_502_BAD_GATEWAY
                )

            return Response({
                'translated_text': translated_text,
                'original_text': text,
                'word_count': len(text.split())
            }, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to reach LibreTranslate: {e}")
            return Response(
                {'error': 'Translation service unavailable. Please try again later.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
            
    except Exception as e:
        logger.error(f"Unexpected error in translate_text: {str(e)}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@parser_classes([JSONParser])
def word_count(request):
    """
    Count words and characters in the provided text.
    """
    try:
        # Extract data from request
        data = request.data
        
        # Validate required fields
        if not data:
            return Response(
                {'error': 'No data provided'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        text = data.get('text', '').strip()
        
        # Validate text
        if not text:
            return Response(
                {'error': 'Text field is required and cannot be empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Calculate counts
        word_count = len(text.split())
        char_count = len(text)
        
        # Return successful response
        return Response({
            'word_count': word_count,
            'char_count': char_count
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Unexpected error in word_count: {str(e)}")
        return Response(
            {'error': 'Internal server error'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
