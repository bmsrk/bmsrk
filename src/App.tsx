import React, { useState, useEffect } from 'react';
import { ResumeData } from './types/types';
import DynamicsShell from './components/layout/DynamicsShell';
import PrintableResume from './components/layout/PrintableResume';
import { 
  SummaryPage, 
  ProjectsPage, 
  ExperiencePage, 
  SkillsPage, 
  QualificationsPage, 
  AboutPage, 
  HirePage, 
  DocsPage 
} from './pages';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(true);
  
  // State for Project Filtering (Lifted up to share between Skills and Projects tabs)
  const [projectFilter, setProjectFilter] = useState<string | null>(null);

  useEffect(() => {
    fetch('./resume_data.json')
      .then(response => response.json())
      .then((data: ResumeData) => {
        setResumeData(data);
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
    skills, 
    experience, 
    education, 
    certifications, 
    languages,
    projects,
    aboutMe
  } = resumeData;

  return (
    <DynamicsShell onPrint={handlePrint} title={resumeData.name} activeTab={activeTab} onTabChange={setActiveTab} data={resumeData}>
      
      {/* TAB: PRINTABLE VERSION (ATS FRIENDLY) */}
      {activeTab === 'printable' ? (
        <PrintableResume data={resumeData} />
      ) : (
        <>
          {/* TAB: SUMMARY */}
          <div className={`tab-content ${activeTab === 'summary' ? 'block' : 'hidden'}`}>
            <SummaryPage data={resumeData} />
          </div>

          {/* TAB: PROJECTS (Brag Doc) */}
          <div className={`tab-content ${activeTab === 'projects' ? 'block' : 'hidden'}`}>
            <ProjectsPage 
              projects={projects || []} 
              filter={projectFilter}
              onFilterChange={setProjectFilter}
            />
          </div>

          {/* TAB: HIRE ME */}
          <div className={`tab-content ${activeTab === 'hire' ? 'block' : 'hidden'}`}>
            <HirePage />
          </div>

          {/* TAB: MY STORY */}
          <div className={`tab-content ${activeTab === 'about' ? 'block' : 'hidden'}`}>
            <AboutPage aboutMe={aboutMe} />
          </div>

          {/* TAB: EXPERIENCE */}
          <div className={`tab-content ${activeTab === 'experience' ? 'block' : 'hidden'}`}>
            <ExperiencePage experience={experience} />
          </div>

          {/* TAB: SKILLS */}
          <div className={`tab-content ${activeTab === 'skills' ? 'block' : 'hidden'}`}>
            <SkillsPage 
              skills={skills} 
              projects={projects || []}
              onSkillClick={handleSkillClick}
            />
          </div>

          {/* TAB: SOLUTION DOCS */}
          <div className={`tab-content ${activeTab === 'docs' ? 'block' : 'hidden'}`}>
            <DocsPage />
          </div>

          {/* TAB: QUALIFICATIONS */}
          <div className={`tab-content ${activeTab === 'qualifications' ? 'block' : 'hidden'}`}>
            <QualificationsPage 
              education={education}
              certifications={certifications}
              languages={languages}
            />
          </div>
        </>
      )}

    </DynamicsShell>
  );
};

export default App;