import { Link } from 'react-router-dom';
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 dark:bg-black text-white">
      {/* Main footer content */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-gray-400 dark:text-gray-500 mr-1">News</span>
              <span>Feeds</span>
            </h3>
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              Discover breaking news, trending stories, and in-depth articles from trusted sources around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300 dark:text-gray-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 dark:text-gray-500 hover:text-gray-200 dark:hover:text-gray-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/topics" className="text-gray-400 dark:text-gray-500 hover:text-gray-200 dark:hover:text-gray-300 transition-colors">Categories</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300 dark:text-gray-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-gray-400 dark:text-gray-500">support@newsfeeds.demo</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-gray-400 dark:text-gray-500">+237 653 149 884</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-400 dark:text-gray-500">Bepanda, Douala, Cameroon</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} News Feeds. All rights reserved. Data provided by <a href="http://newsapi.org/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 dark:hover:text-gray-300 transition-colors">News API</a>
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/privacy-policy" className="text-gray-400 dark:text-gray-500 hover:text-gray-200 dark:hover:text-gray-300 text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-400 dark:text-gray-500 hover:text-gray-200 dark:hover:text-gray-300 text-sm transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="text-gray-400 dark:text-gray-500 hover:text-gray-200 dark:hover:text-gray-300 text-sm transition-colors">Sitemap</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-500 dark:text-gray-600 text-xs">
            <p>Developed by Harold Dongmo</p>
          </div>
        </div>
      </div>
    </footer>
  );
}