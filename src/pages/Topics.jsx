import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getNewsByCategory } from "../utils/api";
import LoadingIndicator from "../components/LoadingIndicator";
import CategoryCard from "../components/CategoryCard";

export default function Topics() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const newsCategories = [
    {
      id: "business",
      name: "Business",
      description:
        "Latest business news, market updates, and corporate stories from around the world.",
      icon: "💼",
      color: "bg-primary",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      description:
        "Celebrity news, movie releases, TV shows, and entertainment industry updates.",
      icon: "🎬",
      color: "bg-secondary",
    },
    {
      id: "general",
      name: "General",
      description:
        "General news coverage including politics, society, and current events.",
      icon: "📰",
      color: "bg-neutral",
    },
    {
      id: "health",
      name: "Health",
      description:
        "Health news, medical breakthroughs, wellness tips, and healthcare updates.",
      icon: "🏥",
      color: "bg-success",
    },
    {
      id: "science",
      name: "Science",
      description:
        "Scientific discoveries, research findings, and technology innovations.",
      icon: "🔬",
      color: "bg-info",
    },
    {
      id: "sports",
      name: "Sports",
      description:
        "Sports news, match results, player updates, and athletic achievements.",
      icon: "⚽",
      color: "bg-warning",
    },
    {
      id: "technology",
      name: "Technology",
      description:
        "Tech news, gadget reviews, software updates, and digital innovation.",
      icon: "💻",
      color: "bg-accent",
    },
  ];

  useEffect(() => {
    const fetchCategoriesWithArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const categoriesWithData = await Promise.all(
          newsCategories.map(async (category) => {
            try {
              const data = await getNewsByCategory(category.id, {
                pageSize: 1,
              });
              return {
                ...category,
                articleCount: data.totalResults || 0,
                hasArticles: data.articles && data.articles.length > 0,
              };
            } catch (error) {
              console.warn(`Failed to fetch data for ${category.name}:`, error);
              return { ...category, articleCount: 0, hasArticles: false };
            }
          })
        );

        setCategories(categoriesWithData);
      } catch (error) {
        setError(`Failed to load categories: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesWithArticles();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-base-200 py-8 md:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold">News Categories</h1>
          <p className="py-4 md:py-6 text-base-content/70">
            Explore news organized by categories to find stories that interest
            you most
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
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
            <LoadingIndicator size="lg" text="Loading categories..." />
          ) : (
            <>
              <p className="text-center text-base-content/60 mb-8 md:mb-12">
                Choose from our diverse selection of news categories to stay
                informed about topics you care about.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>

              <div className="text-center mt-8 md:mt-12">
                <Link to="/" className="btn btn-neutral">
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
                  Back to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
