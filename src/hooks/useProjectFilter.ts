import { useState, useCallback } from 'react';

export const useProjectFilter = () => {
  const [projectFilter, setProjectFilter] = useState<string | null>(null);

  const clearFilter = useCallback(() => setProjectFilter(null), []);
  const filterBySkill = useCallback((skill: string) => setProjectFilter(skill), []);

  return { projectFilter, setProjectFilter, clearFilter, filterBySkill };
};
