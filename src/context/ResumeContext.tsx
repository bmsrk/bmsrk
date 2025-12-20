import React, { createContext, useContext, ReactNode, useMemo } from 'react';
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

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      resumeData,
      loading,
      error,
      projectFilter,
      setProjectFilter,
      clearFilter,
      filterBySkill,
    }),
    [resumeData, loading, error, projectFilter, setProjectFilter, clearFilter, filterBySkill]
  );

  return <ResumeContext.Provider value={contextValue}>{children}</ResumeContext.Provider>;
};

export const useResumeContext = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
