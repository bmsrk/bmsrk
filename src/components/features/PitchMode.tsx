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
  const HIGHLIGHT_DELAY_MS = 300;
  const SCROLL_DELAY_MS = 400;

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
    }, HIGHLIGHT_DELAY_MS);
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
    }, SCROLL_DELAY_MS);
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
      {/* Backdrop - No dimming effect */}
      <div 
        className={`fixed inset-0 bg-black no-print z-[90] transition-opacity duration-500 ${
          isVisible ? 'bg-opacity-0' : 'bg-opacity-0'
        }`}
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* Pitch Mode Card - Office 97 Enhanced Design */}
      <div
        className={`fixed no-print z-[100] transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          bottom-4 right-4 md:bottom-8 md:right-8
          w-[calc(100vw-2rem)] md:w-[560px] max-w-[560px]
        `}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pitch-mode-title"
      >
        {/* Office 97 Window Container */}
        <div className="bg-[#d4d0c8] rounded-sm shadow-[inset_2px_2px_0_0_#ffffff,inset_-2px_-2px_0_0_#808080,3px_3px_12px_rgba(0,0,0,0.5)] overflow-hidden border-t-2 border-l-2 border-[#ffffff] border-r-2 border-b-2 border-r-[#404040] border-b-[#404040]" style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}>
          
          {/* Title Bar - Classic Windows style */}
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="drop-shadow-md">
                <ClippyIcon size="sm" />
              </div>
              <span className="text-white text-sm font-bold tracking-wide drop-shadow-sm">Interactive Tutorial - Clippy</span>
            </div>
            <button
              onClick={handleSkip}
              className="bg-[#c0c0c0] hover:bg-[#e0e0e0] active:bg-[#a0a0a0] w-6 h-5 flex items-center justify-center text-black text-base font-bold shadow-[inset_1px_1px_0_0_#fff,inset_-1px_-1px_0_0_#808080] border border-[#000]"
              aria-label="Skip tutorial"
            >
              ×
            </button>
          </div>

          {/* Progress Bar - Windows style */}
          <div className="bg-[#c0c0c0] px-3 py-2 border-b-2 border-[#808080]">
            <div className="flex items-center justify-between mb-1 text-xs text-black">
              <span className="font-bold">Tutorial Progress</span>
              <span className="font-medium">{currentStep + 1} of {PITCH_STEPS.length}</span>
            </div>
            <div className="h-3 bg-white border-2 shadow-[inset_1px_1px_0_0_#808080,inset_-1px_-1px_0_0_#dfdfdf]" style={{ borderTopColor: '#808080', borderLeftColor: '#808080', borderRightColor: '#dfdfdf', borderBottomColor: '#dfdfdf' }}>
              <div 
                className="h-full bg-[#000080] transition-all duration-300"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={currentStep + 1}
                aria-valuemin={1}
                aria-valuemax={PITCH_STEPS.length}
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
                  <h4 className="text-lg font-bold text-black mb-2" id="pitch-mode-title">{step.title}</h4>
                  <p className="text-sm text-black leading-relaxed min-h-[70px]">
                    {displayedText}
                    {!isTextComplete && (
                      <span className="inline-block w-1.5 h-4 bg-black ml-0.5 animate-pulse" aria-hidden="true"></span>
                    )}
                  </p>
                </div>
              </div>

              {/* Tip Box - Only show when text is complete */}
              {isTextComplete && (
                <div className="bg-[#ffffcc] border-2 p-3 mt-3 animate-fade-in" style={{ borderTopColor: '#808080', borderLeftColor: '#808080', borderRightColor: '#dfdfdf', borderBottomColor: '#dfdfdf' }}>
                  <div className="flex items-start gap-2">
                    <span className="text-black font-bold text-sm" aria-label="Tip">💡</span>
                    <p className="text-xs text-black leading-relaxed">{step.tip}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Footer - Office 97 style */}
          <div className="px-4 py-4 bg-[#d4d0c8] border-t-2 border-[#fff]">
            {/* Main Navigation - Centered and Prominent */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`px-5 py-2 text-sm font-bold transition-all shadow-[inset_2px_2px_0_0_#fff,inset_-2px_-2px_0_0_#808080,2px_2px_0_0_#000] border border-[#000] ${
                  currentStep === 0
                    ? 'bg-[#a0a0a0] text-[#606060] cursor-not-allowed'
                    : 'bg-[#c0c0c0] hover:bg-[#d0d0d0] active:bg-[#a0a0a0] text-black'
                }`}
                aria-label="Previous step"
                style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}
              >
                <span className="flex items-center gap-2">
                  ◄ Back
                </span>
              </button>

              {/* Large centered NEXT button - disabled until text complete */}
              <button
                onClick={handleNext}
                disabled={!isTextComplete}
                className={`px-10 py-3 text-base font-bold transition-all shadow-[inset_2px_2px_0_0_#fff,inset_-2px_-2px_0_0_#808080,2px_2px_0_0_#000] border border-[#000] flex items-center gap-2 ${
                  isTextComplete
                    ? 'bg-[#c0c0c0] hover:bg-[#d0d0d0] active:bg-[#a0a0a0] text-black'
                    : 'bg-[#a0a0a0] text-[#606060] cursor-not-allowed'
                }`}
                aria-label={currentStep === PITCH_STEPS.length - 1 ? 'Finish tutorial' : 'Next step'}
                style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}
              >
                {currentStep === PITCH_STEPS.length - 1 ? (
                  <>
                    <span>Finish</span>
                    <span className="text-lg" aria-hidden="true">✓</span>
                  </>
                ) : (
                  <>
                    <span>NEXT</span>
                    <span aria-hidden="true">►</span>
                  </>
                )}
              </button>
            </div>

            {/* Step Indicators - Below navigation */}
            <div className="flex gap-2 justify-center mb-3" role="tablist" aria-label="Tutorial steps">
              {PITCH_STEPS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJumpToStep(idx)}
                  disabled={!isTextComplete}
                  className={`transition-all ${
                    idx === currentStep
                      ? 'bg-[#000080] w-8 h-3'
                      : idx < currentStep
                      ? 'bg-[#0078d4] w-3 h-3'
                      : 'bg-[#808080] w-3 h-3'
                  } ${!isTextComplete ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-80'} border border-[#000]`}
                  aria-label={`Step ${idx + 1}: ${s.title}`}
                  aria-current={idx === currentStep ? 'step' : undefined}
                  role="tab"
                />
              ))}
            </div>

            {/* Keyboard hint */}
            <div className="text-center text-xs text-black">
              💡 Arrow keys, Enter, Space to navigate • ESC to skip
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PitchMode;
