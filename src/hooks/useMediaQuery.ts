import { useState, useEffect } from "react";

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * Useful for responsive logic that can't be handled with CSS alone.
 *
 * @param query - CSS media query string, e.g. "(min-width: 768px)"
 * @returns Whether the media query currently matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
