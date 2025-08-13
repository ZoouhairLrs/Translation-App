"""
Views for the translation app.
"""
import logging
import requests
import json
from django.conf import settings
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status

# Set up logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@parser_classes([JSONParser])
def translate_text(request):
    """
    Translate text from source language to target language using Google Translate.
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
        
        # Use Google Translate via HTTP request
        try:
            # Google Translate URL
            url = "https://translate.googleapis.com/translate_a/single"
            
            # Parameters for the request
            params = {
                'client': 'gtx',
                'sl': source,
                'tl': target,
                'dt': 't',
                'q': text
            }
            
            # Headers to mimic a browser request
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
            }
            
            # Make the request
            response = requests.get(url, params=params, headers=headers, timeout=30)
            
            if response.status_code != 200:
                logger.error(f"Google Translate error: {response.status_code}")
                return Response(
                    {'error': 'Translation service unavailable. Please try again later.'},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )
            
            # Parse the response
            try:
                data_json = response.json()
                # Google Translate returns a nested array, the first element contains the translations
                if data_json and len(data_json) > 0 and len(data_json[0]) > 0:
                    translated_text = data_json[0][0][0]
                else:
                    translated_text = ""
                    
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
                
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse Google Translate response: {e}")
                return Response(
                    {'error': 'Translation service response error. Please try again later.'},
                    status=status.HTTP_502_BAD_GATEWAY
                )

        except requests.exceptions.RequestException as e:
            logger.error(f"Google Translate request error: {str(e)}")
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
