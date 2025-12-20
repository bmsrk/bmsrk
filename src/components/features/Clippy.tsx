import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../common/Icons';

interface ClippyProps {
  onClose: () => void;
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

const Clippy: React.FC<ClippyProps> = ({ onClose }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100);
    
    // Random message
    setCurrentMessage(Math.floor(Math.random() * CLIPPY_MESSAGES.length));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % CLIPPY_MESSAGES.length);
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative">
        {/* Speech Bubble */}
        <div className="absolute bottom-full right-0 mb-2 w-72 bg-yellow-50 border-2 border-yellow-400 rounded-lg shadow-2xl p-4">
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-800 pr-6">
            {CLIPPY_MESSAGES[currentMessage]}
          </p>
          <button 
            onClick={nextMessage}
            className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-semibold"
          >
            Tell me more →
          </button>
          {/* Bubble Arrow */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-yellow-50 border-r-2 border-b-2 border-yellow-400 transform rotate-45"></div>
        </div>
        
        {/* Clippy Character */}
        <div className="relative animate-bounce-gentle">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-2xl cursor-pointer hover:scale-110 transition-transform"
            onClick={nextMessage}
          >
            {/* Paperclip Body */}
            <path 
              d="M45 20 Q30 20 30 35 L30 70 Q30 85 45 85 Q60 85 60 70 L60 40 Q60 30 50 30 Q40 30 40 40 L40 65" 
              stroke="#C0C0C0" 
              strokeWidth="8" 
              fill="none" 
              strokeLinecap="round"
            />
            {/* Eyes */}
            <circle cx="42" cy="45" r="3" fill="#000" />
            <circle cx="52" cy="45" r="3" fill="#000" />
            {/* Smile */}
            <path 
              d="M40 55 Q47 60 54 55" 
              stroke="#000" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round"
            />
            {/* Shine effect */}
            <path 
              d="M40 25 L42 27" 
              stroke="#FFF" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Clippy;
