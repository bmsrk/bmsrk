import React from 'react';
import { SkillCategory, Project } from '../../../types';
import {
  ServerIcon,
  ZapIcon,
  CloudIcon,
  CodeIcon,
  NetworkIcon,
  ClipboardCheckIcon,
  UsersIcon,
} from '../../common/Icons';

interface SkillsGridProps {
  skills: SkillCategory[];
  projects: Project[];
  onSkillClick: (skill: string) => void;
}

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills, projects, onSkillClick }) => {
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
            {skillGroup.skills.map((skill, idx) => {
              // Calculate how many projects use this skill
              const count = projects.filter(p => p.technologies.includes(skill)).length;
              
              return (
                <button
                  key={idx}
                  onClick={() => onSkillClick(skill)}
                  className="inline-flex items-center bg-[#f3f2f1] border border-transparent rounded-full px-2.5 py-1 text-xs font-medium text-[#323130] hover:bg-[#eff6fc] hover:border-[#0078d4] transition-all cursor-pointer group"
                  title={`Click to learn more about ${skill}`}
                >
                  <span className="hover:text-[#0078d4]">{skill}</span>
                   
                  {/* Project Counter Badge */}
                  {count > 0 && (
                    <span
                      className="ml-2 flex items-center justify-center bg-[#c7e0f4] text-[#005a9e] text-[10px] font-bold h-5 min-w-[20px] px-1 rounded-full group-hover:bg-[#0078d4] group-hover:text-white transition-colors"
                      title={`Used in ${count} project${count !== 1 ? 's' : ''}`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(SkillsGrid);
