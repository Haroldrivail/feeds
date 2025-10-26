import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import FeedCard from '../components/FeedCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchForm from '../components/SearchForm';
import LoadingIndicator from '../components/LoadingIndicator';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getNewsByCategory, searchNews } from '../utils/api';

export default function TopicArticles() {
  const { topicId } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [heading, setHeading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;
  const searchQuery = useRef("");

  // Category display names
  const categoryNames = {
    business: 'Business',
    entertainment: 'Entertainment',
    general: 'General News',
    health: 'Health',
    science: 'Science',
    sports: 'Sports',
    technology: 'Technology'
  };

  // Fetch articles for the category
  const fetchCategoryArticles = async (page = 1, append = false) => {
    try {
      if (!append) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      const data = await getNewsByCategory(topicId, { pageSize, page });
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
      setHeading(`${categoryNames[topicId] || topicId} News`);
    } catch (error) {
      setError(`Failed to load ${categoryNames[topicId] || topicId} news: ${error.message}`);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (topicId) {
      searchQuery.current = "";
      setCurrentPage(1);
      setHasMore(true);
      fetchCategoryArticles(1, false);
      setSearch(""); // Reset search when category changes
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  // Handle search within category
  const handleSearch = async (query, page = 1, append = false) => {
    if (!query.trim()) {
      searchQuery.current = "";
      setCurrentPage(1);
      setHasMore(true);
      fetchCategoryArticles(1, false);
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
        setHeading(`No results found for "${query}" in ${categoryNames[topicId] || topicId}`);
        setArticles([]);
        setTotalResults(0);
        setHasMore(false);
      } else {
        setHeading(`Search results for "${query}"`);
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
      setError(`Failed to search: ${error.message}`);
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
      fetchCategoryArticles(nextPage, true);
    }
  };

  // Use infinite scroll hook
  useInfiniteScroll(loadMore, hasMore, isLoading || isLoadingMore);

  return (
    <>
      {/* Header Section */}
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <Link to="/topics" className="ml-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 md:ml-2">Categories</Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 text-gray-900 dark:text-white md:ml-2">{categoryNames[topicId] || topicId}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {heading}
              </h1>

              {totalResults > 0 && (
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {totalResults.toLocaleString()} articles available
                </p>
              )}

              <div className="max-w-md mx-auto">
                <SearchForm
                  search={search}
                  setSearch={setSearch}
                  handleSearch={(query) => handleSearch(query, 1, false)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-8 max-w-3xl mx-auto">
              {error}
            </div>
          )}

          {isLoading ? (
            <SkeletonLoader type="grid" count={12} />
          ) : (
            <>
              {articles.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-600 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                    {search ? 'No articles found matching your search' : `No articles available in ${categoryNames[topicId] || topicId}`}
                  </p>
                  <div className="space-x-4">
                    {search && (
                      <button
                        onClick={fetchCategoryArticles}
                        className="px-6 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                      >
                        Show All {categoryNames[topicId] || topicId} News
                      </button>
                    )}
                    <Link
                      to="/topics"
                      className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                      Browse Other Categories
                    </Link>
                  </div>
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

              {/* Results info and navigation */}
              {articles.length > 0 && !isLoadingMore && (
                <div className="text-center mt-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {hasMore
                      ? `Showing ${articles.length} of ${totalResults.toLocaleString()} articles - Scroll for more`
                      : `Showing all ${articles.length} articles`
                    }
                  </p>
                  <Link
                    to="/topics"
                    className="inline-flex items-center px-6 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                    </svg>
                    Browse Other Categories
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}