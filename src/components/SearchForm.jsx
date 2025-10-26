import React, { useEffect, useRef, useState } from 'react';

/**
 * SearchForm component for searching news articles
 * @component
 * @param {Object} props - The component props
 * @param {string} props.search - The search query
 * @param {function} props.setSearch - Function to update the search query
 * @param {function} props.handleSearch - Function to handle the search action
 * @param {boolean} props.autoFocus - Whether to auto-focus input on mount (default: false)
 * @param {number} props.debounceMs - Debounce delay in milliseconds (default: 800)
 * @returns 
 */
export default function SearchForm({ 
  search, 
  setSearch, 
  handleSearch, 
  autoFocus = false,
  debounceMs = 800 
}) {
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onSearch = (e) => {
    e.preventDefault();
    
    // Clear any pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    
    setIsSearching(true);
    handleSearch(search);
    
    // Show searching state briefly for better feedback
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Don't search if empty
    if (!value.trim()) {
      setIsSearching(false);
      debounceTimerRef.current = setTimeout(() => {
        handleSearch(''); // Trigger with empty to reset
        setIsSearching(false);
      }, debounceMs);
      return;
    }
    
    setIsSearching(true);
    
    // Set new timer to debounce search
    debounceTimerRef.current = setTimeout(() => {
      handleSearch(value);
      setIsSearching(false);
    }, debounceMs);
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
    
    // Cleanup debounce timer
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [autoFocus]);

  return (
    <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          name='search'
          ref={inputRef}
          value={search}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search news articles..."
          className={`w-full px-4 py-3 pl-12 border-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-colors ${
            isFocused ? 'border-gray-400 dark:border-gray-500' : 'border-gray-200 dark:border-gray-700'
          }`}
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className={`w-5 h-5 ${isSearching ? 'text-gray-600 dark:text-gray-400 animate-pulse' : 'text-gray-400 dark:text-gray-500'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      <button
        type="submit"
        className={`px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
          isSearching ? 'opacity-75' : ''
        }`}
        disabled={isSearching}
      >
        {isSearching ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching...
          </>
        ) : (
          'Search'
        )}
      </button>
    </form>
  );
}