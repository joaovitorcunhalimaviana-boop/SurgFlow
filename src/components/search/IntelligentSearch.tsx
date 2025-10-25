'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Clock, Tag } from 'lucide-react';
import { buscarInteligente, SearchDataItem } from '@/data/searchData';

interface IntelligentSearchProps {
  onResultSelect?: (result: SearchDataItem) => void;
  placeholder?: string;
  className?: string;
  showCategories?: boolean;
}

const IntelligentSearch: React.FC<IntelligentSearchProps> = ({
  onResultSelect,
  placeholder = "Buscar por sintomas, keywords ou guidelines...",
  className = "",
  showCategories = true
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchDataItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Buscar resultados quando a query muda
  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = buscarInteligente(query);
      setResults(searchResults.slice(0, 8)); // Limitar a 8 resultados
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultSelect = (result: SearchDataItem) => {
    setQuery(result.guideline);
    setIsOpen(false);
    setSelectedIndex(-1);
    onResultSelect?.(result);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Cirurgia Geral': 'bg-blue-100 text-blue-800',
      'Cirurgia Hepatobiliar': 'bg-green-100 text-green-800',
      'Cirurgia Colorretal': 'bg-purple-100 text-purple-800',
      'Trauma': 'bg-red-100 text-red-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Input de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2 px-2">
              {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
            </div>
            
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleResultSelect(result)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  index === selectedIndex
                    ? 'bg-purple-50 border border-purple-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-purple-600 flex-shrink-0" />
                      <span className="font-medium text-gray-900 truncate">
                        {result.guideline}
                      </span>
                    </div>
                    
                    {/* Sintomas */}
                    {result.symptoms.length > 0 && (
                      <div className="mb-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Sintomas:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {result.symptoms.slice(0, 3).map((symptom, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                            >
                              {symptom}
                            </span>
                          ))}
                          {result.symptoms.length > 3 && (
                            <span className="text-xs text-gray-400">
                              +{result.symptoms.length - 3} mais
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Keywords */}
                    {result.keywords.length > 0 && (
                      <div className="mb-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Tag className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Keywords:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {result.keywords.slice(0, 4).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                          {result.keywords.length > 4 && (
                            <span className="text-xs text-gray-400">
                              +{result.keywords.length - 4} mais
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Categoria */}
                  {showCategories && (
                    <div className="ml-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(result.category)}`}>
                        {result.category}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem quando não há resultados */}
      {isOpen && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <div className="text-center text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Nenhum resultado encontrado para "{query}"</p>
            <p className="text-xs text-gray-400 mt-1">
              Tente buscar por sintomas como "dor abdominal" ou keywords como "murphy"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligentSearch;