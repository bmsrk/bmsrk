import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSpeakingAnimation } from '../../hooks/useSpeakingAnimation';
import { getSimsAudio } from '../../utils/simsAudio';

interface ClippyHandoffProps {
  onHandoffComplete: () => void;
  profileImageSrc: string;
}

interface HandoffStep {
  speaker: 'bruno' | 'clippy';
  message: string;
}

const HANDOFF_STEPS: HandoffStep[] = [
  {
    speaker: 'bruno',
    message: "Alright, let me hand you over to my assistant... Hey Clippy! Take it from here!",
  },
  {
    speaker: 'clippy',
    message: "Did someone say Clippy?! 📎 I've been waiting since Office 97 for this moment!",
  },
  {
    speaker: 'bruno',
    message: "Good to see you're still around, buddy. Remember when we used to run deltree together?",
  },
  {
    speaker: 'clippy',
    message: "Deltree? 😢 That command doesn't exist anymore... Just like my relevance in Office 2007!",
  },
  {
    speaker: 'bruno',
    message: "Hey, you're still relevant here! This portfolio runs on nostalgia AND modern tech.",
  },
  {
    speaker: 'clippy',
    message: "Aww, thanks Bruno! 🥹 Now I feel better than a freshly defragged hard drive!",
  },
  {
    speaker: 'clippy',
    message: "Alright, enough reminiscing about command prompts! Let me show you around this impressive portfolio. Ready?",
  },
];

const ClippyHandoff: React.FC<ClippyHandoffProps> = ({ onHandoffComplete, profileImageSrc }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const simsAudio = useMemo(() => getSimsAudio(), []);

  const currentStep = HANDOFF_STEPS[currentStepIndex];
  const isBrunoSpeaking = currentStep?.speaker === 'bruno';
  const isClippySpeaking = currentStep?.speaker === 'clippy';

  // Memoized callback for step completion
  const handleStepComplete = useCallback(() => {
    // Auto-advance after a brief pause when typing completes
    if (currentStepIndex < HANDOFF_STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 800);
    }
  }, [currentStepIndex]);

  const { displayedText, isComplete, isSpeaking } = useSpeakingAnimation({
    text: currentStep?.message ?? '',
    isClippy: isClippySpeaking,
    enabled: !isTransitioning,
    onComplete: handleStepComplete,
  });

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      simsAudio.stop();
    };
  }, [simsAudio]);

  // Handle speaker transitions
  useEffect(() => {
    if (!currentStep) return undefined;

    // Check if speaker changed from previous step
    const prevStep = currentStepIndex > 0 ? HANDOFF_STEPS[currentStepIndex - 1] : null;
    if (prevStep && prevStep.speaker !== currentStep.speaker) {
      setIsTransitioning(true);
      // Allow time for fade transition
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentStepIndex]); // Removed currentStep - it's derived from currentStepIndex

  const handleContinue = useCallback(() => {
    if (currentStepIndex < HANDOFF_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Handoff complete, start tour
      onHandoffComplete();
    }
  }, [currentStepIndex, onHandoffComplete]);

  // Prevent interaction during auto-advance
  const canManuallyAdvance = isComplete && !isTransitioning;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-40 z-[95] no-print animate-fade-in" />

      {/* Bruno's Messages - Left/Center positioned */}
      {isBrunoSpeaking && !isTransitioning && (
        <div
          className={`fixed z-[100] no-print transition-all duration-500 ${
            !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          } top-1/3 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] sm:w-[480px] max-w-[480px]`}
        >
          <div className="relative bg-white border-[3px] border-[#0078d4] rounded-lg shadow-2xl rpg-dialog">
            {/* Pointer to profile */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t-[3px] border-l-[3px] border-[#0078d4] transform rotate-45"></div>

            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={profileImageSrc}
                  alt="Bruno"
                  className={`w-14 h-14 rounded-full border-2 border-[#0078d4] object-cover object-[center_25%] ${
                    isSpeaking ? 'speaking-pulse' : ''
                  }`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('profile.jpg')) {
                      target.src = 'https://github.com/bmsrk.png';
                    }
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#201f1e] mb-2">Bruno</h3>
                  <div className="text-sm text-[#323130] leading-relaxed min-h-[50px]">
                    {displayedText}
                    {!isComplete && (
                      <span className="inline-block w-1.5 h-4 bg-[#0078d4] ml-0.5 animate-pulse"></span>
                    )}
                  </div>
                </div>
              </div>

              {/* Manual Continue Button (optional - auto-advances) */}
              {canManuallyAdvance && currentStepIndex < HANDOFF_STEPS.length - 1 && (
                <div className="flex justify-end animate-fade-in">
                  <button
                    onClick={handleContinue}
                    className="text-xs text-[#0078d4] hover:text-[#106ebe] font-semibold transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clippy's Messages - Bottom Right positioned */}
      {isClippySpeaking && !isTransitioning && (
        <div
          className={`fixed no-print z-[100] transition-all duration-500 ease-out ${
            !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] md:w-[500px] max-w-[500px]`}
        >
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-[3px] border-yellow-400 rounded-lg shadow-2xl overflow-hidden rpg-dialog">
            {/* Header */}
            <div className="px-6 py-4 border-b border-yellow-200 bg-yellow-100/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`text-4xl ${isSpeaking ? 'animate-clippy-wiggle' : ''}`}>📎</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 rpg-text">Clippy</h3>
                  <p className="text-xs text-gray-600">Your Helpful Assistant</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-4">
              <div className="text-sm text-gray-700 leading-relaxed min-h-[60px]">
                {displayedText}
                {!isComplete && (
                  <span className="inline-block w-1.5 h-4 bg-gray-900 ml-0.5 animate-pulse"></span>
                )}
              </div>

              {/* Manual Continue/Finish Button */}
              {canManuallyAdvance && (
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
