import React, { useState, useEffect } from 'react';
import { CheckMarkIcon } from '../common/Icons';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface AchievementNotificationProps {
  achievement: Achievement;
  onDismiss: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({ achievement, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div 
      className={`fixed top-20 right-6 z-[100] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg shadow-2xl p-4 pr-6 min-w-[300px] border-2 border-yellow-600">
        <div className="flex items-start gap-3">
          <div className="text-4xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CheckMarkIcon className="w-4 h-4 text-green-700" />
              <span className="text-xs font-bold uppercase tracking-wider">Achievement Unlocked!</span>
            </div>
            <h3 className="font-bold text-sm mb-1">{achievement.title}</h3>
            <p className="text-xs text-gray-800">{achievement.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visited all tabs in the resume',
    icon: '🗺️',
    unlocked: false,
  },
  {
    id: 'konami',
    title: 'Classic Gamer',
    description: 'Discovered the Konami Code',
    icon: '🎮',
    unlocked: false,
  },
  {
    id: 'clippy',
    title: 'Nostalgia Trip',
    description: 'Met Clippy the helpful assistant',
    icon: '📎',
    unlocked: false,
  },
  {
    id: 'searcher',
    title: 'Detective',
    description: 'Used the search feature',
    icon: '🔍',
    unlocked: false,
  },
  {
    id: 'printer',
    title: 'Professional',
    description: 'Exported the resume to PDF',
    icon: '📄',
    unlocked: false,
  },
  {
    id: 'sharer',
    title: 'Networker',
    description: 'Shared the resume link',
    icon: '🔗',
    unlocked: false,
  },
  {
    id: 'speedrun',
    title: 'Speed Reader',
    description: 'Viewed 5 tabs in under 30 seconds',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Unlocked all achievements',
    icon: '🏆',
    unlocked: false,
  },
];
