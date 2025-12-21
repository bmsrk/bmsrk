import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getSimsAudio } from '../utils/simsAudio';
import { useNaturalTyping } from './useNaturalTyping';

interface UseSpeakingAnimationOptions {
  text: string;
  isClippy?: boolean;
  enabled?: boolean;
  instant?: boolean;
  /** Total duration for both typing and audio animation in milliseconds. Synchronizes both animations. */
  durationMs?: number;
  onComplete?: () => void;
}

interface UseSpeakingAnimationResult {
  displayedText: string;
  isTyping: boolean;
  isSpeaking: boolean;
  isComplete: boolean;
}

/**
 * Custom hook that coordinates audio playback, typing animation, and visual "speaking" state
 * Used to create synchronized speaking animations for characters
 */
export const useSpeakingAnimation = ({
  text,
  isClippy = false,
  enabled = true,
  instant = false,
  durationMs,
  onComplete,
}: UseSpeakingAnimationOptions): UseSpeakingAnimationResult => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const simsAudio = useMemo(() => getSimsAudio(), []);
  const hasStartedRef = useRef(false);
  const currentTextRef = useRef(text);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Memoized callback for typing completion
  const handleTypingComplete = useCallback(() => {
    setIsSpeaking(false);
    simsAudio.stop();
    onCompleteRef.current?.();
  }, [simsAudio]);

  const { displayedText, isComplete } = useNaturalTyping({
    text,
    enabled,
    instant,
    durationMs,
    onComplete: handleTypingComplete,
  });

  // Handle text changes - reset audio tracking
  useEffect(() => {
    if (currentTextRef.current !== text) {
      currentTextRef.current = text;
      hasStartedRef.current = false;
      setIsSpeaking(false);
      simsAudio.stop();
    }
  }, [text, simsAudio]);

  // Start audio when enabled and text is available (skip if instant mode)
  useEffect(() => {
    if (!enabled || !text || instant) {
      setIsSpeaking(false);
      hasStartedRef.current = false;
      return;
    }

    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      setIsSpeaking(true);

      const pitch = isClippy ? 1.8 : 1.5;
      simsAudio.speak(text, pitch, isClippy, durationMs);
    }

    return () => {
      if (!isComplete) {
        simsAudio.stop();
        setIsSpeaking(false);
        hasStartedRef.current = false;
      }
    };
  }, [text, enabled, isClippy, isComplete, simsAudio, instant, durationMs]);

  return {
    displayedText,
    isTyping: !isComplete && enabled,
    isSpeaking: isSpeaking && !isComplete,
    isComplete,
  };
};
