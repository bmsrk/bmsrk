import { useState, useEffect } from 'react';
import { ResumeData, ResumeApiResponse } from '../types';
import { transformApiResponse } from '../utils/dataTransformers';

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./resume_data.json');
        const data: ResumeApiResponse = await response.json();
        setResumeData(transformApiResponse(data));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load resume data'));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { resumeData, loading, error };
};
