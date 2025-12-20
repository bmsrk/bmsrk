import React from 'react';
import { ResumeData } from '../../../types';

interface PrintableResumeProps {
  data: ResumeData;
  onDownloadPDF?: () => void;
}

const PrintableResume: React.FC<PrintableResumeProps> = ({ data, onDownloadPDF }) => {
  const { 
    name, 
    title, 
    contact, 
    summary, 
    skills, 
    experience, 
    education, 
    certifications, 
    languages 
  } = data;

  return (
    <div className="bg-white text-black">
      {/* Download Button - Not included in PDF */}
      {onDownloadPDF && (
        <div className="no-print max-w-[210mm] mx-auto mb-6 flex justify-center">
          <button
            onClick={onDownloadPDF}
            className="bg-[#0078d4] hover:bg-[#005a9e] text-white font-semibold py-2 px-6 rounded transition-colors inline-flex items-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>
      )}

      {/* Main Resume Content */}
      <div id="printable-resume" className="p-8 max-w-[210mm] mx-auto min-h-screen">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase mb-1">{name}</h1>
          <p className="text-xl font-medium text-gray-700 mb-3">{title}</p>
          <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
              {contact.location && <span>Location: {contact.location}</span>}
              {contact.email && <span>Email: {contact.email}</span>}
              {contact.phone && <span>Phone: {contact.phone}</span>}
              {contact.linkedin && <span>LinkedIn: {contact.linkedin}</span>}
              {contact.portfolio && <span>Portfolio: {contact.portfolio}</span>}
          </div>
        </div>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 pb-1">Professional Summary</h2>
        <p className="text-sm leading-relaxed text-gray-800 text-justify">
          {summary}
        </p>
      </section>

      {/* Skills (Compact for Print) */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 pb-1">Technical Skills</h2>
        <div className="text-sm">
            {skills.map((cat, i) => (
                <div key={i} className="mb-1">
                    <span className="font-bold mr-2">{cat.category}:</span>
                    <span className="text-gray-700">{cat.skills.join(", ")}</span>
                </div>
            ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-6 break-inside-avoid-page">
        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1">Professional Experience</h2>
        <div className="space-y-5">
            {experience.map((job, idx) => (
                <div key={idx} className="break-inside-avoid-page">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-base">{job.title}</h3>
                        <span className="text-xs font-semibold whitespace-nowrap">{job.date}</span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                         <span className="text-sm font-semibold italic text-gray-700">{job.company}</span>
                         <span className="text-xs text-gray-500">{job.location}</span>
                    </div>
                    {job.intro && (
                        <p className="text-xs italic text-gray-600 mb-2">{job.intro}</p>
                    )}
                    <ul className="list-disc ml-4 text-sm text-gray-800 space-y-1">
                        {job.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx}>{resp}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </section>

      {/* Education & Certs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 break-inside-avoid-page">
         <section className="break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 pb-1">Education</h2>
            {education.map((edu, idx) => (
                <div key={idx} className="mb-2 break-inside-avoid">
                    <h3 className="font-bold text-sm">{edu.institution}</h3>
                    <div className="text-sm">{edu.degree}</div>
                    <div className="text-xs text-gray-500">{edu.year}</div>
                </div>
            ))}
         </section>

         <section className="break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 pb-1">Certifications</h2>
            <ul className="list-disc ml-4 text-sm text-gray-800 space-y-1">
                {certifications.map((cert, idx) => (
                    <li key={idx}>{cert}</li>
                ))}
            </ul>
         </section>
      </div>

      {/* Languages */}
      <section className="mt-6 break-inside-avoid">
         <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 pb-1">Languages</h2>
         <div className="text-sm text-gray-800">
             {languages.join(" • ")}
         </div>
      </section>
      </div>
    </div>
  );
};

export default PrintableResume;