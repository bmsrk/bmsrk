
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
 * ClippyIcon - An animated Clippy paperclip icon
 * Inspired by the classic Microsoft Office Clippy assistant with smooth animations
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
      viewBox="0 0 499 832" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          @keyframes gentleBob {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          @keyframes blink {
            0%, 100% { 
              transform: scaleY(1);
            }
            49%, 51% { 
              transform: scaleY(0.05);
            }
          }
          
          @keyframes subtleEyeMove {
            0%, 40%, 100% { transform: translate(0, 0); }
            20% { transform: translate(-2px, -1px); }
          }
          
          @keyframes shadowBreathe {
            0%, 100% { opacity: 0.25; transform: scale(1) translateY(0); }
            50% { opacity: 0.35; transform: scale(1.1) translateY(3px); }
          }
          
          #clippy-container {
            animation: gentleBob 3.5s ease-in-out infinite;
          }
          
          .eye-white {
            animation: blink 6s ease-in-out infinite;
            transform-origin: center;
          }
          
          .pupil {
            animation: subtleEyeMove 7s ease-in-out infinite;
          }
          
          #ground-shadow {
            animation: shadowBreathe 3.5s ease-in-out infinite;
          }
        `}
      </style>
      <defs>
        <radialGradient id="shadowGrad" cx="50%" cy="50%">
          <stop offset="0%" style={{ stopColor: "#000000", stopOpacity: 0.4 }} />
          <stop offset="50%" style={{ stopColor: "#000000", stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: "#000000", stopOpacity: 0 }} />
        </radialGradient>
        
        <filter id="bodyShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="12"/>
          <feOffset dx="5" dy="18" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="filter0_d_2_45" x="-1.43051e-05" y="1.90735e-06" width="498.648" height="831.106" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="9.9115" dy="24.7788"/>
          <feGaussianBlur stdDeviation="24.7788"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_45"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_45" result="shape"/>
        </filter>
        <filter id="filter1_ii_2_45" x="73.4382" y="16.9375" width="369.662" height="755.515" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="3.92065" dy="-7.8413"/>
          <feGaussianBlur stdDeviation="19.6033"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.075 0 0 0 0 0.1025 0 0 0 0 0.2 0 0 0 0.65 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_45"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-5.88098" dy="19.6033"/>
          <feGaussianBlur stdDeviation="7.8413"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"/>
          <feBlend mode="normal" in2="effect1_innerShadow_2_45" result="effect2_innerShadow_2_45"/>
        </filter>
        <filter id="filter3_ii_2_45" x="99.6641" y="60.0574" width="301.71" height="154.415" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="-7.8413"/>
          <feGaussianBlur stdDeviation="19.6033"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_45"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-3.92065" dy="11.762"/>
          <feGaussianBlur stdDeviation="9.80163"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="effect1_innerShadow_2_45" result="effect2_innerShadow_2_45"/>
        </filter>
        <filter id="filter5_ii_2_45" x="0.43948" y="140.725" width="394.866" height="224.597" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="-7.8413"/>
          <feGaussianBlur stdDeviation="9.80163"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_45"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-39.2065" dy="3.92065"/>
          <feGaussianBlur stdDeviation="19.6033"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="effect1_innerShadow_2_45" result="effect2_innerShadow_2_45"/>
        </filter>
        <filter id="filter6_d_2_45" x="57.3823" y="163.876" width="322.987" height="198.833" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="7.8413"/>
          <feGaussianBlur stdDeviation="9.80163"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_45"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_45" result="shape"/>
        </filter>
      </defs>

      <ellipse id="ground-shadow" cx="249" cy="800" rx="160" ry="28" fill="url(#shadowGrad)"/>

      <g id="clippy-container" filter="url(#bodyShadow)">
        <g filter="url(#filter0_d_2_45)">
          <g filter="url(#filter1_ii_2_45)" id="clippy-body">
            <path fillRule="evenodd" clipRule="evenodd" d="M204.784 38.5584C232.42 23.3817 263.473 20.2054 295.643 31.7146C325.641 42.4464 345.603 59.6103 356.088 82.9437C366.198 105.443 366.231 130.976 362.507 156.204C358.77 181.519 350.822 209.025 342.728 236.388C342.16 238.31 341.59 240.234 341.019 242.159C333.336 268.088 325.604 294.181 320.247 320.341C308.183 379.24 314.978 430.685 320.657 473.676C321.619 480.964 322.55 488.009 323.351 494.806C325.949 516.849 327.735 539.867 320.717 558.135C316.886 568.107 310.459 576.766 300.761 583.099C291.384 589.223 280.078 592.44 267.468 593.742C242.952 596.273 223.661 585.774 209.954 569.328C196.896 553.659 188.623 532.468 183.298 510.985C172.594 467.801 172.064 416.138 175.571 382.787C176.649 372.533 185.836 365.094 196.09 366.172C206.345 367.25 213.784 376.437 212.706 386.691C209.522 416.973 210.144 464.094 219.541 502.001C224.266 521.064 230.782 535.996 238.638 545.422C245.845 554.07 253.594 557.636 263.633 556.6C272.493 555.685 277.498 553.695 280.344 551.836C282.869 550.187 284.576 548.089 285.861 544.744C289.075 536.379 289.02 522.524 286.268 499.177C285.542 493.015 284.661 486.415 283.725 479.409C277.996 436.51 270.237 378.414 283.666 312.848C289.362 285.039 297.537 257.463 305.133 231.839C305.733 229.812 306.33 227.798 306.923 225.796C315.137 198.025 322.279 173.028 325.568 150.751C328.869 128.385 327.865 111.237 322.029 98.2476C316.567 86.0925 305.675 74.9608 283.065 66.8719C261.093 59.0113 241.154 61.1847 222.758 71.2875C203.754 81.7234 185.397 101.243 169.295 129.568C137.07 186.258 116.659 273.416 116.659 373.07C116.659 470.802 134.914 563.511 166.904 628.629C199.266 694.503 241.839 725.916 289.659 718.231C315.424 714.091 332.347 705.062 343.769 693.777C355.271 682.413 362.593 667.376 366.71 648.892C375.185 610.843 369.237 563.047 362.8 515.263C349.93 419.728 382.425 363.903 407.782 340.275C415.325 333.245 427.139 333.662 434.168 341.206C441.198 348.749 440.781 360.563 433.237 367.592C417.52 382.237 388.405 425.65 399.805 510.278C406.007 556.31 413.361 611.197 403.157 657.01C397.934 680.457 387.922 702.644 370.013 720.339C352.025 738.112 327.461 749.975 295.583 755.098C222.984 766.764 168.24 716.03 133.391 645.094C98.1705 573.402 79.3192 474.639 79.3192 373.07C79.3192 269.224 100.448 175.124 136.834 111.115C155.038 79.0916 177.755 53.4019 204.784 38.5584Z" fill="#A2A1A7" stroke="#000000" strokeWidth="2" strokeLinejoin="round"/>
          </g>
          <g filter="url(#filter3_ii_2_45)">
            <g className="eyebrow">
              <path fillRule="evenodd" clipRule="evenodd" d="M164.556 68.0796C180.238 68.8804 196.206 72.3434 208.551 78.2076C218.796 83.0741 223.156 95.3245 218.29 105.57C213.423 115.815 201.173 120.175 190.928 115.308C184.603 112.304 174.2 109.699 162.461 109.1C150.709 108.5 139.858 110.025 132.216 113.3C121.791 117.768 109.718 112.939 105.25 102.514C100.783 92.0884 105.612 80.0154 116.037 75.5476C131.266 69.021 148.886 67.2795 164.556 68.0796ZM289.821 146.233C289.821 134.891 299.016 125.696 310.358 125.696C325.547 125.696 342.632 130.954 357.374 138.291C372.183 145.663 387.302 156.462 397.311 169.912C404.083 179.011 402.196 191.876 393.097 198.648C383.998 205.419 371.132 203.532 364.361 194.433C359.434 187.813 350.283 180.642 339.071 175.062C327.792 169.447 317.106 166.77 310.358 166.77C299.016 166.77 289.821 157.575 289.821 146.233Z" fill="#49383E" stroke="#000000" strokeWidth="1.5"/>
            </g>
          </g>
          <g filter="url(#filter5_ii_2_45)">
            <path className="eye-white" d="M395.305 280.189C395.305 325.042 358.945 361.402 314.092 361.402C269.239 361.402 232.878 325.042 232.878 280.189C232.878 235.336 269.239 198.975 314.092 198.975C358.945 198.975 395.305 235.336 395.305 280.189Z" fill="#E3E3E3" stroke="#000000" strokeWidth="2"/>
            <path className="eye-white" d="M202.073 229.78C202.073 274.633 165.712 310.994 120.86 310.994C76.0065 310.994 39.646 274.633 39.646 229.78C39.646 184.927 76.0065 148.567 120.86 148.567C165.712 148.567 202.073 184.927 202.073 229.78Z" fill="#E3E3E3" stroke="#000000" strokeWidth="2"/>
          </g>
          <g filter="url(#filter6_d_2_45)">
            <g id="leftPupil" className="pupil">
              <circle cx="132" cy="245" r="28" fill="#3D2A2C" stroke="#000000" strokeWidth="1.5"/>
            </g>
            <g id="rightPupil" className="pupil">
              <circle cx="305" cy="295" r="28" fill="#3D2A2C" stroke="#000000" strokeWidth="1.5"/>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

