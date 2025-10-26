// Vercel Serverless Function to proxy News API requests
// This bypasses CORS restrictions by making requests from the server

export default async function handler(req, res) {
  // Enable CORS for your frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { endpoint, ...params } = req.query;

    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint parameter is required' });
    }

    // Build News API URL
    const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
    const NEWS_API_KEY = process.env.NEWS_API_KEY;

    if (!NEWS_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const url = new URL(`${NEWS_API_BASE_URL}${endpoint}`);
    url.searchParams.append('apiKey', NEWS_API_KEY);

    // Add other query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value);
      }
    });

    // Fetch from News API
    const response = await fetch(url.toString());
    const data = await response.json();

    // Return the data
    res.status(response.status).json(data);
  } catch (error) {
    console.error('News API proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message 
    });
  }
}
