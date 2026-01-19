import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing timers with automatic cleanup
 * Provides stable references for setTimeout operations
 */
export const useTimer = () => {
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const setTimer = useCallback((callback: () => void, delay: number) => {
    clearTimer();
    timeoutRef.current = window.setTimeout(callback, delay);
  }, [clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return { setTimer, clearTimer };
};
