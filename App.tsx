import React, { useState, useEffect } from 'react';
import { ResumeData, SkillCategory, Achievement, Job, Education, Project } from './types';
import Section from './components/Section';
import ExperienceItem from './components/ExperienceItem';
import SkillsGrid from './components/SkillsGrid';
import DynamicsShell from './components/DynamicsShell';
import FormField from './components/FormField';
import ProjectsGallery from './components/ProjectsGallery';
import SolutionDocs from './components/SolutionDocs';
import PrintableResume from './components/PrintableResume';
import HireMe from './components/HireMe';
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon, GlobeIcon, CheckMarkIcon } from './components/Icons';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(true);
  
  // State for Project Filtering (Lifted up to share between Skills and Projects tabs)
  const [projectFilter, setProjectFilter] = useState<string | null>(null);

  useEffect(() => {
    fetch('./resume_data.json')
      .then(response => response.json())
      .then((data: any) => {
        // Adapt new JSON structure to ResumeData interface
        const adaptedData: ResumeData = {
            name: data.personal.name,
            title: data.personal.title,
            contact: {
                location: data.personal.location,
                email: data.personal.email,
                phone: data.personal.phone,
                linkedin: data.personal.linkedin,
                portfolio: data.personal.portfolio
            },
            summary: data.professional_summary,
            aboutMe: [data.professional_summary],
            // Map core_competencies (string[]) to achievements (Achievement[])
            achievements: data.core_competencies.map((c: string) => ({
                title: c,
                description: "Core Competency"
            })),
            // Map technical_skills object to SkillCategory[]
            skills: Object.entries(data.technical_skills).map(([category, skills]) => ({
                category: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                skills: skills as string[]
            })),
            experience: data.professional_experience.map((job: any) => ({
                company: job.company,
                title: job.position,
                date: `${job.start_date} - ${job.end_date}`,
                location: job.location,
                intro: job.description,
                responsibilities: job.achievements,
                technologies: job.technologies
            })),
            education: data.education.map((edu: any) => ({
                institution: edu.institution,
                degree: edu.degree,
                year: edu.graduation_year
            })),
            certifications: data.certifications.map((c: any) => c.name),
            languages: data.languages.map((l: any) => `${l.language} (${l.proficiency})`),
            projects: data.key_projects.map((p: any, index: number) => ({
                id: `proj-${index}`,
                title: p.project_name,
                role: p.role,
                customer: p.client_industry,
                date: p.year,
                description: p.description,
                technologies: p.technologies,
                impact: p.key_results
            }))
        };

        setResumeData(adaptedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load resume data", error);
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleSkillClick = (skill: string) => {
      setProjectFilter(skill);
      setActiveTab('projects');
  };

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center h-screen bg-[#f3f2f1] gap-4">
              <div className="relative w-12 h-12">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-[#0078d4] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="text-[#0078d4] font-semibold">Loading Dynamics 365...</div>
          </div>
      );
  }

  if (!resumeData) {
      return <div className="flex items-center justify-center h-screen bg-red-50 text-red-600">Error loading data.</div>;
  }

  const { 
    name, 
    title, 
    contact, 
    summary, 
    aboutMe,
    skills, 
    achievements, 
    experience, 
    education, 
    certifications, 
    languages,
    projects
  } = resumeData;

  return (
    <DynamicsShell onPrint={handlePrint} title={name} activeTab={activeTab} onTabChange={setActiveTab} data={resumeData}>
      
      {/* 
        TAB: PRINTABLE VERSION (ATS FRIENDLY)
      */}
      {activeTab === 'printable' ? (
          <PrintableResume data={resumeData} />
      ) : (
        <>
            {/* 
                TAB: SUMMARY 
            */}
            <div className={`tab-content ${activeTab === 'summary' ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left Column - General Info (4/12) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white lg:border border-[#edebe9] lg:shadow-sm lg:p-4 rounded-sm">
                            <Section title="General Information">
                                <FormField label="Full Name" value={name} />
                                <FormField label="Job Title" value={title} />
                                <FormField label="Status" value="Active Candidate" />
                                <FormField label="Availability" value="Immediate" />
                                <FormField label="Preferred Location" value="Remote / Hybrid" />
                            </Section>
                            
                            <div className="mt-6"></div>

                            <Section title="Contact Details">
                                <FormField label="Email" value={contact.email} isLink href={`mailto:${contact.email}`} icon={<MailIcon />} />
                                <FormField label="Phone" value={contact.phone} icon={<PhoneIcon />} />
                                <FormField label="Location" value={contact.location} icon={<MapPinIcon />} />
                                <FormField label="LinkedIn" value={contact.linkedin.replace('linkedin.com/in/', '')} isLink href={`https://${contact.linkedin}`} icon={<LinkedinIcon />} />
                                <FormField label="Portfolio" value={contact.portfolio} isLink href={`https://${contact.portfolio}`} icon={<GlobeIcon />} />
                            </Section>
                        </div>
                    </div>

                    {/* Middle Column - Summary & Competencies (8/12) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white lg:border border-[#edebe9] lg:shadow-sm lg:p-4 rounded-sm h-full">
                            <Section title="Professional Summary">
                                <div className="mb-6">
                                    <div className="text-[11px] font-normal text-[#605e5c] uppercase tracking-wide mb-1">
                                        About
                                    </div>
                                    <div className="text-[13px] text-[#201f1e] leading-relaxed whitespace-pre-wrap">
                                        {summary}
                                    </div>
                                </div>
                            </Section>

                            <Section title="Core Competencies">
                                <div className="border border-[#edebe9] rounded-sm overflow-hidden mt-2 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {achievements.map((comp, i) => (
                                            <div key={i} className="p-3 border-b border-r border-[#edebe9] last:border-0 hover:bg-[#eff6fc] transition-colors flex items-center gap-2">
                                                <CheckMarkIcon className="w-4 h-4 text-[#0078d4] flex-shrink-0" />
                                                <span className="text-[13px] font-semibold text-[#323130]">{comp.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Section>
                        </div>
                    </div>
                </div>
            </div>

            {/* 
                TAB: PROJECTS (Brag Doc)
            */}
            <div className={`tab-content ${activeTab === 'projects' ? 'block' : 'hidden'}`}>
                <div className="mb-6 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-[#201f1e]">Projects & Impact (Brag Doc)</h2>
                    <p className="text-sm text-gray-500">Key initiatives demonstrating technical leadership and outcomes</p>
                </div>
                <ProjectsGallery 
                    projects={projects || []} 
                    filter={projectFilter}
                    onFilterChange={setProjectFilter}
                />
            </div>

            {/* 
                TAB: HIRE ME (New)
            */}
            <div className={`tab-content ${activeTab === 'hire' ? 'block' : 'hidden'}`}>
                <div className="mb-6 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-[#201f1e]">Professional Services</h2>
                    <p className="text-sm text-gray-500">Contract rates and engagement models</p>
                </div>
                <HireMe />
            </div>

            {/* 
                TAB: MY STORY 
            */}
            <div className={`tab-content ${activeTab === 'about' ? 'block' : 'hidden'}`}>
                <div className="mb-6 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-[#201f1e]">My Professional Story</h2>
                    <p className="text-sm text-gray-500">A deeper dive into my journey, drive, and aspirations</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Section title="Biography">
                        <div className="bg-white p-6 md:p-10 border border-[#edebe9] shadow-sm rounded-sm">
                            {aboutMe && aboutMe.map((paragraph, idx) => (
                                <p key={idx} className="text-[14px] leading-7 text-[#323130] mb-6 last:mb-0 text-justify">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </Section>
                </div>
            </div>

            {/* 
                TAB: EXPERIENCE 
            */}
            <div className={`tab-content ${activeTab === 'experience' ? 'block' : 'hidden'}`}>
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
            </div>

            {/* 
                TAB: SKILLS 
            */}
            <div className={`tab-content ${activeTab === 'skills' ? 'block' : 'hidden'}`}>
                <div className="mb-6 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-[#201f1e]">Core Technical Skills</h2>
                    <p className="text-sm text-gray-500">Comprehensive list of technical competencies</p>
                </div>
                <SkillsGrid 
                    skills={skills} 
                    projects={projects || []}
                    onSkillClick={handleSkillClick}
                />
            </div>

            {/* 
                TAB: SOLUTION DOCS
            */}
            <div className={`tab-content ${activeTab === 'docs' ? 'block' : 'hidden'}`}>
                <div className="mb-6 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-[#201f1e]">System Architecture</h2>
                    <p className="text-sm text-gray-500">Technical documentation of the solution</p>
                </div>
                <SolutionDocs />
            </div>

            {/* 
                TAB: QUALIFICATIONS
            */}
            <div className={`tab-content ${activeTab === 'qualifications' ? 'block' : 'hidden'}`}>
                <div className="mb-6 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-[#201f1e]">Qualifications & Credentials</h2>
                    <p className="text-sm text-gray-500">Academic background and certified expertise</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Col: Education & Languages */}
                    <div className="space-y-8">
                        <Section title="Education">
                            {education.map((edu, index) => (
                            <div key={index} className="flex gap-4 p-4 bg-white border border-[#edebe9] rounded-sm hover:shadow-fluent transition-shadow">
                                <div className="w-12 h-12 bg-[#f3f2f1] flex items-center justify-center rounded-sm text-[#0078d4]">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.51 9L12 4.36 20.49 9 12 13.64 3.51 9zM12 16c-3.31 0-6-2.69-6-6v-1.5l6 3.27 6-3.27V10c0 3.31-2.69 6-6 6z"/></svg>
                                </div>
                                <div>
                                    <h3 className="text-[15px] font-bold text-[#201f1e]">{edu.institution}</h3>
                                    <div className="text-[13px] text-[#323130] mt-1">{edu.degree}</div>
                                    <div className="text-xs text-gray-500 mt-1 font-semibold">{edu.year}</div>
                                </div>
                            </div>
                            ))}
                        </Section>
                        
                        <Section title="Languages">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {languages.map((lang, index) => (
                                    <div key={index} className="flex items-center justify-between text-sm p-3 bg-white border border-[#edebe9] rounded-sm">
                                        <span className="font-medium text-[#201f1e]">{lang.split('(')[0]}</span>
                                        <span className="text-[#0078d4] bg-[#eff6fc] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{lang.split('(')[1]?.replace(')', '') || 'Native'}</span>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    </div>

                    {/* Right Col: Certifications */}
                    <div>
                        <Section title="Certifications">
                            <div className="bg-white border border-[#edebe9] rounded-sm overflow-hidden">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 border-b border-[#edebe9] last:border-0 hover:bg-[#f3f2f1] transition-colors">
                                        <div className="mt-1 min-w-[18px] text-[#0078d4]">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className="w-4 h-4">
                                                <path d="M1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-103 245-160 207-208 160-245 103-272 37q-141 0-272-36t-245-103-207-160-160-208-103-245-37-272q0-141 36-272t103-245 160-207 208-160T752 37t272-37zm403 685l-595 595-291-291 90-90 201 201 505-505 90 90z" />
                                            </svg>
                                        </div>
                                        <span className="text-[13px] text-[#333] leading-snug">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
        </>
      )}

    </DynamicsShell>
  );
};

export default App;