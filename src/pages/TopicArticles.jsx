import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import FeedCard from "../components/FeedCard";
import SkeletonLoader from "../components/SkeletonLoader";
import SearchForm from "../components/SearchForm";
import LoadingIndicator from "../components/LoadingIndicator";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { getNewsByCategory, searchNews } from "../utils/api";

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

  const categoryNames = {
    business: "Business",
    entertainment: "Entertainment",
    general: "General News",
    health: "Health",
    science: "Science",
    sports: "Sports",
    technology: "Technology",
  };

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
      setHasMore(
        newArticles.length === pageSize &&
          updatedArticles.length < (data.totalResults || 0)
      );
      setHeading(`${categoryNames[topicId] || topicId} News`);
    } catch (error) {
      setError(
        `Failed to load ${categoryNames[topicId] || topicId} news: ${
          error.message
        }`
      );
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
      setSearch("");
    }
  }, [topicId]);

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
        setHeading(
          `No results found for "${query}" in ${
            categoryNames[topicId] || topicId
          }`
        );
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
        setHasMore(
          newArticles.length === pageSize &&
            updatedArticles.length < (data.totalResults || 0)
        );
      }
    } catch (error) {
      setError(`Failed to search: ${error.message}`);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (isLoading || isLoadingMore || !hasMore) return;

    const nextPage = currentPage + 1;
    if (searchQuery.current) {
      handleSearch(searchQuery.current, nextPage, true);
    } else {
      fetchCategoryArticles(nextPage, true);
    }
  };

  useInfiniteScroll(loadMore, hasMore, isLoading || isLoadingMore);

  return (
    <>
      {/* Header Section */}
      <section className="bg-base-200 py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="breadcrumbs text-sm mb-4 md:mb-6">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/topics">Categories</Link>
              </li>
              <li>{categoryNames[topicId] || topicId}</li>
            </ul>
          </div>

          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">{heading}</h1>

            {totalResults > 0 && (
              <p className="text-base-content/60 mb-4 md:mb-6">
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
      </section>

      {/* Articles Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="alert alert-error mb-6 md:mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {isLoading ? (
            <SkeletonLoader type="grid" count={12} />
          ) : (
            <>
              {articles.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <div className="text-base-content/30 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-base-content/50 text-lg mb-4">
                    {search
                      ? "No articles found matching your search"
                      : `No articles available in ${
                          categoryNames[topicId] || topicId
                        }`}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {search && (
                      <button
                        onClick={() => fetchCategoryArticles(1, false)}
                        className="btn btn-primary"
                      >
                        Show All {categoryNames[topicId] || topicId} News
                      </button>
                    )}
                    <Link to="/topics" className="btn btn-ghost">
                      Browse Other Categories
                    </Link>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
                <LoadingIndicator size="md" text="Loading more articles..." />
              )}

              {/* Results info and navigation */}
              {articles.length > 0 && !isLoadingMore && (
                <div className="text-center mt-6 md:mt-8">
                  <p className="text-base-content/50 mb-4 text-sm md:text-base">
                    {hasMore
                      ? `Showing ${
                          articles.length
                        } of ${totalResults.toLocaleString()} articles - Scroll for more`
                      : `Showing all ${articles.length} articles`}
                  </p>
                  <Link to="/topics" className="btn btn-neutral">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      ></path>
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
