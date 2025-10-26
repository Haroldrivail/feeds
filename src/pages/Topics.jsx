import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import { Link } from 'react-router-dom';
import { getNewsByCategory } from '../utils/api';

export default function Topics() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // News categories available in News API
  const newsCategories = [
    {
      id: 'business',
      name: 'Business',
      description: 'Latest business news, market updates, and corporate stories from around the world.',
      icon: '💼',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      description: 'Celebrity news, movie releases, TV shows, and entertainment industry updates.',
      icon: '🎬',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'general',
      name: 'General',
      description: 'General news coverage including politics, society, and current events.',
      icon: '📰',
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'health',
      name: 'Health',
      description: 'Health news, medical breakthroughs, wellness tips, and healthcare updates.',
      icon: '🏥',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Scientific discoveries, research findings, and technology innovations.',
      icon: '🔬',
      color: 'from-teal-600 to-teal-800'
    },
    {
      id: 'sports',
      name: 'Sports',
      description: 'Sports news, match results, player updates, and athletic achievements.',
      icon: '⚽',
      color: 'from-orange-600 to-orange-800'
    },
    {
      id: 'technology',
      name: 'Technology',
      description: 'Tech news, gadget reviews, software updates, and digital innovation.',
      icon: '💻',
      color: 'from-indigo-600 to-indigo-800'
    }
  ];

  useEffect(() => {
    const fetchCategoriesWithArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch a few articles for each category to get article counts
        const categoriesWithData = await Promise.all(
          newsCategories.map(async (category) => {
            try {
              const data = await getNewsByCategory(category.id, { pageSize: 1 });
              return {
                ...category,
                articleCount: data.totalResults || 0,
                hasArticles: data.articles && data.articles.length > 0
              };
            } catch (error) {
              console.warn(`Failed to fetch data for ${category.name}:`, error);
              return {
                ...category,
                articleCount: 0,
                hasArticles: false
              };
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
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              News Categories
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Explore news organized by categories to find stories that interest you most
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-8 max-w-3xl mx-auto">
              {error}
            </div>
          )}

          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
                  Choose from our diverse selection of news categories to stay informed about topics you care about.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <Link
                    to={`/topics/${category.id}`}
                    key={category.id}
                    className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group hover:-translate-y-2 border border-gray-200 dark:border-gray-800"
                  >
                    <div className={`h-32 bg-linear-to-r ${category.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-6xl opacity-20 absolute -top-4 -right-4 transform rotate-12">
                        {category.icon}
                      </div>
                      <div className="text-4xl z-10">
                        {category.icon}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          {category.name}
                        </h2>
                        {category.articleCount > 0 && (
                          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                            {category.articleCount.toLocaleString()} articles
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                        {category.description}
                      </p>

                      <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                        <span>Explore {category.name.toLowerCase()}</span>
                        <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};