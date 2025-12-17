import React from 'react';
import SolutionDocs from '../components/features/SolutionDocs';

const DocsPage: React.FC = () => {
  return (
    <>
      <div className="mb-6 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#201f1e]">System Architecture</h2>
        <p className="text-sm text-gray-500">Technical documentation of the solution</p>
      </div>
      <SolutionDocs />
    </>
  );
};

export default DocsPage;
