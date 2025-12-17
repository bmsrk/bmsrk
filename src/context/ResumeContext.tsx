import React, { createContext, useContext, ReactNode } from 'react';
import { useResumeData } from '../hooks/useResumeData';
import { useProjectFilter } from '../hooks/useProjectFilter';
import { ResumeData } from '../types';

interface ResumeContextType {
  resumeData: ResumeData | null;
  loading: boolean;
  error: Error | null;
  projectFilter: string | null;
  setProjectFilter: (filter: string | null) => void;
  clearFilter: () => void;
  filterBySkill: (skill: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { resumeData, loading, error } = useResumeData();
  const { projectFilter, setProjectFilter, clearFilter, filterBySkill } = useProjectFilter();

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        loading,
        error,
        projectFilter,
        setProjectFilter,
        clearFilter,
        filterBySkill,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
