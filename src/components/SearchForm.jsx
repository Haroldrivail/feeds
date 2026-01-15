import React from "react";
import { X, Search } from "lucide-react";

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
    <form onSubmit={onSubmit} className="join w-full max-w-full">
      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          placeholder="Search news..."
          className="input input-bordered join-item w-full pr-10 text-base md:text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus={autoFocus}
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle touch-manipulation"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary join-item touch-manipulation"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
        <span className="hidden sm:inline ml-2">Search</span>
      </button>
    </form>
  );
}
