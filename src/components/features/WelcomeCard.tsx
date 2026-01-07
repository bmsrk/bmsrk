import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CloseIcon } from '../common/Icons';
import { ONBOARDING_CONFIG } from '../../config/onboarding';

interface WelcomeCardProps {
  onStartTour: () => void;
  onDismiss: () => void;
  profileImageSrc: string;
}

const WELCOME_MESSAGE =
  "Welcome! This is a working Dynamics 365 portfolio. Take a quick 60-second tour to see key highlights, or explore on your own.";

/**
 * Welcome card for recruiters
 * - Subtle backdrop overlay with dim effect
 * - No typing animation (static text)
 * - Auto-dismisses after 10s if not hovered
 * - Dismissible via ESC key
 * - Dismissible by clicking backdrop
 */
const WelcomeCard: React.FC<WelcomeCardProps> = ({
  onStartTour,
  onDismiss,
  profileImageSrc,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoDismissTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onDismissRef = useRef(onDismiss);
  const onStartTourRef = useRef(onStartTour);

  // Keep refs up to date
  useEffect(() => {
    onDismissRef.current = onDismiss;
    onStartTourRef.current = onStartTour;
  }, [onDismiss, onStartTour]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onDismissRef.current();
    }, 300);
  }, []);

  const handleStartTour = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onStartTourRef.current();
    }, 300);
  }, []);

  useEffect(() => {
    // Appear after short delay
    const appearTimer = setTimeout(() => {
      setIsVisible(true);
    }, ONBOARDING_CONFIG.WELCOME_CARD.APPEAR_DELAY_MS);

    return () => clearTimeout(appearTimer);
  }, []);

  // Auto-dismiss timer
  useEffect(() => {
    if (isVisible && !isHovered) {
      autoDismissTimerRef.current = setTimeout(() => {
        handleClose();
      }, ONBOARDING_CONFIG.WELCOME_CARD.AUTO_DISMISS_DELAY_MS);
    }

    return () => {
      if (autoDismissTimerRef.current) {
        clearTimeout(autoDismissTimerRef.current);
        autoDismissTimerRef.current = null;
      }
    };
  }, [isVisible, isHovered, handleClose]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  return (
    <>
      {/* Backdrop - Subtle dim effect (lighter than before) */}
      <div
        className="fixed inset-0 bg-black bg-opacity-15 z-[95] no-print transition-opacity duration-500 animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={cardRef}
        className={`fixed z-[100] no-print transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        } top-[30%] left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] sm:w-[500px] sm:max-w-[500px]`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        role="dialog"
        aria-modal="false"
        aria-labelledby="welcome-card-title"
      >
        {/* Card - Speech bubble style with enhanced visibility */}
        <div className="relative bg-white border-[4px] border-[#0078d4] rounded-lg shadow-[0_8px_32px_rgba(0,120,212,0.3)]">
          {/* Arrow pointing upward toward header/profile area */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-7 h-7 bg-white border-t-[4px] border-l-[4px] border-[#0078d4] transform rotate-45"></div>

        {/* Content */}
        <div className="p-5 pr-10">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close welcome card"
          >
            <CloseIcon className="w-4 h-4" />
          </button>

          {/* Profile Image in Card */}
          <div className="flex items-start gap-3 mb-4">
            <img
              src={profileImageSrc}
              alt="Bruno"
              className="w-14 h-14 rounded-full border-[3px] border-[#0078d4] object-cover object-[center_25%] shadow-md"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('profile.jpg')) {
                  target.src = 'https://github.com/bmsrk.png';
                }
              }}
            />
            <div className="flex-1">
              <h3
                id="welcome-card-title"
                className="text-base font-bold text-[#201f1e] mb-1"
              >
                Hi! I&apos;m Bruno 👋
              </h3>
              <div className="text-sm text-[#323130] leading-relaxed">
                {WELCOME_MESSAGE}
              </div>
            </div>
          </div>

          {/* Buttons - Always visible (no typing animation) */}
          <div className="flex gap-2 justify-end mt-4">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 text-sm font-semibold text-[#323130] bg-[#f3f2f1] hover:bg-[#edebe9] rounded transition-colors"
              aria-label="Not now, dismiss welcome card"
            >
              Not now
            </button>
            <button
              onClick={handleStartTour}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0078d4] hover:bg-[#106ebe] rounded transition-colors shadow-md"
              aria-label="Start 60 second tour"
            >
              Start 60s tour
            </button>
          </div>
        </div>

        {/* Auto-dismiss hint */}
        <div className="px-5 pb-3 text-xs text-gray-400 text-right">
          Auto-dismisses in 10s • Press ESC to close
        </div>
      </div>
      </div>
    </>
  );
};

export default WelcomeCard;
