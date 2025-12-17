import { useState, useEffect } from 'react';

export const useTabNavigation = (initialTab: string = 'summary') => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab with URL hash if needed
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveTab(hash);
    }
  }, []);

  useEffect(() => {
    // Update URL hash when tab changes
    if (activeTab !== 'summary') {
      window.history.replaceState(null, '', `#${activeTab}`);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [activeTab]);

  return { activeTab, setActiveTab };
};
