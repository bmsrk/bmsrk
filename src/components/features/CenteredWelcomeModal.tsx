import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSpeakingAnimation } from '../../hooks/useSpeakingAnimation';
import { getSimsAudio } from '../../utils/simsAudio';

interface CenteredWelcomeModalProps {
  onTakeTour: () => void;
  onDismiss: () => void;
  profileImageSrc: string;
}

const WELCOME_MESSAGE =
  "Built my portfolio as a working D365 interface. Figured if I'm going to claim expertise, might as well prove it up front. Clippy can show you around, or just click through - everything works.";

const CenteredWelcomeModal: React.FC<CenteredWelcomeModalProps> = ({
  onTakeTour,
  onDismiss,
  profileImageSrc,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const simsAudio = useMemo(() => getSimsAudio(), []);

  const { displayedText, isComplete, isSpeaking } = useSpeakingAnimation({
    text: WELCOME_MESSAGE,
    isClippy: false,
    enabled: isVisible, // Only start typing when modal is visible
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      simsAudio.stop(); // Ensure audio stops on unmount
    };
  }, [simsAudio]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 300);
  }, [onDismiss]);

  const handleTakeTour = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onTakeTour();
    }, 300);
  }, [onTakeTour]);

  // Handle ESC key
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
      {/* Full-screen backdrop - blocks interaction */}
      <div
        className={`fixed inset-0 bg-black z-[95] no-print transition-opacity duration-500 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
        role="presentation"
        aria-hidden="true"
      />

      {/* Centered Modal */}
      <div
        className={`fixed inset-0 z-[100] no-print flex items-center justify-center p-4 transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
      >
        <div className="relative max-w-lg w-full">
          {/* Profile Picture with Pulsing Ring */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={profileImageSrc}
                alt="Bruno's Profile"
                className={`w-32 h-32 rounded-full border-4 border-[#0078d4] object-cover object-[center_25%] ${
                  isSpeaking ? 'speaking-pulse' : ''
                }`}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('profile.jpg')) {
                    target.src = 'https://github.com/bmsrk.png';
                  }
                }}
              />
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="bg-white border-[3px] border-[#0078d4] rounded-lg shadow-2xl overflow-hidden rpg-dialog speech-bubble-appear">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#e1dfdd] bg-[#f3f2f1]">
              <h2 id="welcome-title" className="text-xl font-bold text-[#201f1e] flex items-center gap-2">
                <span>👋</span>
                <span>Hey there!</span>
              </h2>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="text-base text-[#323130] leading-relaxed min-h-[140px] mb-6">
                {displayedText}
                {!isComplete && (
                  <span className="inline-block w-1.5 h-5 bg-[#0078d4] ml-1 animate-pulse"></span>
                )}
              </div>

              {/* Buttons - Only show when typing is complete */}
              {isComplete && (
                <div className="flex gap-3 justify-end animate-fade-in">
                  <button
                    onClick={handleClose}
                    className="rpg-choice px-5 py-2.5 text-sm font-semibold text-[#323130] bg-[#f3f2f1] hover:bg-[#edebe9] rounded transition-colors"
                  >
                    I'm exploring
                  </button>
                  <button
                    onClick={handleTakeTour}
                    className="rpg-button px-5 py-2.5 text-sm font-semibold text-white bg-[#0078d4] hover:bg-[#106ebe] rounded transition-colors shadow-md"
                  >
                    Take the tour
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hint text */}
          <div className="text-center mt-4 text-sm text-white opacity-75">
            Press ESC to dismiss
          </div>
        </div>
      </div>
    </>
  );
};

export default CenteredWelcomeModal;
