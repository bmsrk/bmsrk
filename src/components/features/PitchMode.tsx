import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ClippyIcon } from '../common/Icons';
import { ResumeData } from '../../types';
import { useSpeakingAnimation } from '../../hooks/useSpeakingAnimation';
import { getSimsAudio } from '../../utils/simsAudio';

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
  highlightElement?: string;
  tip: string;
}

const PITCH_STEPS: PitchStep[] = [
  {
    id: 'welcome',
    title: '👋 Welcome to Bruno\'s Portfolio!',
    description: 'Hi! I\'m Clippy, and I\'ll give you a quick guided tour showcasing Bruno\'s impressive experience in Dynamics 365 and Azure.',
    tab: 'summary',
    tip: 'This tour will take about 90 seconds. Press ESC to skip anytime!',
  },
  {
    id: 'experience',
    title: '💼 10+ Years of Excellence',
    description: 'Bruno has led enterprise-scale Dynamics 365 implementations for 10,000+ users across multiple industries including finance, manufacturing, and government.',
    tab: 'summary',
    highlightElement: 'professional-summary',
    tip: 'Notice the diverse industry experience and proven track record.',
  },
  {
    id: 'projects',
    title: '🚀 Impressive Project Portfolio',
    description: 'From multi-country CRM modernizations to high-availability Azure integrations, Bruno has delivered complex solutions with measurable business impact.',
    tab: 'projects',
    highlightElement: 'projects-gallery',
    tip: 'Check out the 30% performance improvements and 20% cost savings!',
  },
  {
    id: 'skills',
    title: '⚡ Technical Expertise',
    description: 'Master of Microsoft stack: Dynamics 365, Power Platform, Azure Functions, C#/.NET, TypeScript, and React. Click any skill to learn more!',
    tab: 'skills',
    highlightElement: 'skills-grid',
    tip: 'The project counters show real-world experience with each technology.',
  },
  {
    id: 'certifications',
    title: '🎓 Microsoft Certified',
    description: 'Multiple Microsoft certifications including Dynamics 365, Microsoft Certified Trainer, and specialized in Customer Service and Field Service.',
    tab: 'qualifications',
    highlightElement: 'certifications-section',
    tip: 'Continuous learning and staying current with Microsoft technologies.',
  },
  {
    id: 'hire',
    title: '🤝 Ready to Collaborate',
    description: 'Available for contract engagements and consulting. Competitive rates, proven expertise, and immediate availability for remote work across LATAM and US time zones.',
    tab: 'hire',
    highlightElement: 'hire-section',
    tip: 'Let\'s build something amazing together!',
  },
];

const PitchMode: React.FC<PitchModeProps> = ({ onClose, data: _data, onNavigateToTab, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const simsAudio = useMemo(() => getSimsAudio(), []);

  const step = PITCH_STEPS[currentStep] ?? PITCH_STEPS[0]!;
  const progress = ((currentStep + 1) / PITCH_STEPS.length) * 100;

  // Animation duration for pitch mode (snappier than handoff)
  const PITCH_ANIMATION_DURATION_MS = 1500;

  // Speaking animation for description text
  const { displayedText, isComplete: isTextComplete, isSpeaking } = useSpeakingAnimation({
    text: step.description,
    isClippy: true,
    enabled: isVisible,
    durationMs: PITCH_ANIMATION_DURATION_MS,
    onComplete: useCallback(() => {
      // Animation complete - user can proceed
    }, []),
  });

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100);
    
    // Auto-navigate to the step's tab
    const currentPitchStep = PITCH_STEPS[currentStep];
    if (currentPitchStep?.tab) {
      onNavigateToTab(currentPitchStep.tab);
    }
  }, [currentStep, onNavigateToTab]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      simsAudio.stop();
    };
  }, [simsAudio]);

  const handleComplete = useCallback(() => {
    onComplete();
    simsAudio.stop();
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onComplete, onClose, simsAudio]);

  const handleSkip = useCallback(() => {
    simsAudio.stop();
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose, simsAudio]);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleSkip();
          break;
        case 'ArrowRight':
        case 'Enter':
          if (isTextComplete) {
            e.preventDefault();
            handleNext();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case ' ':
          if (isTextComplete) {
            e.preventDefault();
            handleNext();
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
    if (diff > 50) {
      handleNext();
    }
    // Swipe right (previous)
    else if (diff < -50) {
      handlePrevious();
    }
    
    setTouchStart(null);
  };

  return (
    <>
      {/* Backdrop with spotlight effect */}
      <div 
        className={`fixed inset-0 bg-black no-print z-[90] transition-opacity duration-500 ${
          isVisible ? 'bg-opacity-60' : 'bg-opacity-0'
        }`}
        onClick={handleSkip}
      />

      {/* Pitch Mode Card */}
      <div
        className={`fixed no-print z-[100] transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          bottom-4 right-4 md:bottom-8 md:right-8
          w-[calc(100vw-2rem)] md:w-[480px] max-w-[480px]
        `}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 rounded-t-lg overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#0078d4] to-[#00bcf2] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-b-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-yellow-200 bg-yellow-100/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${isSpeaking ? 'animate-clippy-wiggle' : 'animate-bounce-gentle'}`}>
                <ClippyIcon size="xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Clippy&apos;s Guided Tour</h3>
                <p className="text-xs text-gray-600">Step {currentStep + 1} of {PITCH_STEPS.length}</p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-md hover:shadow-lg"
              aria-label="Skip tour"
            >
              Skip Tour ⏭️
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-4">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed min-h-[60px]">
                {displayedText}
                {!isTextComplete && (
                  <span className="inline-block w-1.5 h-4 bg-gray-900 ml-0.5 animate-pulse"></span>
                )}
              </p>
            </div>

            {/* Tip Box - Only show when text is complete */}
            {isTextComplete && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded animate-fade-in">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold text-sm">💡 Tip:</span>
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
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              >
                {currentStep === PITCH_STEPS.length - 1 ? (
                  <>
                    <span>Finish Tour</span>
                    <span className="text-xl">🎉</span>
                  </>
                ) : (
                  <>
                    <span>NEXT</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Step Indicators - Below navigation */}
            <div className="flex gap-2 justify-center">
              {PITCH_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  disabled={!isTextComplete}
                  className={`transition-all rounded-full ${
                    idx === currentStep
                      ? 'bg-[#0078d4] w-8 h-3'
                      : idx < currentStep
                      ? 'bg-blue-400 w-3 h-3'
                      : 'bg-gray-300 w-3 h-3'
                  } ${!isTextComplete ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Keyboard hint */}
            <div className="hidden md:block text-center mt-3 text-xs text-gray-500">
              💡 Use arrow keys or Enter to navigate • Press ESC to skip
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
