import React, { useMemo } from 'react';
import { Project } from '../../../types';
import { CheckMarkIcon, RocketIcon, BriefcaseIcon, CodeIcon, SearchIcon } from '../../common/Icons';

interface ProjectsGalleryProps {
  projects: Project[];
  filter: string | null;
  onFilterChange: (tag: string | null) => void;
}

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ projects, filter, onFilterChange }) => {

  // Extract unique segments (Business/Industry)
  const segments = useMemo(() => {
    const s = new Set<string>();
    projects.forEach(p => {
        if (p.customer) s.add(p.customer);
    });
    return Array.from(s).sort();
  }, [projects]);

  // Extract unique technologies
  const allTechnologies = useMemo(() => {
    const t = new Set<string>();
    projects.forEach(p => p.technologies.forEach(tech => t.add(tech)));
    return Array.from(t).sort();
  }, [projects]);

  // Filter logic: Match either Technology OR Customer/Segment
  const filteredProjects = useMemo(() => {
    if (!filter) return projects;
    return projects.filter(p => 
        p.technologies.includes(filter) || 
        p.customer === filter
    );
  }, [projects, filter]);

  const hasNoFilteredResults = filteredProjects.length === 0 && filter !== null;

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
                  A curated collection of impactful projects demonstrating technical leadership and business value.
                  Select a <strong>Business Segment</strong> or <strong>Technology</strong> below to filter the case studies.
              </p>
          </div>
      </div>

      {/* Filter Control Board */}
      <div className="bg-white border border-[#edebe9] rounded-sm p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f3f2f1] pb-3 mb-3">
              <h3 className="text-xs font-bold text-[#605e5c] uppercase tracking-wide">Filter Projects</h3>
              <button 
                  onClick={() => onFilterChange(null)}
                  className={`text-xs font-semibold hover:underline self-start sm:self-auto ${filter ? 'text-[#0078d4]' : 'text-gray-400 cursor-default'}`}
                  disabled={!filter}
                  aria-label={filter ? `Clear filter: ${filter}` : 'No active filters'}
                  title={filter ? `Clear filter: ${filter}` : 'No active filters to clear'}
              >
                  Clear All Filters
              </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Business Segments Dropdown */}
              <div>
                   <label htmlFor="segment-filter" className="flex items-center gap-2 mb-2 text-sm font-semibold text-[#201f1e]">
                       <BriefcaseIcon className="w-4 h-4 text-[#004578]" />
                       <span>Business Segments</span>
                   </label>
                   <select
                       id="segment-filter"
                       value={filter && segments.includes(filter) ? filter : ''}
                       onChange={(e) => onFilterChange(e.target.value || null)}
                       className="w-full px-3 py-2 text-sm border border-[#8a8886] rounded-sm bg-white text-[#323130] focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4] hover:border-[#605e5c] transition-colors"
                   >
                       <option value="">All Business Segments</option>
                       {segments.map(seg => (
                           <option key={seg} value={seg}>{seg}</option>
                       ))}
                   </select>
              </div>

              {/* Technologies Dropdown */}
              <div>
                   <label htmlFor="tech-filter" className="flex items-center gap-2 mb-2 text-sm font-semibold text-[#201f1e]">
                       <CodeIcon className="w-4 h-4 text-[#C71D7E]" />
                       <span>Technology Stack</span>
                   </label>
                   <select
                       id="tech-filter"
                       value={filter && allTechnologies.includes(filter) ? filter : ''}
                       onChange={(e) => onFilterChange(e.target.value || null)}
                       className="w-full px-3 py-2 text-sm border border-[#8a8886] rounded-sm bg-white text-[#323130] focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4] hover:border-[#605e5c] transition-colors"
                   >
                       <option value="">All Technologies</option>
                       {allTechnologies.map(tech => (
                           <option key={tech} value={tech}>{tech}</option>
                       ))}
                   </select>
              </div>
          </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white border border-[#edebe9] rounded-sm hover:shadow-fluent hover:border-[#c7e0f4] transition-all flex flex-col group h-full animate-fade-in"
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
                          {project.customer && (
                              <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFilterChange(project.customer || null);
                                }}
                                className={`flex items-center gap-1 hover:text-[#0078d4] hover:underline transition-colors ${filter === project.customer ? 'font-bold text-[#0078d4]' : ''}`}
                                title="Filter by this segment"
                              >
                                  <span>•</span>
                                  {project.customer}
                              </button>
                          )}
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
                                        e.stopPropagation(); 
                                        onFilterChange(tech);
                                    }}
                                    className={`text-[10px] px-2 py-0.5 rounded-sm border cursor-pointer transition-colors ${
                                        filter === tech 
                                        ? 'bg-[#fdf3f9] text-[#C71D7E] border-[#C71D7E] font-bold' 
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
      
      {hasNoFilteredResults && (
          <div className="text-center py-12 bg-white border border-[#edebe9] rounded-sm shadow-sm">
              <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-[#f3f2f1] rounded-full flex items-center justify-center">
                      <SearchIcon className="w-8 h-8 text-[#605e5c]" />
                  </div>
                  <div>
                      <p className="text-[#201f1e] text-base font-semibold mb-1">No projects found</p>
                      <p className="text-[#605e5c] text-sm">No projects match the filter: <strong>{filter}</strong></p>
                  </div>
                  <button 
                      onClick={() => onFilterChange(null)}
                      className="mt-2 px-4 py-2 bg-[#0078d4] text-white text-sm font-semibold rounded hover:bg-[#106ebe] transition-colors"
                      aria-label={`Clear filter: ${filter}`}
                  >
                      Clear filter
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default React.memo(ProjectsGallery);
