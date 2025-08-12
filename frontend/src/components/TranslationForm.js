import React, { useState } from 'react';

const TranslationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    text: '',
    source: 'en',
    target: 'fr'
  });

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

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

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
        <div className="mt-2 text-sm text-gray-500 text-right">
          {formData.text.trim() ? `${formData.text.trim().split(/\s+/).filter(word => word.length > 0).length} words` : '0 words'}
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
            {languages.map(lang => (
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
            {languages.map(lang => (
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
