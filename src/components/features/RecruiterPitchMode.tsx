import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ClippyIcon } from '../common/Icons';
import { ResumeData } from '../../types';
import { useSpeakingAnimation } from '../../hooks/useSpeakingAnimation';
import { ONBOARDING_CONFIG } from '../../config/onboarding';

interface RecruiterPitchModeProps {
  onClose: () => void;
  data: ResumeData;
  onNavigateToTab: (tab: string) => void;
  onComplete: () => void;
}

interface PitchStep {
  id: string;
  title: string;
  description: string;
  tab: string;
  highlightSelector?: string;
  scrollToSelector?: string;
  tip: string;
}

// Recruiter-focused tour: 4 steps, ≤60 seconds, professional tone
const RECRUITER_PITCH_STEPS: PitchStep[] = [
  {
    id: 'summary',
    title: 'Professional Summary',
    description:
      '10+ years of Dynamics 365 expertise across enterprise implementations. Led projects serving 10,000+ users in finance, manufacturing, and government sectors.',
    tab: 'summary',
    scrollToSelector: 'main',
    tip: 'Proven track record with measurable business impact.',
  },
  {
    id: 'experience',
    title: 'Experience & Leadership',
    description:
      'Technical Lead roles across 4 organizations. Expert in solution architecture, team leadership, and delivering complex CRM implementations on time and within budget.',
    tab: 'experience',
    scrollToSelector: 'main',
    tip: 'Leadership experience with cross-functional teams.',
  },
  {
    id: 'projects',
    title: 'Key Projects & Impact',
    description:
      'Delivered 30% performance improvements and 20% cost savings. Click any technology badge to filter projects by skill.',
    tab: 'projects',
    scrollToSelector: 'main',
    tip: 'Real-world results with documented ROI.',
  },
  {
    id: 'hire',
    title: 'Ready to Collaborate',
    description:
      'Available for contracts and consulting. Competitive rates, immediate availability, remote work across LATAM and US time zones. Contact details and rates listed here.',
    tab: 'hire',
    scrollToSelector: 'main',
    tip: 'Flexible engagement models to fit your needs.',
  },
];

const RecruiterPitchMode: React.FC<RecruiterPitchModeProps> = ({
  onClose,
  data: _data,
  onNavigateToTab,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const highlightedElementRef = useRef<Element | null>(null);

  const step = RECRUITER_PITCH_STEPS[currentStep] ?? RECRUITER_PITCH_STEPS[0]!;
  const progress = ((currentStep + 1) / RECRUITER_PITCH_STEPS.length) * 100;

  // Typing animation for description text
  const { displayedText, isComplete: isTextComplete } = useSpeakingAnimation({
    text: step.description,
    isClippy: true,
    enabled: isVisible,
    durationMs: ONBOARDING_CONFIG.RECRUITER_TOUR.TYPING_DURATION_MS,
    onComplete: useCallback(() => {
      // Animation complete
    }, []),
  });

  // Clear highlight function
  const clearHighlight = useCallback(() => {
    if (highlightedElementRef.current) {
      highlightedElementRef.current.classList.remove('pitch-mode-highlight');
      highlightedElementRef.current = null;
    }
  }, []);

  // Highlight element function
  const highlightElement = useCallback(
    (selector: string) => {
      clearHighlight();
      setTimeout(() => {
        try {
          const element = document.querySelector(selector);
          if (element) {
            element.classList.add('pitch-mode-highlight');
            highlightedElementRef.current = element;
          }
        } catch (error) {
          console.warn('Failed to highlight element:', selector, error);
        }
      }, 300);
    },
    [clearHighlight]
  );

  // Scroll to element function
  const scrollToElement = useCallback((selector: string) => {
    setTimeout(() => {
      try {
        const element = document.querySelector(selector);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (error) {
        console.warn('Failed to scroll to element:', selector, error);
      }
    }, 400);
  }, []);

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle step changes
  useEffect(() => {
    const currentPitchStep = RECRUITER_PITCH_STEPS[currentStep];
    if (currentPitchStep?.tab) {
      onNavigateToTab(currentPitchStep.tab);
    }

    if (currentPitchStep?.highlightSelector) {
      highlightElement(currentPitchStep.highlightSelector);
    } else {
      clearHighlight();
    }

    if (currentPitchStep?.scrollToSelector) {
      scrollToElement(currentPitchStep.scrollToSelector);
    }
  }, [currentStep, onNavigateToTab, highlightElement, clearHighlight, scrollToElement]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearHighlight();
    };
  }, [clearHighlight]);

  const handleComplete = useCallback(() => {
    clearHighlight();
    onComplete();
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onComplete, onClose, clearHighlight]);

  const handleSkip = useCallback(() => {
    clearHighlight();
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose, clearHighlight]);

  const handleNext = useCallback(() => {
    if (currentStep < RECRUITER_PITCH_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  }, [currentStep, handleComplete]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleSkip();
          break;
        case 'ArrowRight':
        case 'Enter':
        case ' ':
          if (isTextComplete) {
            e.preventDefault();
            handleNext();
          }
          break;
        case 'ArrowLeft':
          if (isTextComplete) {
            e.preventDefault();
            handlePrevious();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTextComplete, handleNext, handlePrevious, handleSkip]);

  return (
    <>
      {/* Backdrop - No dimming effect */}
      <div
        className={`fixed inset-0 bg-black no-print z-[90] transition-opacity duration-500 ${
          isVisible ? 'bg-opacity-0' : 'bg-opacity-0'
        }`}
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* Tour Card - Office 97 Style */}
      <div
        className={`fixed no-print z-[100] transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          bottom-4 right-4 md:bottom-8 md:right-8
          w-[calc(100vw-2rem)] md:w-[520px] max-w-[520px]
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-tour-title"
      >
        {/* Office 97 Window Container */}
        <div className="bg-[#d4d0c8] rounded-sm shadow-[inset_2px_2px_0_0_#ffffff,inset_-2px_-2px_0_0_#808080,3px_3px_12px_rgba(0,0,0,0.5)] overflow-hidden border-t-2 border-l-2 border-[#ffffff] border-r-2 border-b-2 border-r-[#404040] border-b-[#404040]" style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}>
          
          {/* Title Bar - Classic Windows style */}
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="drop-shadow-md">
                <ClippyIcon size="sm" />
              </div>
              <span className="text-white text-sm font-bold tracking-wide drop-shadow-sm">Recruiter Tour - Clippy</span>
            </div>
            <button
              onClick={handleSkip}
              className="bg-[#c0c0c0] hover:bg-[#e0e0e0] active:bg-[#a0a0a0] w-6 h-5 flex items-center justify-center text-black text-base font-bold shadow-[inset_1px_1px_0_0_#fff,inset_-1px_-1px_0_0_#808080] border border-[#000]"
              aria-label="Skip tour"
            >
              ×
            </button>
          </div>

          {/* Progress Bar - Windows style */}
          <div className="bg-[#c0c0c0] px-3 py-2 border-b-2 border-[#808080]">
            <div className="flex items-center justify-between mb-1 text-xs text-black">
              <span className="font-bold">Quick Tour ({ONBOARDING_CONFIG.RECRUITER_TOUR.ESTIMATED_DURATION_SECONDS}s)</span>
              <span className="font-medium">
                {currentStep + 1} of {RECRUITER_PITCH_STEPS.length}
              </span>
            </div>
            <div className="h-3 bg-white border-2 shadow-[inset_1px_1px_0_0_#808080,inset_-1px_-1px_0_0_#dfdfdf]" style={{ borderTopColor: '#808080', borderLeftColor: '#808080', borderRightColor: '#dfdfdf', borderBottomColor: '#dfdfdf' }}>
              <div
                className="h-full bg-[#000080] transition-all duration-300"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={currentStep + 1}
                aria-valuemin={1}
                aria-valuemax={RECRUITER_PITCH_STEPS.length}
              />
            </div>
          </div>

          {/* Content Area - Office 97 style */}
          <div className="p-4 bg-[#d4d0c8]">
            <div className="bg-white border-[2px] shadow-[inset_-2px_-2px_0_0_#fff,inset_2px_2px_0_0_#808080] p-5"
              style={{ borderTopColor: '#808080', borderLeftColor: '#808080', borderRightColor: '#dfdfdf', borderBottomColor: '#dfdfdf' }}
            >
              {/* Clippy avatar and content */}
              <div className="flex items-start gap-4 mb-4">
                <div className="drop-shadow-lg flex-shrink-0">
                  <ClippyIcon size="2xl" className="w-20 h-20" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-black mb-2" id="recruiter-tour-title">{step.title}</h4>
                  <p className="text-sm text-black leading-relaxed min-h-[70px]">
                    {displayedText}
                    {!isTextComplete && (
                      <span
                        className="inline-block w-1.5 h-4 bg-black ml-0.5 animate-pulse"
                        aria-hidden="true"
                      ></span>
                    )}
                  </p>
                </div>
              </div>

              {/* Tip Box */}
              {isTextComplete && (
                <div className="bg-[#ffffcc] border-2 p-3 mt-3 animate-fade-in" style={{ borderTopColor: '#808080', borderLeftColor: '#808080', borderRightColor: '#dfdfdf', borderBottomColor: '#dfdfdf' }}>
                  <div className="flex items-start gap-2">
                    <span className="text-black font-bold text-sm">💡</span>
                    <p className="text-xs text-black leading-relaxed">{step.tip}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Footer - Office 97 style */}
          <div className="px-4 py-4 bg-[#d4d0c8] border-t-2 border-[#fff]">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                title={currentStep === 0 ? 'Already at first step' : 'Go to previous step'}
                className={`px-5 py-2 text-sm font-bold transition-all shadow-[inset_2px_2px_0_0_#fff,inset_-2px_-2px_0_0_#808080,2px_2px_0_0_#000] border border-[#000] ${
                  currentStep === 0
                    ? 'bg-[#a0a0a0] text-[#606060] cursor-not-allowed'
                    : 'bg-[#c0c0c0] hover:bg-[#d0d0d0] active:bg-[#a0a0a0] text-black'
                }`}
                aria-label="Previous step"
                style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}
              >
                ◄ Back
              </button>

              <button
                onClick={handleNext}
                disabled={!isTextComplete}
                title={!isTextComplete ? 'Please wait for text to finish' : (currentStep === RECRUITER_PITCH_STEPS.length - 1 ? 'Finish tour' : 'Go to next step')}
                className={`px-10 py-2.5 text-base font-bold transition-all shadow-[inset_2px_2px_0_0_#fff,inset_-2px_-2px_0_0_#808080,2px_2px_0_0_#000] border border-[#000] flex items-center gap-2 ${
                  isTextComplete
                    ? 'bg-[#c0c0c0] hover:bg-[#d0d0d0] active:bg-[#a0a0a0] text-black'
                    : 'bg-[#a0a0a0] text-[#606060] cursor-not-allowed'
                }`}
                aria-label={
                  currentStep === RECRUITER_PITCH_STEPS.length - 1 ? 'Finish tour' : 'Next step'
                }
                style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}
              >
                {currentStep === RECRUITER_PITCH_STEPS.length - 1 ? (
                  <>
                    Finish
                    <span className="text-lg">✓</span>
                  </>
                ) : (
                  <>
                    Next
                    <span>►</span>
                  </>
                )}
              </button>
            </div>

            {/* Keyboard hint */}
            <div className="text-center mt-3 text-xs text-black">
              Arrow keys or ESC to skip
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(RecruiterPitchMode);
