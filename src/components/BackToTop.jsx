import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-50 group cursor-pointer"
          aria-label="Back to top"
        >
          {/* Circle progress indicator */}
          <div className="relative w-14 h-14 transition-transform duration-300 hover:scale-110">
            {/* Background circle */}
            <svg className="w-14 h-14" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="fill-gray-900 dark:fill-gray-800 stroke-gray-700 dark:stroke-gray-600 transition-colors"
                strokeWidth="2"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                className="stroke-gray-600 dark:stroke-gray-500 transition-colors"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`}
                transform="rotate(-90 50 50)"
                style={{
                  transition: 'stroke-dashoffset 0.1s ease-out'
                }}
              />
            </svg>
            
            {/* Arrow icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white dark:text-gray-100 transition-all duration-300 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
          </div>
        </button>
      )}
    </>
  );
}
