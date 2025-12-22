import { useCallback, useRef, useEffect } from 'react';
import { useNaturalTyping } from './useNaturalTyping';

interface UseSpeakingAnimationOptions {
  text: string;
  isClippy?: boolean;
  enabled?: boolean;
  instant?: boolean;
  /** Total duration for typing animation in milliseconds. */
  durationMs?: number;
  onComplete?: () => void;
}

interface UseSpeakingAnimationResult {
  displayedText: string;
  isTyping: boolean;
  isComplete: boolean;
}

/**
 * Custom hook that manages typing animation
 * Note: Audio functionality has been removed. This hook now only handles typing animation.
 */
export const useSpeakingAnimation = ({
  text,
  isClippy: _isClippy = false, // Keep parameter for compatibility but don't use
  enabled = true,
  instant = false,
  durationMs,
  onComplete,
}: UseSpeakingAnimationOptions): UseSpeakingAnimationResult => {
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Memoized callback for typing completion
  const handleTypingComplete = useCallback(() => {
    onCompleteRef.current?.();
  }, []);

  const { displayedText, isComplete } = useNaturalTyping({
    text,
    enabled,
    instant,
    durationMs,
    onComplete: handleTypingComplete,
  });

  return {
    displayedText,
    isTyping: !isComplete && enabled,
    isComplete,
  };
};
