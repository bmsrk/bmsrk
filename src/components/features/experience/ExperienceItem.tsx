import React, { useState } from 'react';
import { Job } from '../../../types/types';
import { MapPinIcon, ClockIcon, ChevronDownIcon, ChevronRightIcon } from '../../common/Icons';

interface ExperienceItemProps {
  job: Job;
  defaultExpanded?: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ job, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggle = () => setIsExpanded(!isExpanded);

  return (
    <div className="relative group">
       {/* Timeline Node (Dot) - Interactive */}
       <button
         onClick={(e) => { e.stopPropagation(); toggle(); }}
         className={`absolute -left-[39px] md:-left-[47px] top-5 h-[14px] w-[14px] rounded-full border-[2px] border-white shadow-sm ring-1 transition-all duration-300 z-10 print:hidden focus:outline-none cursor-pointer ${
            isExpanded 
             ? 'bg-[#0078d4] ring-[#0078d4] scale-125' 
             : 'bg-white ring-[#e1dfdd] group-hover:bg-[#0078d4] group-hover:ring-[4px] group-hover:ring-[#c7e0f4] group-hover:scale-125'
         }`}
         aria-label={isExpanded ? "Collapse section" : "Expand section"}
         title={isExpanded ? "Collapse" : "Expand"}
       />
       
       {/* Horizontal Connector Line */}
       <div className={`absolute -left-[32px] md:-left-[40px] top-[26px] w-[32px] h-[2px] hidden md:block print:hidden transition-colors duration-300 ${
            isExpanded ? 'bg-[#0078d4]' : 'bg-[#e1dfdd]'
       }`}></div>

      {/* Main Card */}
      <div 
        className={`bg-white rounded-md border transition-all duration-300 relative print:border-none print:shadow-none print:p-0 print:mb-6 ${
            isExpanded 
            ? 'border-[#0078d4] shadow-fluent' 
            : 'border-[#edebe9] hover:border-[#c7e0f4] hover:shadow-fluent'
        }`}
      >
        {/* Header (Always visible & Clickable) */}
        <div 
            className="p-4 cursor-pointer flex items-start gap-3 select-none"
            onClick={toggle}
        >
             {/* Caret Icon */}
             <div className={`mt-0.5 text-[#605e5c] transition-transform duration-300 print:hidden ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                {isExpanded ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
             </div>

             <div className="flex-1">
                 <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                    <div>
                        <h3 className={`text-[16px] font-bold transition-colors duration-300 ${isExpanded ? 'text-[#0078d4]' : 'text-[#201f1e] group-hover:text-[#005a9e]'}`}>
                            {job.title}
                        </h3>
                        <div className="text-[14px] font-semibold text-[#484644] mt-0.5">
                            {job.company}
                        </div>
                    </div>
                    
                    {/* Compact Meta Data for Header */}
                     <div className="flex items-center gap-3 mt-1 md:mt-0 text-xs text-[#605e5c] min-w-fit">
                        <span className={`flex items-center gap-1.5 px-2 py-1 rounded-sm font-medium transition-colors duration-300 ${isExpanded ? 'bg-[#eff6fc] text-[#005a9e]' : 'bg-[#f3f2f1] text-[#605e5c]'} print:bg-transparent print:text-black print:p-0`}>
                            <ClockIcon className="w-3.5 h-3.5 print:hidden" />
                            {job.date}
                        </span>
                    </div>
                 </div>
             </div>
        </div>
      
        {/* Expanded Content */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} print:max-h-none print:opacity-100`}>
             <div className="px-4 pb-5 pl-[44px] print:pl-0 pt-0 border-t border-[#f3f2f1] print:border-none">
                 
                 {/* Location row (Clickable) */}
                 <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.location)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs text-[#605e5c] mb-4 mt-3 print:hidden hover:text-[#0078d4] hover:underline w-fit transition-colors"
                    title="View on Google Maps"
                 >
                    <MapPinIcon className="w-3.5 h-3.5" />
                    <span>{job.location}</span>
                 </a>

                 {job.intro && (
                    <div className="mb-4 text-[14px] text-[#323130] bg-[#faf9f8] p-3 rounded-sm border-l-[3px] border-[#0078d4] italic print:bg-transparent print:border-none print:p-0">
                      {job.intro}
                    </div>
                  )}
                  
                  <div className="print:hidden h-px bg-[#edebe9] mb-3"></div>

                  <h4 className="text-[11px] font-bold text-[#605e5c] uppercase tracking-wider mb-2 print:hidden">Key Responsibilities</h4>
                  <ul className="list-disc ml-4 space-y-2 text-[14px] text-[#323130] marker:text-[#0078d4] print:marker:text-black">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="pl-1 leading-relaxed">
                            {resp}
                        </li>
                      ))}
                  </ul>
             </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;