import React, { useState, useEffect, useRef } from 'react';
import FeedCard from '../components/FeedCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchForm from '../components/SearchForm';
import LoadingIndicator from '../components/LoadingIndicator';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { searchNews, getTopHeadlines } from '../utils/api';

export default function Home() {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState("Latest News");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 12;
  const searchQuery = useRef("");
  
  // Function to fetch top headlines
  const fetchTopHeadlines = async (page = 1, append = false) => {
    try {
      setError(null);
      if (!append) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      
      const data = await getTopHeadlines({ pageSize, page });
      const newArticles = data.articles || [];
      
      let updatedArticles;
      if (append) {
        updatedArticles = [...articles, ...newArticles];
        setArticles(updatedArticles);
      } else {
        updatedArticles = newArticles;
        setArticles(newArticles);
      }
      
      setTotalResults(data.totalResults || 0);
      setCurrentPage(page);
      // Fix: Use the correct total length after appending
      setHasMore(newArticles.length === pageSize && updatedArticles.length < (data.totalResults || 0));
      setHeading("Latest News");
    } catch (error) {
      setError(`Error fetching news: ${error.message}`);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };
  
  useEffect(() => {
    fetchTopHeadlines(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle search
  const handleSearch = async (query, page = 1, append = false) => {
    if (!query.trim()) {
      searchQuery.current = "";
      setCurrentPage(1);
      setHasMore(true);
      fetchTopHeadlines(1, false);
      return;
    }

    try {
      setError(null);
      if (!append) {
        setIsLoading(true);
        setCurrentPage(1);
        setHasMore(true);
      } else {
        setIsLoadingMore(true);
      }
      
      searchQuery.current = query;
      const data = await searchNews(query, { pageSize, page });
      const newArticles = data.articles || [];
      
      if (!newArticles || newArticles.length === 0) {
        setHeading(`No results found for "${query}"`);
        setArticles([]);
        setTotalResults(0);
        setHasMore(false);
      } else {
        setHeading(`Results for "${query}"`);
        let updatedArticles;
        if (append) {
          updatedArticles = [...articles, ...newArticles];
          setArticles(updatedArticles);
        } else {
          updatedArticles = newArticles;
          setArticles(newArticles);
        }
        setTotalResults(data.totalResults || 0);
        setCurrentPage(page);
        // Fix: Use the correct total length after appending
        setHasMore(newArticles.length === pageSize && updatedArticles.length < (data.totalResults || 0));
      }
    } catch (error) {
      setError(`Failed to search news: ${error.message}`);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Load more articles (infinite scroll)
  const loadMore = () => {
    if (isLoading || isLoadingMore || !hasMore) return;
    
    const nextPage = currentPage + 1;
    if (searchQuery.current) {
      handleSearch(searchQuery.current, nextPage, true);
    } else {
      fetchTopHeadlines(nextPage, true);
    }
  };

  // Use infinite scroll hook
  useInfiniteScroll(loadMore, hasMore, isLoading || isLoadingMore);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Stay Informed with Latest News
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
              Discover breaking news, trending stories, and in-depth articles from trusted sources around the world.
            </p>
            
            <div className="max-w-md mx-auto">
              <SearchForm
                search={search}
                setSearch={setSearch}
                handleSearch={(query) => handleSearch(query, 1, false)}
                autoFocus={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Results Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {heading}
          </h2>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-8">
              {error}
            </div>
          )}

          {isLoading ? (
            <SkeletonLoader type="grid" count={12} />
          ) : (
            <>
              {articles.length === 0 && !isLoading && search && (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-600 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No articles found matching your search</p>
                  <button 
                    onClick={fetchTopHeadlines} 
                    className="px-6 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
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
              
              {/* Loading more indicator */}
              {isLoadingMore && (
                <div className="mt-8">
                  <LoadingIndicator />
                </div>
              )}
              
              {/* Results info */}
              {articles.length > 0 && !isLoadingMore && (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
                  {hasMore && totalResults === articles.lenght
                    ? `Showing ${articles.length} of ${totalResults.toLocaleString()} articles - Scroll for more`
                    : `Showing all ${articles.length} articles`
                  }
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}