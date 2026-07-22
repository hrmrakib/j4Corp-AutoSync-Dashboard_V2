import { useEffect, type RefObject } from "react";

/**
 * Detects clicks outside a referenced element.
 * Useful for closing dropdowns, modals, and popovers.
 *
 * @param ref - React ref to the element to detect clicks outside of
 * @param handler - Callback invoked when a click outside is detected
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}
