
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
      lastError = error;

      await new Promise((resolve) => setTimeout(resolve, delay));

      delay *= 2;
    }
  }

  throw lastError;
};

const apiCache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; 

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
    timestamp: now,
  });

  return data;
};



const IS_PRODUCTION = import.meta.env.PROD;
const API_PROXY = "/api/news";
const NEWS_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const NEWS_API_KEY = import.meta.env.VITE_API_KEY;


const buildNewsApiUrl = (endpoint, params = {}) => {
  
  if (IS_PRODUCTION) {
    const url = new URL(API_PROXY, window.location.origin);
    url.searchParams.append("endpoint", endpoint);

    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value);
      }
    });

    return url.toString();
  }

  
  const url = new URL(`${NEWS_API_BASE_URL}${endpoint}`);

  
  url.searchParams.append("apiKey", NEWS_API_KEY);

  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};


export const searchNews = async (query, options = {}) => {
  const {
    language = "en",
    sortBy = "publishedAt",
    pageSize = 20,
    page = 1,
    sources = null,
    domains = null,
    from = null,
    to = null,
  } = options;

  try {
    const url = buildNewsApiUrl("/everything", {
      q: query,
      language,
      sortBy,
      pageSize,
      page,
      sources,
      domains,
      from,
      to,
    });

    const data = await fetchWithCache(url);

    if (data.status === "error") {
      throw new Error(data.message || "News API error");
    }

    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};


export const getTopHeadlines = async (options = {}) => {
  const {
    country = "us",
    category = null,
    sources = null,
    pageSize = 20,
    page = 1,
  } = options;

  try {
    const url = buildNewsApiUrl("/top-headlines", {
      country: sources ? null : country, 
      category,
      sources,
      pageSize,
      page,
    });

    const data = await fetchWithCache(url);

    if (data.status === "error") {
      throw new Error(data.message || "News API error");
    }

    return data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
};


export const getNewsByCategory = async (category, options = {}) => {
  return getTopHeadlines({
    ...options,
    category,
  });
};
