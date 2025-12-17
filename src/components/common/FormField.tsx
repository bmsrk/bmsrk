import React from 'react';

interface FormFieldProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  isLink?: boolean;
  href?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, icon, isLink, href, className = "" }) => {
  return (
    <div className={`mb-3 ${className} print:mb-2 group`}>
      <div className="flex items-center gap-1.5 mb-0.5">
        {icon && <span className="text-[#605e5c] w-3 h-3 opacity-70">{icon}</span>}
        <label className="text-[11px] font-normal text-[#605e5c] uppercase tracking-wide group-hover:text-[#0078d4] transition-colors">{label}</label>
      </div>
      <div className="min-h-[20px] pb-0.5 border-b border-transparent group-hover:border-[#e1dfdd] transition-colors">
        {isLink && href ? (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[13px] text-[#0078d4] hover:underline font-semibold block truncate"
          >
            {value}
          </a>
        ) : (
          <div className="text-[13px] text-[#201f1e] font-semibold block break-words leading-snug">
            {value}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;