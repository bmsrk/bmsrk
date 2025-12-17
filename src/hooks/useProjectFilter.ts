import { useState, useCallback } from 'react';

export const useProjectFilter = () => {
  const [projectFilter, setProjectFilter] = useState<string | null>(null);

  const clearFilter = useCallback(() => {
    setProjectFilter(null);
  }, []);

  return { projectFilter, setProjectFilter, clearFilter };
};
