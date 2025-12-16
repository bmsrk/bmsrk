import React from 'react';
import { SkillCategory } from '../types';
import { getSkillUrl, getSkillDescription } from '../constants';
import { 
  ServerIcon, 
  ZapIcon, 
  CloudIcon, 
  CodeIcon, 
  NetworkIcon, 
  ClipboardCheckIcon, 
  UsersIcon 
} from './Icons';

interface SkillsGridProps {
  skills: SkillCategory[];
}

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills }) => {
  const getIcon = (category: string) => {
    const className = "w-4 h-4";
    switch (category) {
      case "CRM Platforms": return <ServerIcon className={`${className} text-[#0078d4]`} />;
      case "Power Platform": return <ZapIcon className={`${className} text-[#8E569E]`} />; 
      case "Azure Services": return <CloudIcon className={`${className} text-[#008AD7]`} />; 
      case "Development": return <CodeIcon className={`${className} text-[#C71D7E]`} />;
      case "Integration": return <NetworkIcon className={`${className} text-[#FF8C00]`} />;
      case "Methodologies": return <ClipboardCheckIcon className={`${className} text-[#107C10]`} />;
      case "Leadership": return <UsersIcon className={`${className} text-[#004578]`} />;
      default: return <CodeIcon className={`${className} text-gray-500`} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:block">
      {skills.map((skillGroup, index) => (
        <div key={index} className="break-inside-avoid flex flex-col h-full bg-white border border-[#edebe9] rounded-sm shadow-sm hover:shadow-fluent transition-shadow">
          {/* Category Header */}
          <div className="flex items-center gap-2 p-3 border-b border-[#f3f2f1] bg-[#fbfbfb]">
             <span className="p-1.5 bg-white rounded-sm border border-[#edebe9] print:hidden">
               {getIcon(skillGroup.category)}
             </span>
             <h3 className="font-bold text-[#201f1e] text-[14px]">
                {skillGroup.category}
             </h3>
          </div>
          
          {/* Skills Pills Grid */}
          <div className="p-4 flex flex-wrap gap-2 content-start">
            {skillGroup.skills.map((skill, idx) => (
              <a 
                key={idx} 
                href={getSkillUrl(skill)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-2.5 py-1 bg-[#f3f2f1] hover:bg-[#eff6fc] hover:text-[#0078d4] hover:border-[#0078d4] border border-transparent rounded-full text-xs font-medium text-[#323130] transition-all cursor-pointer"
                title={getSkillDescription(skill)}
              >
                {skill}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsGrid;