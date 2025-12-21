import { useState, useEffect, useRef, useCallback } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseNaturalTypingOptions {
  text: string;
  onComplete?: () => void;
  enabled?: boolean;
  instant?: boolean;
  /** Total duration for the typing animation in milliseconds. If provided, overrides natural timing. */
  durationMs?: number;
}

interface UseNaturalTypingResult {
  displayedText: string;
  isComplete: boolean;
  reset: () => void;
}

/**
 * Get natural typing delay based on current and next character
 * Mimics human/AI text generation with variable speeds and pauses
 * @param currentChar - The current character being typed
 * @param _nextChar - The next character (unused but kept for future enhancements)
 * @param fixedDelay - Optional fixed delay per character (overrides natural timing)
 */
const getTypingDelay = (currentChar: string, _nextChar: string, fixedDelay?: number): number => {
  // If a fixed delay is provided, use it with minimal variation for natural feel
  if (fixedDelay !== undefined) {
    // Add tiny variation (±10%) to avoid mechanical feel
    return fixedDelay * (0.9 + Math.random() * 0.2);
  }

  const baseDelay = 20; // Reduced from 35ms to 20ms for faster typing

  // Punctuation pauses (like taking a breath) - reduced pauses
  if (['.', '!', '?'].includes(currentChar)) return baseDelay + 250 + Math.random() * 100;
  if ([',', ';', ':'].includes(currentChar)) return baseDelay + 100 + Math.random() * 50;

  // Word boundary (space) - slight hesitation
  if (currentChar === ' ') return baseDelay + 30 + Math.random() * 40;

  // Random "thinking" pause (1 in 30 chance) - reduced
  if (Math.random() < 0.033) return baseDelay + 100 + Math.random() * 150;

  // Speed burst - type faster occasionally (1 in 15 chance)
  if (Math.random() < 0.066) return baseDelay * 0.5;

  // Normal variation - faster overall
  return baseDelay + Math.random() * 20 - 10; // 10-30ms range
};

/**
 * Custom hook for natural typing animation
 * Provides realistic typing effect with variable speeds, pauses, and hesitations
 * Respects user's reduced motion preference
 */
export const useNaturalTyping = ({
  text,
  onComplete,
  enabled = true,
  instant = false,
  durationMs,
}: UseNaturalTypingOptions): UseNaturalTypingResult => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const textRef = useRef(text);
  const onCompleteRef = useRef(onComplete);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Keep refs updated without triggering re-renders
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!enabled || !text) {
      setDisplayedText('');
      setIsComplete(false);
      indexRef.current = 0;
      return;
    }

    // Reset state for new text
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    // If user prefers reduced motion OR instant mode is enabled, show text immediately
    if (prefersReducedMotion || instant) {
      setDisplayedText(text);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    // Calculate fixed delay per character if durationMs is specified
    const fixedDelayPerChar = durationMs !== undefined && text.length > 0 
      ? durationMs / text.length 
      : undefined;

    const typeNextChar = () => {
      const currentIndex = indexRef.current;
      const currentText = textRef.current;

      if (currentIndex >= currentText.length) {
        setIsComplete(true);
        onCompleteRef.current?.();
        return;
      }

      setDisplayedText(currentText.slice(0, currentIndex + 1));

      const currentChar = currentText[currentIndex] ?? '';
      const nextChar = currentText[currentIndex + 1] ?? '';
      const delay = getTypingDelay(currentChar, nextChar, fixedDelayPerChar);

      indexRef.current++;
      timeoutRef.current = setTimeout(typeNextChar, delay);
    };

    // Start typing with small initial delay
    timeoutRef.current = setTimeout(typeNextChar, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, enabled, prefersReducedMotion, instant, durationMs]); // Added durationMs to deps

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;
  }, []);

  return {
    displayedText,
    isComplete,
    reset,
  };
};
