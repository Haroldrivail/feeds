import React from "react";

export default function SkeletonLoader({ type = "card", count = 1 }) {
  const renderCardSkeleton = () => (
    <div className="card bg-base-200 shadow-xl animate-pulse">
      <figure className="h-48 bg-base-300"></figure>
      <div className="card-body">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-3 w-full mt-2"></div>
        <div className="skeleton h-3 w-5/6"></div>
        <div className="flex justify-between mt-4">
          <div className="skeleton h-3 w-20"></div>
          <div className="skeleton h-3 w-24"></div>
        </div>
        <div className="card-actions justify-end mt-2">
          <div className="skeleton h-8 w-24"></div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="flex gap-4 p-4 bg-base-200 rounded-lg animate-pulse">
      <div className="skeleton w-24 h-24 rounded-lg"></div>
      <div className="flex-1">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-3/4 mt-2"></div>
        <div className="skeleton h-3 w-1/2 mt-4"></div>
      </div>
    </div>
  );

  const renderGridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderCardSkeleton()}</div>
      ))}
    </div>
  );

  if (type === "grid") {
    return renderGridSkeleton();
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>{renderListSkeleton()}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderCardSkeleton()}</div>
      ))}
    </div>
  );
}
