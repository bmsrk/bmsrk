import React from 'react';
import { Education } from '../types/types';
import Section from '../components/common/Section';

interface QualificationsPageProps {
  education: Education[];
  certifications: string[];
  languages: string[];
}

const QualificationsPage: React.FC<QualificationsPageProps> = ({ education, certifications, languages }) => {
  return (
    <>
      <div className="mb-6 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#201f1e]">Qualifications & Credentials</h2>
        <p className="text-sm text-gray-500">Academic background and certified expertise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col: Education & Languages */}
        <div className="space-y-8">
          <Section title="Education">
            {education.map((edu, index) => (
              <div key={index} className="flex gap-4 p-4 bg-white border border-[#edebe9] rounded-sm hover:shadow-fluent transition-shadow">
                <div className="w-12 h-12 bg-[#f3f2f1] flex items-center justify-center rounded-sm text-[#0078d4]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.51 9L12 4.36 20.49 9 12 13.64 3.51 9zM12 16c-3.31 0-6-2.69-6-6v-1.5l6 3.27 6-3.27V10c0 3.31-2.69 6-6 6z"/></svg>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#201f1e]">{edu.institution}</h3>
                  <div className="text-[13px] text-[#323130] mt-1">{edu.degree}</div>
                  <div className="text-xs text-gray-500 mt-1 font-semibold">{edu.year}</div>
                </div>
              </div>
            ))}
          </Section>
          
          <Section title="Languages">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center justify-between text-sm p-3 bg-white border border-[#edebe9] rounded-sm">
                  <span className="font-medium text-[#201f1e]">{lang.split('(')[0]}</span>
                  <span className="text-[#0078d4] bg-[#eff6fc] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{lang.split('(')[1]?.replace(')', '') || 'Native'}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Right Col: Certifications */}
        <div>
          <Section title="Certifications">
            <div className="bg-white border border-[#edebe9] rounded-sm overflow-hidden">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border-b border-[#edebe9] last:border-0 hover:bg-[#f3f2f1] transition-colors">
                  <div className="mt-1 min-w-[18px] text-[#0078d4]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className="w-4 h-4">
                      <path d="M1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-103 245-160 207-208 160-245 103-272 37q-141 0-272-36t-245-103-207-160-160-208-103-245-37-272q0-141 36-272t103-245 160-207 208-160T752 37t272-37zm403 685l-595 595-291-291 90-90 201 201 505-505 90 90z" />
                    </svg>
                  </div>
                  <span className="text-[13px] text-[#333] leading-snug">{cert}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default QualificationsPage;
