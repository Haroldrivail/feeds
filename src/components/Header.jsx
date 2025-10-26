import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const { theme, toggleTheme } = useTheme();
  
  // Set active menu based on current location
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveMenu('home');
    else if (path.startsWith('/topics')) setActiveMenu('topics');
  }, [location.pathname]);
  
  // Close menu when clicking outside or when route changes
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');
      const themeButton = document.getElementById('theme-button');
      
      if (
        menuOpen && 
        mobileMenu && 
        !mobileMenu.contains(event.target) && 
        menuButton && 
        !menuButton.contains(event.target) &&
        themeButton &&
        !themeButton.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);
  
  return (
    <nav className="py-3 px-4 md:px-6 bg-gray-800 dark:bg-gray-900 flex items-center justify-between text-white shadow-md relative z-20">
      <Link to="/" className="text-2xl font-semibold flex items-center">
        <span className="text-gray-400 dark:text-gray-500 mr-1">News</span>
        <span>Feeds</span>
      </Link>
      
      <div className="flex items-center gap-2">
        {/* Theme toggle button */}
        <button
          id="theme-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
          }}
          className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-md hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors focus:outline-none"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          type="button"
        >
          {theme === 'dark' ? (
            // Sun icon - shows in dark mode
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            // Moon icon - shows in light mode
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
        
        {/* Mobile menu button */}
        <button 
          id="menu-button"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Desktop navigation */}
      <div 
        id="mobile-menu"
        className={`md:flex md:items-center md:space-x-1 ${
          menuOpen 
            ? 'absolute top-full right-0 left-0 flex flex-col bg-gray-800 dark:bg-gray-900 shadow-xl border-t border-gray-700 dark:border-gray-600 z-20 animate-fade-in-down'
            : 'hidden'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive 
                ? 'text-gray-300 dark:text-gray-400 py-3 px-4 border-b border-gray-700 dark:border-gray-600 md:border-none relative'
                : 'text-white hover:bg-gray-700 dark:hover:bg-gray-800 py-3 px-4 border-b border-gray-700 dark:border-gray-600 md:border-none md:hover:bg-transparent md:hover:text-gray-300 dark:md:hover:text-gray-400 transition-colors'
            }
            onClick={() => setMenuOpen(false)} 
          >
            Home
            {activeMenu === 'home' && (
              <span className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400 dark:bg-gray-500 transform origin-left animate-growFromLeft" />
            )}
          </NavLink>
          <NavLink 
            to="/topics" 
            className={({isActive}) => 
              isActive 
                ? 'text-gray-300 dark:text-gray-400 py-3 px-4 border-b border-gray-700 dark:border-gray-600 md:border-none relative'
                : 'text-white hover:bg-gray-700 dark:hover:bg-gray-800 py-3 px-4 border-b border-gray-700 dark:border-gray-600 md:border-none md:hover:bg-transparent md:hover:text-gray-300 dark:md:hover:text-gray-400 transition-colors'
            }
            onClick={() => setMenuOpen(false)}
          >
            Categories
            {activeMenu === 'topics' && (
              <span className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400 dark:bg-gray-500 transform origin-left animate-growFromLeft" />
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}