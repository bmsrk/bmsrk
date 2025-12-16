import React from 'react';
import { ContactInfo } from '../types';
import { MailIcon, MapPinIcon, LinkedinIcon, GlobeIcon, PhoneIcon } from './Icons';

interface ResumeHeaderProps {
  name: string;
  title: string;
  contact: ContactInfo;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ name, title, contact }) => {
  return (
    <header className="border-b-2 border-slate-800 pb-8 mb-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide text-slate-900 mb-3">
        {name}
      </h1>
      <p className="text-xl md:text-2xl text-slate-600 font-light mb-6 tracking-wider uppercase">
        {title}
      </p>
      
      <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-sm text-slate-700">
        {contact.location && (
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="w-4 h-4" />
            <span>{contact.location}</span>
          </div>
        )}
        {contact.email && (
          <div className="flex items-center gap-1.5">
            <MailIcon className="w-4 h-4" />
            <a href={`mailto:${contact.email}`} className="hover:text-blue-700 transition-colors">
              {contact.email}
            </a>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center gap-1.5">
            <PhoneIcon className="w-4 h-4" />
            <span>{contact.phone}</span>
          </div>
        )}
        {contact.linkedin && (
          <div className="flex items-center gap-1.5">
            <LinkedinIcon className="w-4 h-4" />
            <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">
              {contact.linkedin}
            </a>
          </div>
        )}
        {contact.portfolio && (
          <div className="flex items-center gap-1.5">
            <GlobeIcon className="w-4 h-4" />
            <a href={`https://${contact.portfolio}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">
              {contact.portfolio}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default ResumeHeader;