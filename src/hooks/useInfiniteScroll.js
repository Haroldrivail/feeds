import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for infinite scroll functionality
 * Triggers callback when user scrolls near the bottom of the page
 * 
 * @param {Function} callback - Function to call when loading more content
 * @param {boolean} hasMore - Whether there's more content to load
 * @param {boolean} isLoading - Whether content is currently loading
 * @param {number} threshold - Distance from bottom (in pixels) to trigger loading (default: 300)
 */
export default function useInfiniteScroll(callback, hasMore, isLoading, threshold = 300) {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, callback]
  );

  useEffect(() => {
    const handleScroll = () => {

      if (isLoading || !hasMore) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;


      if (scrollHeight - scrollTop - clientHeight < threshold) {
        callback();
      }
    };

    let timeoutId;
    const throttledHandleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 200);
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [callback, hasMore, isLoading, threshold]);

  return lastElementRef;
}
