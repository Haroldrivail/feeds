// Netlify serverless function to proxy News API requests
// Avoids CORS issues and keeps the API key secure

const NEWS_API_BASE_URL = "https://newsapi.org/v2";

export default async (request) => {
    const url = new URL(request.url);
    const endpoint = url.searchParams.get("endpoint");

    if (!endpoint) {
        return new Response(JSON.stringify({ error: "Missing endpoint parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Build the News API URL
    const newsApiUrl = new URL(`${NEWS_API_BASE_URL}${endpoint}`);

    // Add the API key from environment variable
    newsApiUrl.searchParams.append("apiKey", process.env.NEWS_API_KEY);

    // Forward all other query parameters
    for (const [key, value] of url.searchParams.entries()) {
        if (key !== "endpoint" && value) {
            newsApiUrl.searchParams.append(key, value);
        }
    }

    try {
        const response = await fetch(newsApiUrl.toString(), {
            headers: {
                "User-Agent": "NewsApp/1.0",
            },
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=300",
            },
        });
    } catch (error) {
        console.error("News API error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch news", message: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};

export const config = {
    path: "/api/news",
};
