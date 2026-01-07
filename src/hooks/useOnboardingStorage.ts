import { useCallback, useState } from 'react';
import { ONBOARDING_CONFIG } from '../config/onboarding';

interface OnboardingState {
  hasSeenWelcome: boolean;
  hasTourCompleted: boolean;
}

/**
 * Hook for managing onboarding state in sessionStorage
 * Uses session-based storage so welcome appears on every new browser session
 */
export const useOnboardingStorage = () => {
  const [state, setState] = useState<OnboardingState>(() => {
    // Initialize from sessionStorage - resets on new browser session
    const hasSeenWelcome =
      sessionStorage.getItem(ONBOARDING_CONFIG.STORAGE_KEYS.WELCOME_SEEN) === 'true';
    const hasTourCompleted =
      sessionStorage.getItem(ONBOARDING_CONFIG.STORAGE_KEYS.TOUR_COMPLETED) === 'true';

    return {
      hasSeenWelcome,
      hasTourCompleted,
    };
  });

  const markWelcomeSeen = useCallback(() => {
    sessionStorage.setItem(ONBOARDING_CONFIG.STORAGE_KEYS.WELCOME_SEEN, 'true');
    setState((prev) => ({ ...prev, hasSeenWelcome: true }));
  }, []);

  const markTourCompleted = useCallback(() => {
    sessionStorage.setItem(ONBOARDING_CONFIG.STORAGE_KEYS.TOUR_COMPLETED, 'true');
    setState((prev) => ({ ...prev, hasTourCompleted: true }));
  }, []);

  const resetOnboarding = useCallback(() => {
    sessionStorage.removeItem(ONBOARDING_CONFIG.STORAGE_KEYS.WELCOME_SEEN);
    sessionStorage.removeItem(ONBOARDING_CONFIG.STORAGE_KEYS.TOUR_COMPLETED);
    setState({
      hasSeenWelcome: false,
      hasTourCompleted: false,
    });
  }, []);

  return {
    hasSeenWelcome: state.hasSeenWelcome,
    hasTourCompleted: state.hasTourCompleted,
    markWelcomeSeen,
    markTourCompleted,
    resetOnboarding,
  };
};
