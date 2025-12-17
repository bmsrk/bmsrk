import React, { useMemo } from 'react';
import { Project } from '../../../types/types';
import { CheckMarkIcon, RocketIcon } from '../../common/Icons';

interface ProjectsGalleryProps {
  projects: Project[];
  filter: string | null;
  onFilterChange: (tag: string | null) => void;
}

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ projects, filter, onFilterChange }) => {

  // Extract all unique technologies from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.technologies.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  // Filter projects based on filter prop
  const filteredProjects = useMemo(() => {
    if (!filter) return projects;
    return projects.filter(p => p.technologies.includes(filter));
  }, [projects, filter]);

  return (
    <div className="space-y-6">
      
      {/* Introduction / Brag Doc Header */}
      <div className="bg-white border border-[#edebe9] rounded-sm p-4 shadow-sm mb-6 flex items-start gap-4">
          <div className="bg-[#eff6fc] p-3 rounded-full hidden md:block">
              <RocketIcon className="w-6 h-6 text-[#0078d4]" />
          </div>
          <div>
              <h2 className="text-lg font-bold text-[#201f1e] mb-1">Brag Document & Project Portfolio</h2>
              <p className="text-sm text-[#605e5c] leading-relaxed">
                  A curated collection of impactful projects where I applied my technical expertise. 
                  This section highlights the direct business value delivered through specific technology implementations.
              </p>
          </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#605e5c] uppercase tracking-wide">Filter by Technology</h3>
              {filter && (
                  <button 
                      onClick={() => onFilterChange(null)}
                      className="text-xs text-[#0078d4] hover:underline font-semibold"
                  >
                      Clear Filter
                  </button>
              )}
          </div>
          <div className="flex flex-wrap gap-2">
              <button
                  onClick={() => onFilterChange(null)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                      filter === null 
                      ? 'bg-[#0078d4] text-white border-[#0078d4]' 
                      : 'bg-white text-[#333] border-[#edebe9] hover:bg-[#f3f2f1]'
                  }`}
              >
                  All Projects
              </button>
              {allTags.map(tag => (
                  <button
                      key={tag}
                      onClick={() => onFilterChange(tag === filter ? null : tag)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                          filter === tag 
                          ? 'bg-[#0078d4] text-white border-[#0078d4]' 
                          : 'bg-white text-[#333] border-[#edebe9] hover:bg-[#f3f2f1]'
                      }`}
                  >
                      {tag}
                  </button>
              ))}
          </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white border border-[#edebe9] rounded-sm hover:shadow-fluent hover:border-[#c7e0f4] transition-all flex flex-col group h-full"
              >
                  {/* Card Header */}
                  <div className="p-4 border-b border-[#f3f2f1]">
                      <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-[#0078d4] text-[16px] group-hover:underline decoration-2 underline-offset-2">
                              {project.title}
                          </h3>
                          <span className="text-xs font-semibold bg-[#f3f2f1] px-2 py-0.5 rounded text-[#605e5c]">
                              {project.date}
                          </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-[#605e5c] font-medium">
                          <span>{project.role}</span>
                          {project.customer && <span>• {project.customer}</span>}
                      </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col">
                      <p className="text-sm text-[#323130] mb-4 leading-relaxed">
                          {project.description}
                      </p>
                      
                      {/* Impact / Key Results */}
                      <div className="mt-auto">
                          <h4 className="text-[11px] font-bold text-[#605e5c] uppercase tracking-wider mb-2">Impact & Outcomes</h4>
                          <ul className="space-y-1 mb-4">
                              {project.impact.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-[#333]">
                                      <CheckMarkIcon className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span className="leading-snug">{item}</span>
                                  </li>
                              ))}
                          </ul>

                          {/* Tech Stack Pills */}
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#f3f2f1]">
                              {project.technologies.map(tech => (
                                  <button
                                    key={tech}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent card click if added later
                                        onFilterChange(tech);
                                    }}
                                    className={`text-[10px] px-2 py-0.5 rounded-sm border cursor-pointer transition-colors ${
                                        filter === tech 
                                        ? 'bg-[#eff6fc] text-[#005a9e] border-[#c7e0f4] font-bold' 
                                        : 'bg-[#faf9f8] text-[#605e5c] border-[#edebe9] hover:bg-[#e1dfdd]'
                                    }`}
                                  >
                                      {tech}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
      
      {filteredProjects.length === 0 && (
          <div className="text-center py-10 bg-[#faf9f8] border border-dashed border-gray-300 rounded-sm">
              <p className="text-gray-500 text-sm">No projects found matching the selected filter.</p>
              <button 
                  onClick={() => onFilterChange(null)}
                  className="mt-2 text-[#0078d4] text-sm font-semibold hover:underline"
              >
                  Clear filters
              </button>
          </div>
      )}
    </div>
  );
};

export default ProjectsGallery;