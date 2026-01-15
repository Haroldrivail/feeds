import React from "react";
import { Image as LucideImage, ExternalLink } from "lucide-react";

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
          <LucideImage className="w-12 h-12 text-base-content/30" />
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
            <span className="truncate max-w-[120px]">
              By {article.author}
            </span>
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
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
