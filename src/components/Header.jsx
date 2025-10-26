import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  
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
      
      if (
        menuOpen && 
        mobileMenu && 
        !mobileMenu.contains(event.target) && 
        menuButton && 
        !menuButton.contains(event.target)
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
    <nav className="py-3 px-4 md:px-6 bg-gray-800 flex items-center justify-between text-white shadow-md relative z-20">
      <Link to="/" className="text-2xl font-semibold flex items-center">
        <span className="text-gray-400 mr-1">News</span>
        <span>Feeds</span>
      </Link>
      
      {/* Mobile menu button */}
      <button 
        id="menu-button"
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-700 transition-colors focus:outline-none"
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
            ? 'absolute top-full right-0 left-0 flex flex-col bg-gray-800 shadow-xl border-t border-gray-700 z-20 animate-fade-in-down'
            : 'hidden'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive 
                ? 'text-gray-300 py-3 px-4 border-b border-gray-700 md:border-none relative'
                : 'text-white hover:bg-gray-700 py-3 px-4 border-b border-gray-700 md:border-none md:hover:bg-transparent md:hover:text-gray-300 transition-colors'
            }
            onClick={() => setMenuOpen(false)} 
          >
            Home
            {activeMenu === 'home' && (
              <span className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400 transform origin-left animate-growFromLeft" />
            )}
          </NavLink>
          <NavLink 
            to="/topics" 
            className={({isActive}) => 
              isActive 
                ? 'text-gray-300 py-3 px-4 border-b border-gray-700 md:border-none relative'
                : 'text-white hover:bg-gray-700 py-3 px-4 border-b border-gray-700 md:border-none md:hover:bg-transparent md:hover:text-gray-300 transition-colors'
            }
            onClick={() => setMenuOpen(false)}
          >
            Categories
            {activeMenu === 'topics' && (
              <span className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400 transform origin-left animate-growFromLeft" />
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}