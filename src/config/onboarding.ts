/**
 * Onboarding configuration for recruiter-focused experience
 */

export const ONBOARDING_CONFIG = {
  // Session-based keys - welcome shows on every new session
  STORAGE_KEYS: {
    WELCOME_SEEN: 'welcome_seen_session',
    TOUR_COMPLETED: 'tour_completed_session',
  },

  // Welcome card settings
  WELCOME_CARD: {
    AUTO_DISMISS_DELAY_MS: 10000, // 10 seconds
    APPEAR_DELAY_MS: 500, // Reduced from 1500ms for faster UX
  },

  // Recruiter tour settings
  RECRUITER_TOUR: {
    ESTIMATED_DURATION_SECONDS: 60,
    TYPING_DURATION_MS: 1000, // Faster than original pitch mode
    DEFAULT_AUDIO_ENABLED: false,
  },
} as const;
