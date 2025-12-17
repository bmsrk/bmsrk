import React from 'react';
import { SkillCategory, Project } from '../types/types';
import SkillsGrid from '../components/features/skills/SkillsGrid';

interface SkillsPageProps {
  skills: SkillCategory[];
  projects: Project[];
  onSkillClick: (skill: string) => void;
}

const SkillsPage: React.FC<SkillsPageProps> = ({ skills, projects, onSkillClick }) => {
  return (
    <>
      <div className="mb-6 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#201f1e]">Core Technical Skills</h2>
        <p className="text-sm text-gray-500">Comprehensive list of technical competencies</p>
      </div>
      <SkillsGrid 
        skills={skills} 
        projects={projects}
        onSkillClick={onSkillClick}
      />
    </>
  );
};

export default SkillsPage;
