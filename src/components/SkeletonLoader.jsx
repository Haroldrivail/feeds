import React from 'react';

export function CardSkeleton() {
  return (
    <div className="w-full bg-gray-800 dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-700 dark:bg-gray-800"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-700 dark:bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 dark:bg-gray-800 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(count).fill().map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export default function SkeletonLoader({ type = 'grid', count = 4 }) {
  switch (type) {
    case 'card':
      return <CardSkeleton />;
    case 'grid':
    default:
      return <GridSkeleton count={count} />;
  }
}
