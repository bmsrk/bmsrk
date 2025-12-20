import { useState, useEffect, useRef } from 'react';

interface UseNaturalTypingOptions {
  text: string;
  onComplete?: () => void;
  enabled?: boolean;
}

interface UseNaturalTypingResult {
  displayedText: string;
  isComplete: boolean;
  reset: () => void;
}

/**
 * Get natural typing delay based on current and next character
 * Mimics human/AI text generation with variable speeds and pauses
 */
const getTypingDelay = (currentChar: string, nextChar: string): number => {
  const baseDelay = 35;

  // Punctuation pauses (like taking a breath)
  if (['.', '!', '?'].includes(currentChar)) return baseDelay + 400 + Math.random() * 200;
  if ([',', ';', ':'].includes(currentChar)) return baseDelay + 150 + Math.random() * 100;

  // Word boundary (space) - slight hesitation
  if (currentChar === ' ') return baseDelay + 50 + Math.random() * 80;

  // Random "thinking" pause (1 in 30 chance)
  if (Math.random() < 0.033) return baseDelay + 200 + Math.random() * 300;

  // Speed burst - type faster occasionally (1 in 15 chance)
  if (Math.random() < 0.066) return baseDelay * 0.4;

  // Normal variation
  return baseDelay + Math.random() * 30 - 15; // 20-50ms range
};

/**
 * Custom hook for natural typing animation
 * Provides realistic typing effect with variable speeds, pauses, and hesitations
 */
export const useNaturalTyping = ({
  text,
  onComplete,
  enabled = true,
}: UseNaturalTypingOptions): UseNaturalTypingResult => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }

    // Reset state
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    const typeNextChar = () => {
      const currentIndex = indexRef.current;

      if (currentIndex >= text.length) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
        return;
      }

      // Add current character
      setDisplayedText(text.slice(0, currentIndex + 1));

      // Calculate delay for next character
      const currentChar = text[currentIndex] ?? '';
      const nextChar = text[currentIndex + 1] ?? '';
      const delay = getTypingDelay(currentChar, nextChar);

      indexRef.current++;
      timeoutRef.current = setTimeout(typeNextChar, delay);
    };

    // Start typing
    timeoutRef.current = setTimeout(typeNextChar, 100); // Small initial delay

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, enabled, onComplete]);

  const reset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;
  };

  return {
    displayedText,
    isComplete,
    reset,
  };
};
