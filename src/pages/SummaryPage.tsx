import React from 'react';
import { ResumeData } from '../types/types';
import Section from '../components/common/Section';
import FormField from '../components/common/FormField';
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon, GlobeIcon } from '../components/common/Icons';

interface SummaryPageProps {
  data: ResumeData;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ data }) => {
  const { name, title, contact, summary, achievements } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - General Info (4/12) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white lg:border border-[#edebe9] lg:shadow-sm lg:p-4 rounded-sm">
          <Section title="General Information">
            <FormField label="Full Name" value={name} />
            <FormField label="Job Title" value={title} />
            <FormField label="Status" value="Active Candidate" />
            <FormField label="Availability" value="Immediate" />
            <FormField label="Preferred Location" value="Remote / Hybrid" />
          </Section>
          
          <div className="mt-6"></div>

          <Section title="Contact Details">
            <FormField label="Email" value={contact.email} isLink href={`mailto:${contact.email}`} icon={<MailIcon />} />
            <FormField label="Phone" value={contact.phone} icon={<PhoneIcon />} />
            <FormField label="Location" value={contact.location} icon={<MapPinIcon />} />
            <FormField label="LinkedIn" value={contact.linkedin.replace('linkedin.com/in/', '')} isLink href={`https://${contact.linkedin}`} icon={<LinkedinIcon />} />
            <FormField label="Portfolio" value={contact.portfolio} isLink href={`https://${contact.portfolio}`} icon={<GlobeIcon />} />
          </Section>
        </div>
      </div>

      {/* Middle Column - Summary & Achievements (8/12) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white lg:border border-[#edebe9] lg:shadow-sm lg:p-4 rounded-sm h-full">
          <Section title="Professional Summary">
            <div className="mb-6">
              <div className="text-[11px] font-normal text-[#605e5c] uppercase tracking-wide mb-1">
                About
              </div>
              <div className="text-[13px] text-[#201f1e] leading-relaxed whitespace-pre-wrap">
                {summary}
              </div>
            </div>
          </Section>

          <Section title="Key Achievements">
            <div className="border border-[#edebe9] rounded-sm overflow-hidden mt-2">
              <div className="bg-[#f3f2f1] px-3 py-2 border-b border-[#edebe9] text-[11px] font-bold text-[#605e5c] flex justify-between uppercase tracking-wide">
                <span>Topic</span>
                <span>Description</span>
              </div>
              {achievements.map((ach, i) => (
                <div key={i} className="p-3 border-b border-[#edebe9] last:border-0 hover:bg-[#eff6fc] transition-colors cursor-pointer group flex flex-col gap-1">
                  <span className="font-semibold text-[13px] text-[#0078d4] group-hover:underline">{ach.title}</span>
                  <p className="text-[12px] text-[#333] leading-snug">{ach.description}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
