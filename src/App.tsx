import React from 'react';
import DynamicsShell from './components/layout/DynamicsShell';
import PrintableResume from './components/layout/PrintableResume';
import LoadingSkeleton from './components/common/LoadingSkeleton';
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
import { useResumeData, useTabNavigation, useProjectFilter } from './hooks';

const App: React.FC = () => {
  const { data: resumeData, loading, error } = useResumeData();
  const { activeTab, setActiveTab } = useTabNavigation();
  const { projectFilter, setProjectFilter } = useProjectFilter();

  const handlePrint = () => {
    window.print();
  };

  const handleSkillClick = (skill: string) => {
    setProjectFilter(skill);
    setActiveTab('projects');
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !resumeData) {
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