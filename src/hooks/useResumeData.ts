import { useState, useEffect } from 'react';
import { ResumeData } from '../types/types';

interface UseResumeDataReturn {
  data: ResumeData | null;
  loading: boolean;
  error: Error | null;
}

export const useResumeData = (): UseResumeDataReturn => {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetch('./resume_data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }
        return response.json();
      })
      .then((jsonData: ResumeData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error("Failed to load resume data", err);
        setError(err);
        setLoading(false);
      });
  }, []);
  
  return { data, loading, error };
};
