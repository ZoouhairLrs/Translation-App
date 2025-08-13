import React, { useState, useEffect } from 'react';
import config from '../config';

const TranslationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    text: '',
    source: 'en',
    target: 'fr'
  });
  
  const [wordCount, setWordCount] = useState({ words: 0, chars: 0 });
  const [isCounting, setIsCounting] = useState(false);

  // Debounced word count API call
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.text.trim()) {
        getWordCount(formData.text);
      } else {
        setWordCount({ words: 0, chars: 0 });
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [formData.text]);

  const getWordCount = async (text) => {
    if (!text.trim()) return;
    
    setIsCounting(true);
    try {
      const response = await fetch(`${config.API_URL}/api/word-count/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() })
      });
      
      if (response.ok) {
        const data = await response.json();
        setWordCount({ words: data.word_count, chars: data.char_count });
      } else {
        // Fallback to client-side calculation if API fails
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const chars = text.length;
        setWordCount({ words, chars });
      }
    } catch (error) {
      // Fallback to client-side calculation if API fails
      const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      const chars = text.length;
      setWordCount({ words, chars });
    } finally {
      setIsCounting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.text.trim() && !isLoading) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Text Input */}
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
          Text to Translate
        </label>
        <textarea
          id="text"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          placeholder="Enter text to translate..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
          required
          disabled={isLoading}
        />
        
        {/* Enhanced Word Count Display */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Word Count */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                {isCounting ? (
                  <span className="text-gray-500">Counting...</span>
                ) : (
                  `${wordCount.words} word${wordCount.words !== 1 ? 's' : ''}`
                )}
              </span>
            </div>
            
            {/* Character Count */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                {isCounting ? (
                  <span className="text-gray-500">Counting...</span>
                ) : (
                  `${wordCount.chars} character${wordCount.chars !== 1 ? 's' : ''}`
                )}
                
              </span>
            </div>
          </div>
          
          {/* Text Length Indicator */}
          {formData.text.length > 0 && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              formData.text.length < 100 ? 'bg-green-100 text-green-800' :
              formData.text.length < 500 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {formData.text.length < 100 ? 'Short' :
               formData.text.length < 500 ? 'Medium' : 'Long'}
            </div>
          )}
        </div>
      </div>

      {/* Language Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Language */}
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
            From Language
          </label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            disabled={isLoading}
          >
            {config.LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Target Language */}
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-2">
            To Language
          </label>
          <select
            id="target"
            name="target"
            value={formData.target}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            disabled={isLoading}
          >
            {config.LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={!formData.text.trim() || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Translating...
            </>
          ) : (
            'Translate Text'
          )}
        </button>
      </div>
    </form>
  );
};

export default TranslationForm;
