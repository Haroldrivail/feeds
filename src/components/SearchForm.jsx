import React from "react";

export default function SearchForm({
  search,
  setSearch,
  handleSearch,
  autoFocus = false,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  const handleClear = () => {
    setSearch("");
    handleSearch("");
  };

  return (
    <form onSubmit={onSubmit} className="join w-full">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search news..."
          className="input input-bordered join-item w-full pr-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus={autoFocus}
        />
        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}
      </div>
      <button type="submit" className="btn btn-primary join-item">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span className="hidden sm:inline ml-2">Search</span>
      </button>
    </form>
  );
}
