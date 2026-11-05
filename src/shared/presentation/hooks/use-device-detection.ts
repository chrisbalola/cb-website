import { useMemo } from 'react';

interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  userAgent: string;
}

/**
 * Hook to detect device type based on user agent
 * @returns Device information object
 */
export function useDeviceDetection(): DeviceInfo {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        isIOS: false,
        isAndroid: false,
        isMobile: false,
        userAgent: '',
      };
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobile = isIOS || isAndroid;

    return {
      isIOS,
      isAndroid,
      isMobile,
      userAgent,
    };
  }, []);
}
