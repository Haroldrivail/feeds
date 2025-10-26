import React, { useState } from 'react';

export default function FeedCard({ article, highlightText }) {
    const CHARACTER_LIMIT = 150;
    const [isHovered, setIsHovered] = useState(false);

    const handleArticleClick = () => {
        if (article.url) {
            window.open(article.url, '_blank', 'noopener,noreferrer');
        }
    };

    // Function to highlight search terms in text
    const highlightTextInContent = (text) => {
        if (!highlightText || !text || !text.toLowerCase().includes(highlightText.toLowerCase())) {
            return text;
        }

        const regex = new RegExp(`(${highlightText})`, 'gi');
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlightText.toLowerCase() ?
                        <span key={i} className="text-gray-300 font-semibold">{part}</span> :
                        part
                )}
            </>
        );
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
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

    // Get fallback image if article image is not available
    const getImageSrc = () => {
        return article.urlToImage || '/placeholder-news.jpg';
    };

    return (
        <div
            className="w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
            onClick={handleArticleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                <img
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500"
                    style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                    src={getImageSrc()}
                    alt={article.title || 'News article'}
                    onError={(e) => {
                        e.target.src = '/placeholder-news.jpg';
                    }}
                />
                
                {/* Source badge */}
                {article.source?.name && (
                    <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-gray-600 bg-opacity-80 text-white text-xs rounded-full">
                            {article.source.name}
                        </span>
                    </div>
                )}

                {/* Published date */}
                <div className="absolute bottom-2 right-2">
                    <span className="px-2 py-1 bg-gray-900 bg-opacity-80 text-white text-xs rounded-full">
                        {formatDate(article.publishedAt)}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h2 className="text-lg font-bold text-white leading-tight mb-2 line-clamp-2">
                    {highlightText ? highlightTextInContent(article.title) : article.title}
                </h2>
                
                {article.description && (
                    <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                        {highlightText ? 
                            highlightTextInContent(
                                article.description.length > CHARACTER_LIMIT 
                                    ? `${article.description.slice(0, CHARACTER_LIMIT)}...`
                                    : article.description
                            ) :
                            article.description.length > CHARACTER_LIMIT 
                                ? `${article.description.slice(0, CHARACTER_LIMIT)}...`
                                : article.description
                        }
                    </p>
                )}

                {/* Author */}
                {article.author && (
                    <p className="mt-3 text-xs text-gray-500">
                        By {article.author}
                    </p>
                )}
                
                <div className={`mt-4 text-gray-300 font-medium opacity-0 transform translate-y-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : ''}`}>
                    Click to read full article
                </div>
            </div>
        </div>
    );
}