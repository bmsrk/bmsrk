import { useState, useEffect, useRef } from 'react';
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
  const simsAudio = getSimsAudio();
  const hasStartedRef = useRef(false);

  const { displayedText, isComplete, reset } = useNaturalTyping({
    text,
    enabled,
    onComplete: () => {
      setIsSpeaking(false);
      simsAudio.stop();
      if (onComplete) {
        onComplete();
      }
    },
  });

  useEffect(() => {
    if (!enabled || !text) {
      setIsSpeaking(false);
      hasStartedRef.current = false;
      return;
    }

    // Start speaking animation and audio
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      setIsSpeaking(true);

      // Play audio with appropriate voice
      // Bruno: pitch 1.5, Clippy: pitch 1.8 with isClippy flag
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
  }, [text, enabled, isClippy, isComplete]);

  // Reset when text changes
  useEffect(() => {
    hasStartedRef.current = false;
    reset();
  }, [text]);

  return {
    displayedText,
    isTyping: !isComplete && enabled,
    isSpeaking: isSpeaking && !isComplete,
    isComplete,
  };
};
