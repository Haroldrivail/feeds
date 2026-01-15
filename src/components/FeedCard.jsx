import React from "react";

export default function FeedCard({ article, highlightText = "" }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const highlightMatch = (text) => {
    if (!highlightText || !text) return text;
    const regex = new RegExp(`(${highlightText})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-warning text-warning-content px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <figure className="relative h-48 overflow-hidden">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`w-full h-full bg-base-300 flex items-center justify-center ${
            article.urlToImage ? "hidden" : "flex"
          }`}
        >
          <svg
            className="w-12 h-12 text-base-content/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            ></path>
          </svg>
        </div>
        {article.source?.name && (
          <div className="absolute top-2 left-2">
            <span className="badge badge-primary badge-sm">
              {article.source.name}
            </span>
          </div>
        )}
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2">
          {highlightMatch(article.title)}
        </h2>
        <p className="text-base-content/70 text-sm line-clamp-3">
          {highlightMatch(truncateText(article.description, 120))}
        </p>
        <div className="flex items-center justify-between mt-4 text-xs text-base-content/50">
          <span>{formatDate(article.publishedAt)}</span>
          {article.author && (
            <span className="truncate max-w-[120px]">By {article.author}</span>
          )}
        </div>
        <div className="card-actions justify-end mt-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Read More
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
