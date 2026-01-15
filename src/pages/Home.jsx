import React, { useState, useEffect, useRef } from "react";
import FeedCard from "../components/FeedCard";
import SkeletonLoader from "../components/SkeletonLoader";
import LoadingIndicator from "../components/LoadingIndicator";
import SearchForm from "../components/SearchForm";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { searchNews, getTopHeadlines } from "../utils/api";

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
      setHasMore(
        newArticles.length === pageSize &&
          updatedArticles.length < (data.totalResults || 0)
      );
      setHeading("Latest News");
    } catch {
      setError(`Error fetching news`);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchTopHeadlines(1, false);
  }, []);

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
        setHasMore(
          newArticles.length === pageSize &&
            updatedArticles.length < (data.totalResults || 0)
        );
      }
    } catch (error) {
      setError(`Failed to search news: ${error.message}`);
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
      fetchTopHeadlines(nextPage, true);
    }
  };

  useInfiniteScroll(loadMore, hasMore, isLoading || isLoadingMore);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-base-200 py-8 md:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Stay Informed with Latest News
          </h1>
          <p className="py-4 md:py-6 text-base-content/70">
            Discover breaking news, trending stories, and in-depth articles from
            trusted sources around the world.
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
      </section>

      {/* News Results Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">
            {heading}
          </h2>

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
              {articles.length === 0 && !isLoading && search && (
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
                    No articles found matching your search
                  </p>
                  <button
                    onClick={() => fetchTopHeadlines(1, false)}
                    className="btn btn-primary"
                  >
                    Show Latest News
                  </button>
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

              {isLoadingMore && (
                <LoadingIndicator size="md" text="Loading more articles..." />
              )}

              {articles.length > 0 && !isLoadingMore && (
                <p className="text-center text-base-content/50 mt-6 md:mt-8 text-sm md:text-base">
                  {hasMore
                    ? `Showing ${
                        articles.length
                      } of ${totalResults.toLocaleString()} articles - Scroll for more`
                    : `Showing all ${articles.length} articles`}
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
