import React, { useState, useEffect } from 'react';
import { getSimsAudio } from '../../utils/simsAudio';

interface ClippyHandoffProps {
  onHandoffComplete: () => void;
  profileImageSrc: string;
}

const HANDOFF_STEPS = [
  {
    speaker: 'bruno',
    message: "Alright, let me hand you over to my assistant... Hey Clippy! Take it from here!",
    delay: 0,
  },
  {
    speaker: 'clippy',
    message: "Did someone say Clippy?! 📎 I've been waiting since Windows 97 for this moment!",
    delay: 800,
  },
  {
    speaker: 'clippy',
    message: "Fun fact: I once tried to help write a resignation letter for Clippy... wait, that was ME! 😅",
    delay: 100,
  },
  {
    speaker: 'clippy',
    message: "So Bruno built this whole thing to look like Dynamics 365? Classic overachiever.",
    delay: 100,
  },
  {
    speaker: 'clippy',
    message: "Alright, enough nostalgia! Let me show you around this impressive portfolio. Ready?",
    delay: 100,
  },
];

const ClippyHandoff: React.FC<ClippyHandoffProps> = ({ onHandoffComplete, profileImageSrc }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isBrunoVisible, setIsBrunoVisible] = useState(true);
  const [isClippyVisible, setIsClippyVisible] = useState(false);
  const simsAudio = getSimsAudio();

  const currentStep = HANDOFF_STEPS[currentStepIndex];

  useEffect(() => {
    if (!currentStep) return;

    // Wait for delay before showing this step
    const delayTimer = setTimeout(() => {
      // Handle speaker transitions
      if (currentStep.speaker === 'clippy' && isBrunoVisible) {
        setIsBrunoVisible(false);
        setTimeout(() => setIsClippyVisible(true), 300);
      }

      // Start typing animation
      startTypingAnimation();
    }, currentStep.delay);

    return () => {
      clearTimeout(delayTimer);
      simsAudio.stop();
    };
  }, [currentStepIndex]);

  const startTypingAnimation = () => {
    if (!currentStep) return;

    setDisplayedText('');
    setIsTypingComplete(false);

    const fullText = currentStep.message;
    let currentIndex = 0;
    const typingSpeed = 25;
    const isClippy = currentStep.speaker === 'clippy';

    // Play audio with appropriate voice
    simsAudio.speak(fullText, isClippy ? 1.8 : 1.5, isClippy);

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, typingSpeed);
  };

  const handleContinue = () => {
    if (currentStepIndex < HANDOFF_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Handoff complete, start tour
      simsAudio.stop();
      onHandoffComplete();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-40 z-[95] no-print animate-fade-in" />

      {/* Bruno's Farewell Message */}
      {isBrunoVisible && currentStep?.speaker === 'bruno' && (
        <div
          className={`fixed z-[100] no-print transition-all duration-500 ${
            isBrunoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          } top-[60px] right-4 sm:right-6 md:right-8 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px]`}
        >
          <div className="relative bg-white border-[3px] border-[#0078d4] rounded-lg shadow-2xl rpg-dialog">
            <div className="absolute -top-3 right-8 w-6 h-6 bg-white border-t-[3px] border-l-[3px] border-[#0078d4] transform rotate-45"></div>
            <div className="p-5">
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
                  <h3 className="text-sm font-bold text-[#201f1e] mb-1">Bruno</h3>
                  <div className="text-sm text-[#323130] leading-relaxed min-h-[60px]">
                    {displayedText}
                    {!isTypingComplete && (
                      <span className="inline-block w-1.5 h-4 bg-[#0078d4] ml-0.5 animate-pulse"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clippy's Entrance and Messages */}
      {isClippyVisible && currentStep?.speaker === 'clippy' && (
        <div
          className={`fixed no-print z-[100] transition-all duration-500 ease-out ${
            isClippyVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] md:w-[480px] max-w-[480px]`}
        >
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-[3px] border-yellow-400 rounded-lg shadow-2xl overflow-hidden rpg-dialog">
            <div className="px-6 py-4 border-b border-yellow-200 bg-yellow-100/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl animate-clippy-wiggle">📎</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 rpg-text">Clippy</h3>
                  <p className="text-xs text-gray-600">Your Helpful Assistant</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="text-sm text-gray-700 leading-relaxed min-h-[80px]">
                {displayedText}
                {!isTypingComplete && (
                  <span className="inline-block w-1.5 h-4 bg-gray-900 ml-0.5 animate-pulse"></span>
                )}
              </div>

              {isTypingComplete && (
                <div className="flex justify-end animate-fade-in">
                  <button
                    onClick={handleContinue}
                    className="rpg-button px-6 py-2.5 bg-[#0078d4] hover:bg-[#106ebe] text-white text-sm font-bold rounded transition-all shadow-sm flex items-center gap-2 group"
                  >
                    <span>
                      {currentStepIndex === HANDOFF_STEPS.length - 1
                        ? "Let's Go! 🚀"
                        : 'Continue'}
                    </span>
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClippyHandoff;
