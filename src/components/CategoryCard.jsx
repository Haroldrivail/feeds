import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/topics/${category.id}`}
      className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div
        className={`${category.color} h-32 flex items-center justify-center relative overflow-hidden rounded-t-2xl`}
      >
        <div className="text-6xl opacity-20 absolute -top-4 -right-4 transform rotate-12">
          {category.icon}
        </div>
        <div className="text-4xl z-10">{category.icon}</div>
      </div>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{category.name}</h2>
          {category.articleCount > 0 && (
            <span className="badge badge-ghost">
              {category.articleCount.toLocaleString()} articles
            </span>
          )}
        </div>
        <p className="text-base-content/70 line-clamp-3">
          {category.description}
        </p>
        <div className="card-actions justify-end mt-4">
          <span className="btn btn-ghost btn-sm">
            Explore {category.name.toLowerCase()}
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
