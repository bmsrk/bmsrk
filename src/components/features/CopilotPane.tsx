import React, { useState, useEffect, useRef } from 'react';
import { CopilotIcon } from '../common/Icons';

const TYPING_DELAY_MS = 1500;

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  actions?: string[];
}

const CopilotPane: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      sender: 'bot', 
      text: "Hi! I'm Bruno's Resume Copilot. I can tell you more about his background, key projects, or technical philosophy. What would you like to know?",
      actions: ["Tell me about your biggest project", "What is your Dynamics philosophy?", "Contact Info"]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleAction = async (action: string) => {
    // User message
    const userMsg: Message = { id: Date.now(), sender: 'user', text: action };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate thinking
    setTimeout(() => {
      let botResponse = "";
      let nextActions: string[] = [];

      switch(action) {
        case "Tell me about your biggest project":
          botResponse = "I led a massive CRM modernization for 10,000+ users across Latin America. We reduced downtime by 20% and sped up data access by 30% using Azure caching. It was a complex beast involving SAP integration and real-time sync.";
          nextActions = ["How did you handle the integration?", "What technologies were used?", "Back to start"];
          break;
        case "What is your Dynamics philosophy?":
          botResponse = "I believe in 'Low Code first, Pro Code when necessary'. Secure, scalable architecture should minimize technical debt. I focus on reducing operational costs while maximizing user adoption through intuitive design.";
          nextActions = ["Tell me about your biggest project", "Contact Info"];
          break;
        case "Contact Info":
          botResponse = "You can reach Bruno at bruno.m.servulo@gmail.com. He is based in São Bernardo do Campo, Brazil.";
          nextActions = ["Back to start"];
          break;
        case "How did you handle the integration?":
          botResponse = "We used Azure Service Bus for decoupling and high-volume transaction handling (50k+ daily). Logic Apps orchestrated the flow, ensuring reliability even if the ERP was down for maintenance.";
          nextActions = ["What technologies were used?", "Back to start"];
          break;
        case "What technologies were used?":
          botResponse = "The stack included Dynamics 365 CE, Azure Functions (C#), Service Bus, Logic Apps, and Power Automate for lighter workflows. We also used React for some custom PCF controls.";
          nextActions = ["Back to start"];
          break;
        default:
          botResponse = "I'm ready to answer more. What else are you curious about?";
          nextActions = ["Tell me about your biggest project", "What is your Dynamics philosophy?", "Contact Info"];
      }

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: botResponse,
        actions: nextActions
      }]);
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  };

  return (
    <div className="w-80 h-full bg-white border-l border-slate-200 flex flex-col shadow-xl z-50 absolute right-0 top-0 bottom-0 print:hidden">
      {/* Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <CopilotIcon className="w-6 h-6 text-purple-600" />
           <span className="font-semibold text-slate-800">Resume Copilot</span>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
            ✕
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50" ref={scrollRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-brand-100 text-brand-900 rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start mb-4">
             <div className="bg-white border border-slate-200 rounded-lg rounded-tl-none p-3 shadow-sm">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
             </div>
           </div>
        )}
      </div>

      {/* Actions Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex flex-wrap gap-2">
          {messages.length > 0 &&
            messages[messages.length - 1]?.sender === 'bot' &&
            !isTyping &&
            messages[messages.length - 1]?.actions?.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleAction(action)}
                className="text-xs bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 px-3 py-2 rounded-full transition-colors"
              >
                {action}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CopilotPane;