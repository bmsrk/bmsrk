import React from 'react';
import { Project } from '../types/types';
import ProjectsGallery from '../components/features/projects/ProjectsGallery';

interface ProjectsPageProps {
  projects: Project[];
  filter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, filter, onFilterChange }) => {
  return (
    <>
      <div className="mb-6 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#201f1e]">Projects & Impact (Brag Doc)</h2>
        <p className="text-sm text-gray-500">Key initiatives demonstrating technical leadership and outcomes</p>
      </div>
      <ProjectsGallery 
        projects={projects} 
        filter={filter}
        onFilterChange={onFilterChange}
      />
    </>
  );
};

export default ProjectsPage;
