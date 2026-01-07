import React, { useState, useEffect } from 'react';
import { CloseIcon, ClippyIcon } from '../common/Icons';
import { Project, SkillMetadata } from '../../types';
import { getSkillUrl, getSkillDescription } from '../../utils';

interface ClippyProps {
  onClose: () => void;
  skill?: string;
  projects?: Project[];
  skillMetadata?: Record<string, SkillMetadata>;
}

const CLIPPY_MESSAGES = [
  "Looking to learn more? I'm here to help!",
  "Click on any skill to see project details and learn more.",
  "Need information? Try exploring the different tabs.",
  "Questions? Feel free to browse around or ask me!",
];

// Easter egg responses for chat
const getClippyResponse = (input: string): string => {
  const lowerInput = input.toLowerCase().trim();
  
  if (lowerInput.includes('dynamics') || lowerInput.includes('d365')) {
    return "Dynamics 365? Bruno's been doing that for 10+ years. That's like 100 in dog years! 🐕";
  }
  if (lowerInput.includes('azure')) {
    return "Azure integrations? Bruno's processed over 50,000 daily transactions. That's a LOT of clouds! ☁️";
  }
  if (lowerInput.includes('help')) {
    return "Need help? Try clicking on different tabs, or ask me about any skill you see! 💡";
  }
  if (lowerInput.includes('ninja cat') || lowerInput.includes('ninjacat')) {
    return "Ah, the legendary Ninja Cat! We go way back. I taught it the art of the paperclip. 🥷📎";
  }
  if (lowerInput.includes('microsoft') || lowerInput.includes('msft')) {
    return "Microsoft? Bruno is a Microsoft Certified Trainer with multiple certifications! 🎓";
  }
  if (lowerInput.includes('power platform') || lowerInput.includes('powerapps')) {
    return "Power Platform is Bruno's specialty! PCF components, Power Apps, Power Automate - you name it! ⚡";
  }
  if (lowerInput.includes('react') || lowerInput.includes('typescript')) {
    return "This whole portfolio was built with React and TypeScript! Meta, right? 🤓";
  }
  if (lowerInput.includes('clippy') || lowerInput.includes('you')) {
    return "Me? I'm just here to help! Been doing this since '97. Still got it! 😎📎";
  }
  if (lowerInput.includes('hire') || lowerInput.includes('rate') || lowerInput.includes('contract')) {
    return "Interested in hiring Bruno? Check out the 'Hire Me' tab for rates and availability! 💼";
  }
  if (lowerInput.includes('experience') || lowerInput.includes('years')) {
    return "Bruno has 10+ years of enterprise-scale Dynamics 365 experience across multiple industries! 💪";
  }
  
  // Fallback responses
  const fallbacks = [
    "That's a great question! Try exploring the different tabs to learn more! 🔍",
    "Interesting! Bruno has worked on projects across finance, manufacturing, and government sectors! 🏢",
    "Good thinking! You can click on any skill to see which projects used it! 🎯",
    "I like your curiosity! Check out the Projects tab to see Bruno's impressive work! 🚀",
    "Keep exploring! There are lots of Easter eggs hidden in this portfolio! 🥚",
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)] || fallbacks[0]!;
};

const Clippy: React.FC<ClippyProps> = ({ onClose, skill, projects = [], skillMetadata }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'clippy'; message: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);

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

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory([...chatHistory, { type: 'user', message: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getClippyResponse(userMessage);
      setChatHistory((prev) => [...prev, { type: 'clippy', message: response }]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[100] no-print transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative">
        {/* Office 97 Style Dialog */}
        <div className="absolute bottom-full right-0 mb-2 w-96 bg-[#c0c0c0] rounded-sm shadow-[inset_1px_1px_0_0_#dfdfdf,inset_-1px_-1px_0_0_#808080,2px_2px_8px_rgba(0,0,0,0.4)] max-h-[500px] overflow-hidden" style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}>
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClippyIcon size="sm" className="w-4 h-4" />
              <span className="text-white text-xs font-bold tracking-wide">Office Assistant</span>
            </div>
            <button 
              onClick={handleClose}
              className="bg-[#c0c0c0] hover:bg-[#e0e0e0] active:bg-[#a0a0a0] w-5 h-5 flex items-center justify-center text-black text-xs font-bold shadow-[inset_1px_1px_0_0_#fff,inset_-1px_-1px_0_0_#808080]"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Content Area */}
          <div className="p-3 bg-[#c0c0c0] max-h-[450px] overflow-y-auto">
            <div className="bg-white border-[2px] shadow-[inset_-1px_-1px_0_0_#fff,inset_1px_1px_0_0_#808080] p-3"
              style={{ borderTopColor: '#808080', borderLeftColor: '#808080', borderRightColor: '#dfdfdf', borderBottomColor: '#dfdfdf' }}
            >
          
          {/* Technology Explanation Mode */}
          {skill ? (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ClippyIcon size="2xl" className="w-16 h-16" />
                <h3 className="text-base font-bold text-black flex-1" style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}>
                  {skill}
                </h3>
              </div>
              <p className="text-sm text-black mb-3 leading-relaxed">
                {description}
              </p>
              {projectCount > 0 && (
                <p className="text-sm font-bold text-[#000080] mb-3">
                  Bruno has used this in {projectCount} project{projectCount !== 1 ? 's' : ''}!
                </p>
              )}
              {skillUrl && (
                <div className="mt-4 pt-3 border-t-[2px] border-[#808080]">
                  <a
                    href={skillUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#c0c0c0] hover:bg-[#d0d0d0] active:bg-[#a0a0a0] text-black text-sm font-bold shadow-[inset_1px_1px_0_0_#fff,inset_-1px_-1px_0_0_#808080,1px_1px_0_0_#000] transition-all"
                    style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Learn More
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Easter Egg & Chat Mode */
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ClippyIcon size="2xl" className="w-16 h-16" />
                <p className="text-sm text-black flex-1">
                  {CLIPPY_MESSAGES[currentMessage]}
                </p>
              </div>
              
              {/* Chat History */}
              {chatHistory.length > 0 && (
                <div className="mb-3 space-y-2 max-h-48 overflow-y-auto">
                  {chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-2 border ${
                        msg.type === 'user'
                          ? 'bg-[#fff] border-[#808080] ml-4'
                          : 'bg-[#ffffcc] border-[#808080] mr-4'
                      }`}
                      style={{ borderTopColor: msg.type === 'user' ? '#808080' : '#808080', borderLeftColor: msg.type === 'user' ? '#808080' : '#808080' }}
                    >
                      <span className="font-bold">
                        {msg.type === 'user' ? 'You: ' : '📎 Clippy: '}
                      </span>
                      {msg.message}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-xs p-2 border bg-[#ffffcc] border-[#808080] mr-4">
                      <span className="font-bold">📎 Clippy: </span>
                      <span className="animate-pulse">...</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-2 py-1 text-sm border-[2px] bg-white shadow-[inset_-1px_-1px_0_0_#fff,inset_1px_1px_0_0_#808080] focus:outline-none focus:border-[#000080]"
                  style={{ borderTopColor: '#808080', borderLeftColor: '#808080', borderRightColor: '#dfdfdf', borderBottomColor: '#dfdfdf', fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#c0c0c0] hover:bg-[#d0d0d0] active:bg-[#a0a0a0] text-black text-sm font-bold shadow-[inset_1px_1px_0_0_#fff,inset_-1px_-1px_0_0_#808080,1px_1px_0_0_#000]"
                  style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}
                >
                  →
                </button>
              </form>
              
              <button 
                onClick={nextMessage}
                className="mt-3 text-xs text-[#000080] hover:underline font-bold"
                style={{ fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif' }}
              >
                Tell me more →
              </button>
            </div>
          )}
            </div>
          </div>
        </div>
        
        {/* Clippy Character - Larger and more prominent */}
        <div className="relative animate-clippy-pulse">
          <div className="cursor-pointer hover:scale-110 transition-transform filter drop-shadow-2xl" onClick={nextMessage}>
            <ClippyIcon size="4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clippy;
