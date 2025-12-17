import React from 'react';
import { DownloadIcon } from '../common/Icons';

const PrintControl: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="print:hidden fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Print Resume"
    >
      <DownloadIcon className="w-5 h-5" />
      <span>Save as PDF</span>
    </button>
  );
};

export default PrintControl;