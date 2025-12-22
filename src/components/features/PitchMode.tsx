import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ClippyIcon } from '../common/Icons';
import { ResumeData } from '../../types';
import { useSpeakingAnimation } from '../../hooks/useSpeakingAnimation';

interface PitchModeProps {
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
  highlightSelector?: string; // CSS selector for element to highlight
  scrollToSelector?: string; // Optional different selector for scrolling
  tip: string;
}

const PITCH_STEPS: PitchStep[] = [
  {
    id: 'welcome',
    title: '👋 Welcome to Bruno\'s D365 Portfolio!',
    description: 'This is a fully functional Dynamics 365 interface. I\'ll teach you how to navigate it while showing you Bruno\'s impressive credentials.',
    tab: 'summary',
    highlightSelector: '[role="tablist"]',
    tip: 'This tour will take about 2 minutes. You can skip anytime with ESC!',
  },
  {
    id: 'tabs',
    title: '📑 Navigation Tabs - Your Control Center',
    description: 'Just like in real Dynamics 365, tabs organize different views. Each tab shows a different aspect of Bruno\'s professional profile.',
    tab: 'summary',
    highlightSelector: '[role="tablist"]',
    tip: 'Click any tab to explore: Summary | Experience | Projects | Skills | Qualifications | Hire Me',
  },
  {
    id: 'command-bar',
    title: '🎯 Command Bar - D365\'s Power Tools',
    description: 'The command bar (top) contains actions. Notice the Print and Generate PDF buttons - these actually work! Try them after the tour.',
    tab: 'summary',
    highlightSelector: '.no-print button',
    tip: 'Command bars in real D365 let you perform bulk actions and operations.',
  },
  {
    id: 'summary',
    title: '💼 Professional Summary - 10+ Years of Excellence',
    description: 'Bruno has led enterprise Dynamics 365 implementations for 10,000+ users across finance, manufacturing, and government sectors.',
    tab: 'summary',
    scrollToSelector: 'main',
    tip: 'Notice the diverse industry experience and proven leadership track record.',
  },
  {
    id: 'projects',
    title: '🚀 Projects - Real-World Impact',
    description: 'Each project card shows technologies used. Click any technology badge to filter projects by that skill - try it!',
    tab: 'projects',
    scrollToSelector: 'main',
    tip: '30% performance improvements, 20% cost savings - measurable business impact!',
  },
  {
    id: 'skills',
    title: '⚡ Skills - Interactive Expertise',
    description: 'Click any skill to see which projects used it and get more details. The numbers show real project experience.',
    tab: 'skills',
    scrollToSelector: 'main',
    tip: 'Skills include: Dynamics 365, Power Platform, Azure, C#/.NET, TypeScript, React',
  },
  {
    id: 'experience',
    title: '📊 Experience Timeline',
    description: 'Notice the timeline format - just like viewing records in Dynamics 365. Bruno has held leadership roles across 4 organizations.',
    tab: 'experience',
    scrollToSelector: 'main',
    tip: 'Technical Lead positions demonstrate architecture expertise and team leadership.',
  },
  {
    id: 'certifications',
    title: '🎓 Microsoft Certified Professional',
    description: 'Multiple Microsoft certifications including Dynamics 365, Microsoft Certified Trainer, Customer Service, and Field Service specialist.',
    tab: 'qualifications',
    scrollToSelector: 'main',
    tip: 'Continuous learning keeps Bruno current with the latest Microsoft technologies.',
  },
  {
    id: 'hire',
    title: '🤝 Ready to Collaborate?',
    description: 'Available for contracts and consulting. Competitive rates, immediate availability, remote work across LATAM and US time zones.',
    tab: 'hire',
    scrollToSelector: 'main',
    tip: 'Contact information, rates, and availability are all listed here!',
  },
];

const PitchMode: React.FC<PitchModeProps> = ({ onClose, data: _data, onNavigateToTab, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const highlightedElementRef = useRef<Element | null>(null);

  const step = PITCH_STEPS[currentStep] ?? PITCH_STEPS[0]!;
  const progress = ((currentStep + 1) / PITCH_STEPS.length) * 100;

  // Animation duration for pitch mode
  const PITCH_ANIMATION_DURATION_MS = 1500;

  // Typing animation for description text
  const { displayedText, isComplete: isTextComplete } = useSpeakingAnimation({
    text: step.description,
    isClippy: true,
    enabled: isVisible,
    durationMs: PITCH_ANIMATION_DURATION_MS,
    onComplete: useCallback(() => {
      // Animation complete - user can proceed
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
  const highlightElement = useCallback((selector: string) => {
    // Clear any existing highlights
    clearHighlight();

    // Find and highlight the new element
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
  }, [clearHighlight]);

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

  // Handle step changes
  useEffect(() => {
    // Animate in on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-navigate to the step's tab
    const currentPitchStep = PITCH_STEPS[currentStep];
    if (currentPitchStep?.tab) {
      onNavigateToTab(currentPitchStep.tab);
    }

    // Highlight element if specified
    if (currentPitchStep?.highlightSelector) {
      highlightElement(currentPitchStep.highlightSelector);
    } else {
      clearHighlight();
    }

    // Scroll to element if specified
    if (currentPitchStep?.scrollToSelector) {
      scrollToElement(currentPitchStep.scrollToSelector);
    }

    return () => {
      // Don't clear highlight on unmount - only when step changes
    };
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
    if (currentStep < PITCH_STEPS.length - 1) {
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

  const handleJumpToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < PITCH_STEPS.length && isTextComplete) {
      setCurrentStep(stepIndex);
    }
  }, [isTextComplete]);

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

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0]?.clientX;
    if (!touchEnd) return;
    
    const diff = touchStart - touchEnd;
    
    // Swipe left (next)
    if (diff > 50 && isTextComplete) {
      handleNext();
    }
    // Swipe right (previous)
    else if (diff < -50 && isTextComplete) {
      handlePrevious();
    }
    
    setTouchStart(null);
  };

  return (
    <>
      {/* Backdrop with spotlight effect - darker for better highlight visibility */}
      <div 
        className={`fixed inset-0 bg-black no-print z-[90] transition-opacity duration-500 ${
          isVisible ? 'bg-opacity-70' : 'bg-opacity-0'
        }`}
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* Pitch Mode Card - Enhanced design */}
      <div
        className={`fixed no-print z-[100] transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          bottom-4 right-4 md:bottom-8 md:right-8
          w-[calc(100vw-2rem)] md:w-[520px] max-w-[520px]
        `}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pitch-mode-title"
      >
        {/* Progress Bar - Enhanced with labels */}
        <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1 text-xs text-gray-600">
            <span className="font-semibold">Interactive Tutorial</span>
            <span className="font-medium">{currentStep + 1} of {PITCH_STEPS.length}</span>
          </div>
          <div className="h-2">
            <div 
              className="h-full bg-gradient-to-r from-[#0078d4] to-[#00bcf2] transition-all duration-300 shadow-sm"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={1}
              aria-valuemax={PITCH_STEPS.length}
            />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-b-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-yellow-200 bg-yellow-100/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="animate-bounce-gentle">
                <ClippyIcon size="xl" />
              </div>
              <div>
                <h3 id="pitch-mode-title" className="text-lg font-bold text-gray-900">
                  Clippy&apos;s Interactive Tutorial
                </h3>
                <p className="text-xs text-gray-600">
                  Learning D365 Navigation
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-md hover:shadow-lg"
              aria-label="Skip tutorial"
            >
              Skip ⏭️
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-4">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed min-h-[60px]">
                {displayedText}
                {!isTextComplete && (
                  <span className="inline-block w-1.5 h-4 bg-gray-900 ml-0.5 animate-pulse" aria-hidden="true"></span>
                )}
              </p>
            </div>

            {/* Tip Box - Only show when text is complete */}
            {isTextComplete && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded animate-fade-in">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold text-sm" aria-label="Tip">💡</span>
                  <p className="text-xs text-blue-900">{step.tip}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="px-6 py-5 bg-yellow-100/30 border-t border-yellow-200">
            {/* Main Navigation - Centered and Prominent */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`rpg-button px-5 py-2.5 text-base font-semibold rounded-lg transition-all ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md'
                }`}
                aria-label="Previous step"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </span>
              </button>

              {/* Large centered NEXT button - disabled until text complete */}
              <button
                onClick={handleNext}
                disabled={!isTextComplete}
                className={`rpg-button px-10 py-3.5 text-lg font-bold rounded-lg transition-all shadow-lg flex items-center gap-3 ${
                  isTextComplete
                    ? 'bg-gradient-to-r from-[#0078d4] to-[#00bcf2] hover:from-[#106ebe] hover:to-[#00a7d6] text-white hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                }`}
                aria-label={currentStep === PITCH_STEPS.length - 1 ? 'Finish tutorial' : 'Next step'}
              >
                {currentStep === PITCH_STEPS.length - 1 ? (
                  <>
                    <span>Finish</span>
                    <span className="text-xl" aria-hidden="true">🎉</span>
                  </>
                ) : (
                  <>
                    <span>NEXT</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Step Indicators - Below navigation */}
            <div className="flex gap-2 justify-center" role="tablist" aria-label="Tutorial steps">
              {PITCH_STEPS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJumpToStep(idx)}
                  disabled={!isTextComplete}
                  className={`transition-all rounded-full ${
                    idx === currentStep
                      ? 'bg-[#0078d4] w-8 h-3'
                      : idx < currentStep
                      ? 'bg-blue-400 w-3 h-3'
                      : 'bg-gray-300 w-3 h-3'
                  } ${!isTextComplete ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-80'}`}
                  aria-label={`Step ${idx + 1}: ${s.title}`}
                  aria-current={idx === currentStep ? 'step' : undefined}
                  role="tab"
                />
              ))}
            </div>

            {/* Keyboard hint */}
            <div className="hidden md:block text-center mt-3 text-xs text-gray-500">
              💡 Use arrow keys, Enter, or Space to navigate • Press ESC to skip
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden px-6 py-2 text-center text-xs text-gray-500 bg-yellow-50">
            💡 Swipe left/right to navigate
          </div>
        </div>
      </div>
    </>
  );
};

export default PitchMode;
