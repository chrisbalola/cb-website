import { useEffect, useState } from 'react';

/**
 * Hook to check if component is mounted
 * For preventing hydration mismatches with SSR
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}
