import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../common/Icons';
import { Project, SkillMetadata } from '../../types';
import { getSkillUrl, getSkillDescription } from '../../utils';
import { getSimsAudio } from '../../utils/simsAudio';

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
  const simsAudio = getSimsAudio();

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
    simsAudio.stop();
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
      
      // Play Clippy's voice
      simsAudio.speak(response, 1.8, true);
    }, 500 + Math.random() * 500);
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[100] no-print transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative">
        {/* Speech Bubble */}
        <div className="absolute bottom-full right-0 mb-2 w-80 bg-yellow-50 border-[3px] border-yellow-400 rounded-lg shadow-2xl p-4 rpg-dialog max-h-[500px] overflow-y-auto">
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
          
          {/* Technology Explanation Mode */}
          {skill ? (
            <div className="pr-6">
              <h3 className="text-lg font-bold text-[#201f1e] mb-3 flex items-center gap-2 rpg-text">
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
                    className="rpg-button inline-flex items-center gap-2 px-4 py-2 bg-[#0078d4] hover:bg-[#106ebe] text-white text-sm font-semibold rounded transition-colors shadow-sm"
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
            </div>
          ) : (
            /* Easter Egg & Chat Mode */
            <div className="pr-6">
              <p className="text-sm text-gray-800 mb-3">
                {CLIPPY_MESSAGES[currentMessage]}
              </p>
              
              {/* Chat History */}
              {chatHistory.length > 0 && (
                <div className="mb-3 space-y-2 max-h-48 overflow-y-auto">
                  {chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-2 rounded ${
                        msg.type === 'user'
                          ? 'bg-blue-100 text-blue-900 ml-4'
                          : 'bg-yellow-100 text-gray-800 mr-4'
                      }`}
                    >
                      <span className="font-semibold">
                        {msg.type === 'user' ? 'You: ' : '📎 Clippy: '}
                      </span>
                      {msg.message}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-xs p-2 rounded bg-yellow-100 text-gray-800 mr-4">
                      <span className="font-semibold">📎 Clippy: </span>
                      <span className="animate-pulse">...</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="mt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 rounded focus:border-[#0078d4] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rpg-button px-3 py-2 bg-[#0078d4] hover:bg-[#106ebe] text-white text-sm font-bold rounded transition-all shadow-sm"
                  >
                    →
                  </button>
                </div>
              </form>
              
              <button 
                onClick={nextMessage}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                Tell me more →
              </button>
            </div>
          )}
          {/* Bubble Arrow */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-yellow-50 border-r-[3px] border-b-[3px] border-yellow-400 transform rotate-45"></div>
        </div>
        
        {/* Clippy Character - Larger with improved animations */}
        <div className="relative animate-clippy-pulse">
          <div className="text-[90px] leading-none cursor-pointer hover:scale-110 transition-transform filter drop-shadow-2xl" onClick={nextMessage}>
            📎
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clippy;
