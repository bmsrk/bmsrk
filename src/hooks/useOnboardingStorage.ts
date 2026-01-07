import { useCallback, useState, useEffect } from 'react';
import { ONBOARDING_CONFIG } from '../config/onboarding';

interface OnboardingState {
  hasSeenWelcome: boolean;
  hasTourCompleted: boolean;
}

/**
 * Hook for managing onboarding state in localStorage
 * Uses versioned keys to allow fresh onboarding flows
 */
export const useOnboardingStorage = () => {
  const [state, setState] = useState<OnboardingState>(() => {
    // Initialize from localStorage
    const hasSeenWelcome =
      localStorage.getItem(ONBOARDING_CONFIG.STORAGE_KEYS.WELCOME_SEEN) === 'true';
    const hasTourCompleted =
      localStorage.getItem(ONBOARDING_CONFIG.STORAGE_KEYS.TOUR_COMPLETED) === 'true';

    return {
      hasSeenWelcome,
      hasTourCompleted,
    };
  });

  const markWelcomeSeen = useCallback(() => {
    localStorage.setItem(ONBOARDING_CONFIG.STORAGE_KEYS.WELCOME_SEEN, 'true');
    setState((prev) => ({ ...prev, hasSeenWelcome: true }));
  }, []);

  const markTourCompleted = useCallback(() => {
    localStorage.setItem(ONBOARDING_CONFIG.STORAGE_KEYS.TOUR_COMPLETED, 'true');
    setState((prev) => ({ ...prev, hasTourCompleted: true }));
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(ONBOARDING_CONFIG.STORAGE_KEYS.WELCOME_SEEN);
    localStorage.removeItem(ONBOARDING_CONFIG.STORAGE_KEYS.TOUR_COMPLETED);
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
