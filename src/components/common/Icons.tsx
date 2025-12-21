
import React from 'react';

// Common Props
interface IconProps {
  className?: string;
}

// Fluent / Dynamics Icons
export const WaffleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M256 256h448v448H256V256zm576 0h448v448H832V256zm576 0h448v448h-448V256zM256 832h448v448H256V832zm576 0h448v448H832V832zm576 0h448v448h-448V832zM256 1408h448v448H256v-448zm576 0h448v448H832v-448zm576 0h448v448h-448v-448z" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M0 256h2048v128H0V256zm0 640h2048v128H0V896zm0 640h2048v128H0v-128z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M1115 1024l914 915-90 90-915-914-915 914-90-90 914-915L19 109l90-90 915 914L1939 19l90 90-914 915z" />
  </svg>
);

export const SaveIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M1728 640l256 256v784q0 53-20 99t-55 82-81 55-100 20H256q-53 0-99-20t-82-55-55-81-20-100V256q0-53 20-99t55-82 81-55 100-20h1152v512h256V0H256q-53 0-99 20t-82 55-55 81-20 100v1408q0 53 20 99t55 82 81 55 100 20h1408q53 0 99-20t82-55 55-81 20-100V640h-256zM384 128h1024v384H384V128zm1280 1664H384V896h1280v896zM640 1024h768v128H640v-128zm0 256h768v128H640v-128zm0 256h512v128H640v-128z" />
  </svg>
);

export const AddIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M2048 960v128h-960v960H960v-960H0V960h960V0h128v960h960z" />
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M1728 384v1408q0 53-20 99t-55 82-81 55-100 20H448q-53 0-99-20t-82-55-55-81-20-100V384H64v-128h512V128h768v128h512v128h-128zm-128 1408V384H320v1408q0 27 10 50t27 40 41 28 50 10h1024q27 0 50-10t40-27 28-41 10-50zM768 1536V640h128v896H768zm384 0V640h128v896h-128z" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M1664 1024v640H384V640h512V512H256v1280h1536V1024h-128zm-512-384L971 821l90 90 283-283v896h128V628l283 283 90-90-437-437-256-256-256 256z" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M1792 1408v384q0 53-20 99t-55 82-81 55-100 20H384q-53 0-99-20t-82-55-55-81-20-100v-384h128v384q0 27 10 50t27 40 41 28 50 10h1024q27 0 50-10t40-27 28-41 10-50v-384h128zm-896-736V0h256v672l283-283 90 90-437 437-437-437 90-90 283 283z" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M2048 512v1024H0V512h2048zm-128 128H128v896h1792V640zm-896 507L221 640h1606l-803 507z" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M1024 162l896 896v862h-640v-512h-512v512H128v-862L1024 162zm768 949l-768-768-768 768v607h384v-512h768v512h384v-607z" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M1536 1536v384H512v-384q0-53 20-99t55-82 81-55 100-20h512q53 0 99 20t82 55 55 81 20 100zm-128 0q0-27-10-50t-27-40-41-28-50-10H768q-27 0-50 10t-40 27-28 41-10 50v256h896v-256zM1024 1280q-79 0-149-30t-122-82-83-122-30-150q0-79 30-149t82-122 122-83 150-30q79 0 149 30t122 82 83 122 30 150q0 79-30 149t-82 122-122 83-150 30zm0-768q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20z" />
  </svg>
);

// Sparkle/Magic Wand icon to indicate intelligent search capabilities
export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M1024 0l85 597 597 85-597 85-85 597-85-597L342 682l597-85L1024 0zm768 1280l64 448 448 64-448 64-64 448-64-448-448-64 448-64 64-448zM256 1792l43 299 298 43-298 43-43 299-42-299-299-43 299-43 42-299z" />
  </svg>
);

export const CheckMarkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
        <path d="M1837 557L768 1627 211 1069l90-90 467 466 979-978 90 90z" />
    </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M515 1955l930-931L515 93l-90 90 842 841-842 841 90 90z" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M1955 515l-931 930L93 515l90-90 841 842 841-842 90 90z" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" fill="currentColor" className={className}>
        <path d="M1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-103 245-160 207-208 160-245 103-272 37q-141 0-272-36t-245-103-207-160-160-208-103-245-37-272q0-141 36-272t103-245 160-207 208-160T752 37t272-37zm0 1920q123 0 237-32t214-90 182-141 140-181 91-214 32-238q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-123 0-237 32t-214 90-182 141-140 181-91 214-32 238q0 123 32 237t90 214 141 182 181 140 214 91 238 32zm128-1024h384v128h-512V640h128v512z" />
    </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const LinkedinIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const ServerIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);

export const ZapIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const CloudIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

export const CodeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const NetworkIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
    <path d="M12 12V8" />
  </svg>
);

export const ClipboardCheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const CopilotIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
  </svg>
);

export const CubeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const EducationIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const HelpIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" clipRule="evenodd" />
  </svg>
);

/**
 * ClippyIcon - A consistent Clippy paperclip icon that renders the same across all platforms
 * Inspired by the classic Microsoft Office Clippy assistant
 * @param size - Icon size: 'sm' (16px), 'md' (24px, default), 'lg' (32px), 'xl' (40px), '2xl' (48px), '3xl' (64px), '4xl' (80px)
 */
export const ClippyIcon: React.FC<IconProps & { size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' }> = ({ 
  className = "", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12',
    '3xl': 'w-16 h-16',
    '4xl': 'w-20 h-20',
  };
  
  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`} 
      viewBox="0 0 120 120" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Improved Clippy with better metallic look and clearer design */}
      <defs>
        {/* Enhanced metallic gradient */}
        <linearGradient id="clippy-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8B8B8" />
          <stop offset="25%" stopColor="#E0E0E0" />
          <stop offset="50%" stopColor="#F5F5F5" />
          <stop offset="75%" stopColor="#D0D0D0" />
          <stop offset="100%" stopColor="#A8A8A8" />
        </linearGradient>
        
        {/* Highlight shine */}
        <linearGradient id="clippy-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        
        {/* Shadow gradient */}
        <linearGradient id="clippy-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#808080" />
          <stop offset="100%" stopColor="#606060" />
        </linearGradient>

        {/* Drop shadow filter for depth */}
        <filter id="clippy-drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="2" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g filter="url(#clippy-drop-shadow)">
        {/* Outer paperclip curve - Thicker and more defined */}
        <path
          d="M 45 10 
             C 45 5, 52 2, 60 2 
             C 75 2, 85 10, 85 25 
             L 85 75 
             C 85 92, 72 105, 55 105 
             C 38 105, 25 92, 25 75 
             L 25 35 
             C 25 25, 35 18, 48 18 
             C 61 18, 70 25, 70 35 
             L 70 70 
             C 70 77, 64 83, 55 83 
             C 46 83, 40 77, 40 70 
             L 40 40"
          fill="none"
          stroke="url(#clippy-metal)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Inner shadow for depth */}
        <path
          d="M 45 10 
             C 45 5, 52 2, 60 2 
             C 75 2, 85 10, 85 25 
             L 85 75"
          fill="none"
          stroke="url(#clippy-shadow)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
        
        {/* Highlight shine on top edge */}
        <path
          d="M 47 12 
             C 47 7, 53 4, 60 4 
             C 73 4, 82 11, 82 25 
             L 82 60"
          fill="none"
          stroke="url(#clippy-highlight)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      
      {/* Eyes - Larger and more expressive */}
      <g>
        <ellipse cx="50" cy="48" rx="5.5" ry="7" fill="#2C2C2C" />
        <ellipse cx="65" cy="48" rx="5.5" ry="7" fill="#2C2C2C" />
        
        {/* Eye highlights for sparkle */}
        <ellipse cx="51.5" cy="45" rx="2.5" ry="3" fill="#FFFFFF" />
        <ellipse cx="66.5" cy="45" rx="2.5" ry="3" fill="#FFFFFF" />
        <circle cx="52" cy="50" r="1" fill="#FFFFFF" opacity="0.6" />
        <circle cx="67" cy="50" r="1" fill="#FFFFFF" opacity="0.6" />
      </g>
      
      {/* Happy eyebrows - More prominent */}
      <g stroke="#404040" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M 42 38 Q 50 34, 56 37" />
        <path d="M 60 37 Q 65 34, 73 38" />
      </g>
      
      {/* Subtle smile - Making Clippy friendlier */}
      <path 
        d="M 52 58 Q 57.5 62, 63 58" 
        fill="none" 
        stroke="#404040" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
};

