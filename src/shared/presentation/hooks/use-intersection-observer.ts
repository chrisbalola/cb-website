import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * Whether the observer is currently enabled
   * @default true
   */
  enabled?: boolean;
  /**
   * Callback fired when intersection state changes
   */
  onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
}

/**
 * Hook to detect when an element enters or leaves the viewport
 */
function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(options: UseIntersectionObserverOptions = {}) {
  const { enabled = true, onChange, threshold = 0, root = null, rootMargin = '0px' } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        setEntry(entry);

        if (onChange) {
          onChange(isElementIntersecting, entry);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [enabled, threshold, root, rootMargin, onChange]);

  return {
    ref: elementRef,
    isIntersecting,
    entry,
  };
}

export { useIntersectionObserver };
