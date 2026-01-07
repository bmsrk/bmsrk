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
      {/* Backdrop - darker for visibility */}
      <div
        className={`fixed inset-0 bg-black no-print z-[90] transition-opacity duration-500 ${
          isVisible ? 'bg-opacity-60' : 'bg-opacity-0'
        }`}
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* Tour Card */}
      <div
        className={`fixed no-print z-[100] transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          bottom-4 right-4 md:bottom-8 md:right-8
          w-[calc(100vw-2rem)] md:w-[480px] max-w-[480px]
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-tour-title"
      >
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1 text-xs text-gray-600">
            <span className="font-semibold">Quick Tour ({ONBOARDING_CONFIG.RECRUITER_TOUR.ESTIMATED_DURATION_SECONDS}s)</span>
            <span className="font-medium">
              {currentStep + 1} of {RECRUITER_PITCH_STEPS.length}
            </span>
          </div>
          <div className="h-2">
            <div
              className="h-full bg-gradient-to-r from-[#0078d4] to-[#00bcf2] transition-all duration-300"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={1}
              aria-valuemax={RECRUITER_PITCH_STEPS.length}
            />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-b-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-blue-200 bg-blue-100/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ClippyIcon size="lg" />
              <div>
                <h3 id="recruiter-tour-title" className="text-base font-bold text-gray-900">
                  Recruiter Tour
                </h3>
                <p className="text-xs text-gray-600">Key highlights for hiring managers</p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-white bg-gray-500 hover:bg-gray-600 px-3 py-1.5 rounded font-semibold text-xs transition-colors"
              aria-label="Skip tour"
            >
              Skip
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-4">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed min-h-[60px]">
                {displayedText}
                {!isTextComplete && (
                  <span
                    className="inline-block w-1.5 h-4 bg-gray-900 ml-0.5 animate-pulse"
                    aria-hidden="true"
                  ></span>
                )}
              </p>
            </div>

            {/* Tip Box */}
            {isTextComplete && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded animate-fade-in">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold text-sm">💡</span>
                  <p className="text-xs text-blue-900">{step.tip}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="px-6 py-4 bg-blue-100/30 border-t border-blue-200">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`px-4 py-2 text-sm font-semibold rounded transition-all ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300 hover:border-gray-400'
                }`}
                aria-label="Previous step"
              >
                ← Back
              </button>

              <button
                onClick={handleNext}
                disabled={!isTextComplete}
                className={`px-8 py-2.5 text-base font-bold rounded transition-all shadow-md flex items-center gap-2 ${
                  isTextComplete
                    ? 'bg-gradient-to-r from-[#0078d4] to-[#00bcf2] hover:from-[#106ebe] hover:to-[#00a7d6] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                }`}
                aria-label={
                  currentStep === RECRUITER_PITCH_STEPS.length - 1 ? 'Finish tour' : 'Next step'
                }
              >
                {currentStep === RECRUITER_PITCH_STEPS.length - 1 ? (
                  <>
                    Finish
                    <span className="text-lg">✓</span>
                  </>
                ) : (
                  <>
                    Next
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            {/* Keyboard hint */}
            <div className="text-center mt-3 text-xs text-gray-500">
              Use arrow keys or press ESC to skip
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterPitchMode;
