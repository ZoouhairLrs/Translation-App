import React, { useState } from 'react';
import TranslationForm from './components/TranslationForm';
import TranslationResult from './components/TranslationResult';
import './App.css';

function App() {
  const [translationData, setTranslationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslation = async (formData) => {
    setIsLoading(true);
    setError(null);
    setTranslationData(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/translate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      setTranslationData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Translation App
          </h1>
          <p className="text-gray-600 text-lg">
            Professional translation service supporting English, French, and Arabic
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <TranslationForm onSubmit={handleTranslation} isLoading={isLoading} />
          
          {isLoading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Translating...</p>
            </div>
          )}
          
          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}
          
          {translationData && (
            <TranslationResult 
              originalText={translationData.original_text}
              translatedText={translationData.translated_text}
              wordCount={translationData.word_count}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
