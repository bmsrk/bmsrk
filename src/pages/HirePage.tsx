import React from 'react';
import HireMe from '../components/features/HireMe';

const HirePage: React.FC = () => {
  return (
    <>
      <div className="mb-6 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#201f1e]">Professional Services</h2>
        <p className="text-sm text-gray-500">Contract rates and engagement models</p>
      </div>
      <HireMe />
    </>
  );
};

export default HirePage;
