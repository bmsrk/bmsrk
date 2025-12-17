import React from 'react';

interface SectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => {
  return (
    <section className={`mb-6 break-inside-avoid ${className}`}>
      <h2 className="text-[13px] font-bold text-[#0078d4] uppercase tracking-wide mb-3 border-b border-[#edebe9] pb-1 flex justify-between items-center">
        <span>{title}</span>
      </h2>
      <div className="text-[#323130]">
        {children}
      </div>
    </section>
  );
};

export default Section;