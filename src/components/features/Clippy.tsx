import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../common/Icons';
import { Project, SkillMetadata } from '../../types';
import { getSkillUrl, getSkillDescription } from '../../utils';

interface ClippyProps {
  onClose: () => void;
  skill?: string;
  projects?: Project[];
  skillMetadata?: Record<string, SkillMetadata>;
}

const CLIPPY_MESSAGES = [
  "It looks like you're viewing a resume. Would you like help with that?",
  "Hey there! I'm Clippy, your friendly office assistant! 📎",
  "Did you know? This resume was built with React and TypeScript!",
  "Fun fact: Bruno has 10+ years of Dynamics 365 experience!",
  "I see you're exploring this portfolio. Need any tips?",
  "This Dynamics 365 UI replica is pixel-perfect! Pretty cool, right?",
  "Pro tip: Try clicking on the different tabs to explore more!",
  "Remember me from Microsoft Office? I'm back, baby! 🎉",
  "Bruno specializes in Power Platform and Azure integrations!",
  "Looking for a CRM architect? You're in the right place!",
];

const Clippy: React.FC<ClippyProps> = ({ onClose, skill, projects = [], skillMetadata }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate project count for the skill
  const projectCount = skill
    ? projects.filter((p) => p.technologies.includes(skill)).length
    : 0;

  // Get skill description and URL
  const description = skill ? getSkillDescription(skill, skillMetadata) : '';
  const skillUrl = skill ? getSkillUrl(skill, skillMetadata) : '';

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100);
    
    // Random message if no skill is provided
    if (!skill) {
      setCurrentMessage(Math.floor(Math.random() * CLIPPY_MESSAGES.length));
    }
  }, [skill]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % CLIPPY_MESSAGES.length);
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[100] no-print transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative">
        {/* Speech Bubble */}
        <div className="absolute bottom-full right-0 mb-2 w-80 bg-yellow-50 border-2 border-yellow-400 rounded-lg shadow-2xl p-4">
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
          
          {/* Technology Explanation Mode */}
          {skill ? (
            <div className="pr-6">
              <h3 className="text-lg font-bold text-[#201f1e] mb-3 flex items-center gap-2">
                <span className="text-2xl">📎</span>
                {skill}
              </h3>
              <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                {description}
              </p>
              {projectCount > 0 && (
                <p className="text-sm font-semibold text-[#0078d4] mb-3">
                  Bruno has used this in {projectCount} project{projectCount !== 1 ? 's' : ''}!
                </p>
              )}
              {skillUrl && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <a
                    href={skillUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0078d4] hover:bg-[#106ebe] text-white text-sm font-semibold rounded transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Learn More on Microsoft Learn
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
              <button 
                onClick={nextMessage}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                Tell me more →
              </button>
            </div>
          ) : (
            /* Easter Egg Mode */
            <div className="pr-6">
              <p className="text-sm text-gray-800">
                {CLIPPY_MESSAGES[currentMessage]}
              </p>
              <button 
                onClick={nextMessage}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                Tell me more →
              </button>
            </div>
          )}
          {/* Bubble Arrow */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-yellow-50 border-r-2 border-b-2 border-yellow-400 transform rotate-45"></div>
        </div>
        
        {/* Clippy Character - Larger with gentle float animation */}
        <div className="relative animate-bounce-gentle">
          <div className="text-[90px] leading-none cursor-pointer hover:scale-110 transition-transform filter drop-shadow-2xl" onClick={nextMessage}>
            📎
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clippy;
