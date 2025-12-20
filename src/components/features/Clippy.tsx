import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../common/Icons';
import { Project } from '../../types';
import { getSkillUrl, getSkillDescription } from '../../constants/skillUrls';

interface ClippyProps {
  onClose: () => void;
  skill?: string;
  projects?: Project[];
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

const Clippy: React.FC<ClippyProps> = ({ onClose, skill, projects = [] }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate project count for the skill
  const projectCount = skill
    ? projects.filter((p) => p.technologies.includes(skill)).length
    : 0;

  // Get skill description
  const skillDescription = skill ? getSkillDescription(skill) : '';
  const skillUrl = skill ? getSkillUrl(skill) : '';

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
                {skillDescription}
              </p>
              {projectCount > 0 && (
                <p className="text-sm font-semibold text-[#0078d4] mb-3">
                  Bruno has used this in {projectCount} project{projectCount !== 1 ? 's' : ''}!
                </p>
              )}
              <div className="flex gap-2">
                <a
                  href={skillUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                >
                  🔗 Learn More
                </a>
                <button 
                  onClick={nextMessage}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold ml-2"
                >
                  Tell me more →
                </button>
              </div>
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
