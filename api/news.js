// Vercel serverless function to proxy News API requests
// Avoids CORS issues and keeps the API key secure

/* global process */
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

export default async function handler(req, res) {
    const { endpoint, ...params } = req.query;

    if (!endpoint) {
        return res.status(400).json({ error: "Missing endpoint parameter" });
    }

    // Build the News API URL
    const newsApiUrl = new URL(`${NEWS_API_BASE_URL}${endpoint}`);

    // Add the API key from environment variable
    newsApiUrl.searchParams.append("apiKey", process.env.NEWS_API_KEY);

    // Forward all other query parameters
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            newsApiUrl.searchParams.append(key, value);
        }
    });

    try {
        const response = await fetch(newsApiUrl.toString(), {
            headers: {
                "User-Agent": "NewsApp/1.0",
            },
        });

        const data = await response.json();

        // Set cache headers
        res.setHeader("Cache-Control", "public, max-age=300");
        return res.status(response.status).json(data);
    } catch (error) {
        console.error("News API error:", error);
        return res.status(500).json({
            error: "Failed to fetch news",
            message: error.message
        });
    }
}
