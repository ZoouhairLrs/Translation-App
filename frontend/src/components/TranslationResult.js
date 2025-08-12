import React from 'react';

const TranslationResult = ({ originalText, translatedText, wordCount }) => {
  if (!translatedText) return null;

  return (
    <div className="mt-8 space-y-6">
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Translation Result</h3>
        
        {/* Original Text */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Original Text</label>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap">{originalText}</p>
          </div>
        </div>

        {/* Translated Text */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Translated Text</label>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-800 whitespace-pre-wrap">{translatedText}</p>
          </div>
        </div>

        {/* Word Count */}
        <div className="text-sm text-gray-500 text-center">
          Words translated: {translatedText.split(/\s+/).filter(word => word.length > 0).length}
        </div>
      </div>
    </div>
  );
};

export default TranslationResult;
