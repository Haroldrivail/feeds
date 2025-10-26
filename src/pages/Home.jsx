import React, { useState, useEffect } from 'react';
import FeedCard from '../components/FeedCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchForm from '../components/SearchForm';
import { searchNews, getTopHeadlines } from '../utils/api';

export default function Home() {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState("Latest News");
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to fetch top headlines
  const fetchTopHeadlines = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      const data = await getTopHeadlines({ pageSize: 12 });
      setArticles(data.articles || []);
      setHeading("Latest News");
    } catch (error) {
      console.error("Error fetching headlines:", error);
      setError(`Error fetching news: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  // Function to handle search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchTopHeadlines();
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      
      const data = await searchNews(query, { pageSize: 12 });
      
      if (!data.articles || data.articles.length === 0) {
        setHeading(`No results found for "${query}"`);
        setArticles([]);
      } else {
        setHeading(`Results for "${query}"`);
        setArticles(data.articles);
      }
    } catch (error) {
      console.error("Error searching news:", error);
      setError(`Failed to search news: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stay Informed with Latest News
            </h1>
            
            <p className="text-lg text-gray-600 mb-10">
              Discover breaking news, trending stories, and in-depth articles from trusted sources around the world.
            </p>
            
            <div className="max-w-md mx-auto">
              <SearchForm
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
                autoFocus={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {heading}
          </h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
              {error}
            </div>
          )}

          {isLoading ? (
            <SkeletonLoader type="grid" count={12} />
          ) : (
            <>
              {articles.length === 0 && !isLoading && search && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg mb-4">No articles found matching your search</p>
                  <button 
                    onClick={fetchTopHeadlines} 
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Show Latest News
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {articles.map((article, index) => (
                  <FeedCard 
                    key={`${article.url}-${index}`} 
                    article={article}
                    highlightText={search}
                  />
                ))}
              </div>
              
              {articles.length > 0 && (
                <p className="text-center text-gray-500 mt-8">
                  Showing {articles.length} articles
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}