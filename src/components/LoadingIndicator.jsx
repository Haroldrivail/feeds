import React from "react";

export default function LoadingIndicator({ size = "lg", text = "Loading..." }) {
  const sizeClasses = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <span
        className={`loading loading-spinner ${
          sizeClasses[size] || sizeClasses.lg
        }`}
      ></span>
      {text && <p className="mt-4 text-base-content/70">{text}</p>}
    </div>
  );
}
