import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getSimsAudio } from '../utils/simsAudio';
import { useNaturalTyping } from './useNaturalTyping';

interface UseSpeakingAnimationOptions {
  text: string;
  isClippy?: boolean;
  enabled?: boolean;
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

  // Start audio when enabled and text is available
  useEffect(() => {
    if (!enabled || !text) {
      setIsSpeaking(false);
      hasStartedRef.current = false;
      return;
    }

    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      setIsSpeaking(true);

      const pitch = isClippy ? 1.8 : 1.5;
      simsAudio.speak(text, pitch, isClippy);
    }

    return () => {
      if (!isComplete) {
        simsAudio.stop();
        setIsSpeaking(false);
        hasStartedRef.current = false;
      }
    };
  }, [text, enabled, isClippy, isComplete, simsAudio]);

  return {
    displayedText,
    isTyping: !isComplete && enabled,
    isSpeaking: isSpeaking && !isComplete,
    isComplete,
  };
};
