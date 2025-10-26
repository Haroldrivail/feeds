// Helper function to retry failed fetch requests
export const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.warn(`Fetch attempt ${i + 1} failed. Retrying in ${delay}ms...`, error);
      lastError = error;

      await new Promise(resolve => setTimeout(resolve, delay));

      delay *= 2;
    }
  }
  
  throw lastError;
};

const apiCache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes for news articles

export const fetchWithCache = async (url, forceRefresh = false) => {
  const now = Date.now();
  const cacheKey = url;
  
  if (!forceRefresh && apiCache.has(cacheKey)) {
    const cachedData = apiCache.get(cacheKey);
    if (now - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }
  }
  
  const data = await fetchWithRetry(url);
  
  apiCache.set(cacheKey, {
    data,
    timestamp: now
  });
  
  return data;
};

// News API configuration
const NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Helper function to build News API URLs
const buildNewsApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${NEWS_API_BASE_URL}${endpoint}`);
  
  // Add API key
  url.searchParams.append('apiKey', NEWS_API_KEY);
  
  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  });
  
  return url.toString();
};

// Fetch news articles based on search query
export const searchNews = async (query, options = {}) => {
  const {
    language = 'en',
    sortBy = 'publishedAt',
    pageSize = 20,
    page = 1,
    sources = null,
    domains = null,
    from = null,
    to = null
  } = options;

  try {
    const url = buildNewsApiUrl('/everything', {
      q: query,
      language,
      sortBy,
      pageSize,
      page,
      sources,
      domains,
      from,
      to
    });

    const data = await fetchWithCache(url);
    
    if (data.status === 'error') {
      throw new Error(data.message || 'News API error');
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// Fetch top headlines
export const getTopHeadlines = async (options = {}) => {
  const {
    country = 'us',
    category = null,
    sources = null,
    pageSize = 20,
    page = 1
  } = options;

  try {
    const url = buildNewsApiUrl('/top-headlines', {
      country: sources ? null : country, // Don't use country if sources are specified
      category,
      sources,
      pageSize,
      page
    });

    const data = await fetchWithCache(url);
    
    if (data.status === 'error') {
      throw new Error(data.message || 'News API error');
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
};

// Fetch news by category
export const getNewsByCategory = async (category, options = {}) => {
  return getTopHeadlines({
    ...options,
    category
  });
};

// Fetch available news sources
export const getNewsSources = async (options = {}) => {
  const {
    category = null,
    language = 'en',
    country = null
  } = options;

  try {
    const url = buildNewsApiUrl('/sources', {
      category,
      language,
      country
    });

    const data = await fetchWithCache(url);
    
    if (data.status === 'error') {
      throw new Error(data.message || 'News API error');
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching news sources:", error);
    throw error;
  }
};

// Get trending topics based on recent popular searches
export const getTrendingTopics = async () => {
  try {
    // Get top headlines from various categories to determine trending topics
    const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
    const trendingData = [];

    for (const category of categories) {
      try {
        const data = await getTopHeadlines({ 
          category, 
          pageSize: 5 
        });
        
        if (data.articles && data.articles.length > 0) {
          trendingData.push({
            category,
            articles: data.articles,
            count: data.totalResults
          });
        }
      } catch (error) {
        console.warn(`Failed to fetch trending topics for ${category}:`, error);
      }
    }

    return trendingData;
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    return [];
  }
};

// Helper function to extract keywords from articles for search suggestions
export const extractKeywords = (articles) => {
  if (!articles || !Array.isArray(articles)) return [];

  const keywords = new Set();
  
  articles.forEach(article => {
    if (article.title) {
      // Extract meaningful words from titles (excluding common words)
      const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
      
      const words = article.title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.includes(word));
      
      words.forEach(word => keywords.add(word));
    }
  });

  return Array.from(keywords).slice(0, 10); // Return top 10 keywords
};

// Format date for News API queries
export const formatDateForAPI = (date) => {
  if (!date) return null;
  
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

// Get relative time string
export const getRelativeTime = (dateString) => {
  if (!dateString) return 'Unknown time';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
};