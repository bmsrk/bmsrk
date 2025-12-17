import React from 'react';
import { Job } from '../types/types';
import ExperienceItem from '../components/features/experience/ExperienceItem';

interface ExperiencePageProps {
  experience: Job[];
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ experience }) => {
  return (
    <>
      <div className="mb-6 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#201f1e]">Professional Experience</h2>
        <p className="text-sm text-gray-500">Chronological history of roles and projects</p>
      </div>
      
      {/* Timeline Container */}
      <div className="relative mt-2 ml-2 md:ml-4 border-l-[2px] border-[#e1dfdd] pl-8 md:pl-10 space-y-6 py-2">
        {experience.map((job, index) => (
          <ExperienceItem key={index} job={job} defaultExpanded={index === 0} />
        ))}
      </div>
    </>
  );
};

export default ExperiencePage;
