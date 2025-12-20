import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../common/Icons';
import { getSimsAudio } from '../../utils/simsAudio';

interface ProfileWelcomePopupProps {
  onTakeTour: () => void;
  onDismiss: () => void;
  profileImageSrc: string;
}

const WELCOME_MESSAGE =
  "Built my portfolio as a working D365 interface. Figured if I'm going to claim expertise, might as well prove it up front. Clippy can show you around, or just click through - everything works.";

const ProfileWelcomePopup: React.FC<ProfileWelcomePopupProps> = ({
  onTakeTour,
  onDismiss,
  profileImageSrc,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const simsAudio = getSimsAudio();

  useEffect(() => {
    // Delay appearance by 1.5 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      // Start typing animation
      startTypingAnimation();
    }, 1500);

    return () => {
      clearTimeout(showTimer);
      simsAudio.stop();
    };
  }, []);

  const startTypingAnimation = () => {
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    // Play Sims audio for the entire message
    simsAudio.speak(WELCOME_MESSAGE, 1.5);

    const typingInterval = setInterval(() => {
      if (currentIndex < WELCOME_MESSAGE.length) {
        setDisplayedText(WELCOME_MESSAGE.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, typingSpeed);
  };

  const handleClose = () => {
    simsAudio.stop();
    setIsVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  const handleTakeTour = () => {
    simsAudio.stop();
    setIsVisible(false);
    setTimeout(() => {
      onTakeTour();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-[95] no-print animate-fade-in"
        onClick={handleClose}
      />

      {/* Popup Container - Positioned near profile image */}
      <div
        className={`fixed z-[100] no-print transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        } top-[60px] right-4 sm:right-6 md:right-8 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px]`}
      >
        {/* Speech Bubble */}
        <div className="relative bg-white border-[3px] border-[#0078d4] rounded-lg shadow-2xl rpg-dialog">
          {/* Arrow pointing to profile image */}
          <div className="absolute -top-3 right-8 w-6 h-6 bg-white border-t-[3px] border-l-[3px] border-[#0078d4] transform rotate-45"></div>

          {/* Content */}
          <div className="p-5 pr-10">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close welcome message"
            >
              <CloseIcon className="w-4 h-4" />
            </button>

            {/* Profile Image in Bubble */}
            <div className="flex items-start gap-3 mb-4">
              <img
                src={profileImageSrc}
                alt="Bruno"
                className="w-12 h-12 rounded-full border-2 border-[#0078d4] object-cover object-[center_25%]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('profile.jpg')) {
                    target.src = 'https://github.com/bmsrk.png';
                  }
                }}
              />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-[#201f1e] mb-1">Hey there! 👋</h3>
                <div className="text-sm text-[#323130] leading-relaxed min-h-[120px]">
                  {displayedText}
                  {!isTypingComplete && (
                    <span className="inline-block w-1.5 h-4 bg-[#0078d4] ml-0.5 animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons - Only show when typing is complete */}
            {isTypingComplete && (
              <div className="flex gap-2 justify-end mt-4 animate-fade-in">
                <button
                  onClick={handleClose}
                  className="rpg-choice px-4 py-2 text-sm font-semibold text-[#323130] bg-[#f3f2f1] hover:bg-[#edebe9] rounded transition-colors"
                >
                  I'm exploring
                </button>
                <button
                  onClick={handleTakeTour}
                  className="rpg-button px-4 py-2 text-sm font-semibold text-white bg-[#0078d4] hover:bg-[#106ebe] rounded transition-colors shadow-sm"
                >
                  Take the tour
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileWelcomePopup;
