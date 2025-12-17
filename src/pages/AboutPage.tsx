import React from 'react';
import Section from '../components/common/Section';

interface AboutPageProps {
  aboutMe: string[];
}

const AboutPage: React.FC<AboutPageProps> = ({ aboutMe }) => {
  return (
    <>
      <div className="mb-6 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#201f1e]">My Professional Story</h2>
        <p className="text-sm text-gray-500">A deeper dive into my journey, drive, and aspirations</p>
      </div>
      <div className="max-w-4xl mx-auto">
        <Section title="Biography">
          <div className="bg-white p-6 md:p-10 border border-[#edebe9] shadow-sm rounded-sm">
            {aboutMe && aboutMe.map((paragraph, idx) => (
              <p key={idx} className="text-[14px] leading-7 text-[#323130] mb-6 last:mb-0 text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
};

export default AboutPage;
