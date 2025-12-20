import { useState, useCallback } from 'react';

export type WelcomeFlowState =
  | 'idle'
  | 'welcome_modal'
  | 'handoff_bruno_speaking'
  | 'handoff_clippy_speaking'
  | 'handoff_transition'
  | 'tour_active'
  | 'completed';

interface UseWelcomeFlowResult {
  state: WelcomeFlowState;
  startWelcome: () => void;
  dismissWelcome: () => void;
  startTour: () => void;
  startHandoff: () => void;
  advanceHandoff: () => void;
  completeTour: () => void;
  reset: () => void;
}

/**
 * State machine hook for managing the welcome flow
 * Controls the sequence: welcome modal → handoff → tour
 */
export const useWelcomeFlow = (): UseWelcomeFlowResult => {
  const [state, setState] = useState<WelcomeFlowState>('idle');

  const startWelcome = useCallback(() => {
    setState('welcome_modal');
  }, []);

  const dismissWelcome = useCallback(() => {
    setState('completed');
  }, []);

  const startTour = useCallback(() => {
    setState('handoff_bruno_speaking');
  }, []);

  const startHandoff = useCallback(() => {
    setState('handoff_bruno_speaking');
  }, []);

  const advanceHandoff = useCallback(() => {
    setState((current) => {
      switch (current) {
        case 'handoff_bruno_speaking':
          return 'handoff_transition';
        case 'handoff_transition':
          return 'handoff_clippy_speaking';
        case 'handoff_clippy_speaking':
          return 'tour_active';
        default:
          return current;
      }
    });
  }, []);

  const completeTour = useCallback(() => {
    setState('completed');
  }, []);

  const reset = useCallback(() => {
    setState('idle');
  }, []);

  return {
    state,
    startWelcome,
    dismissWelcome,
    startTour,
    startHandoff,
    advanceHandoff,
    completeTour,
    reset,
  };
};
