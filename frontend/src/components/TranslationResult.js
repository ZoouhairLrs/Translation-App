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

        {/* Enhanced Statistics Display */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-sm font-medium text-blue-800 mb-3">Translation Statistics</h4>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Word Count */}
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {wordCount || translatedText.split(/\s+/).filter(word => word.length > 0).length}
              </div>
              <div className="text-xs text-blue-700 uppercase tracking-wide">Words</div>
            </div>
            
            {/* Character Count */}
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {translatedText.length}
              </div>
              <div className="text-xs text-indigo-700 uppercase tracking-wide">Characters</div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="flex items-center justify-between text-xs text-blue-600">
              <span>Original: {originalText.length} chars</span>
              <span>Translated: {translatedText.length} chars</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationResult;
