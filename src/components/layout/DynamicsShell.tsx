import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ResumeData } from '../../types';
import {
  WaffleIcon,
  MenuIcon,
  CloseIcon,
  HomeIcon,
  SearchIcon,
  SaveIcon,
  AddIcon,
  MailIcon,
  DownloadIcon,
  ChevronDownIcon,
  UserIcon,
  ShareIcon,
  DeleteIcon,
  CheckMarkIcon,
  ClockIcon,
  CodeIcon,
  BookIcon,
  EducationIcon,
  RocketIcon,
  ServerIcon,
  BriefcaseIcon,
  HelpIcon,
} from '../common/Icons';
import Clippy from '../features/Clippy';
import useKonamiCode from '../features/KonamiCode';
import AchievementNotification, { ACHIEVEMENTS, Achievement } from '../features/Achievements';

interface DynamicsShellProps {
  children: React.ReactNode;
  onPrint: () => void;
  title: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  data?: ResumeData;
  clippySkill?: string;
  showClippy?: boolean;
  onClippyClose?: () => void;
  onProfileClick?: () => void;
  onGeneratePDF?: (fn: () => void) => void;
}

interface SearchResult {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  tab: string;
  icon?: React.ReactNode;
}

const DynamicsShell: React.FC<DynamicsShellProps> = ({ 
  children, 
  onPrint, 
  title, 
  activeTab, 
  onTabChange, 
  data,
  clippySkill,
  showClippy = false,
  onClippyClose,
  onProfileClick,
  onGeneratePDF
}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Easter Egg State
  const [_achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set());
  const [tabVisitTimes, setTabVisitTimes] = useState<number[]>([]);

  // Profile Image Logic
  // Priority: 1. Local 'profile.jpg' (User provided) -> 2. GitHub Avatar -> 3. Initials
  // Note: Place 'profile.jpg' in the public/root folder.
  const localProfileImage = "./profile.jpg";
  const fallbackProfileImage = "https://github.com/bmsrk.png";

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Achievement System
  const unlockAchievement = useCallback((achievementId: string) => {
    setAchievements(prev => {
      const alreadyUnlocked = prev.find(a => a.id === achievementId)?.unlocked;
      if (alreadyUnlocked) return prev;
      
      const updated = prev.map(a => 
        a.id === achievementId ? { ...a, unlocked: true } : a
      );
      const achievement = updated.find(a => a.id === achievementId);
      if (achievement) {
        setCurrentAchievement(achievement);
        triggerToast(`Achievement Unlocked: ${achievement.title}`);
      }
      return updated;
    });
  }, []);

  // Konami Code Easter Egg
  useKonamiCode(() => {
    unlockAchievement('konami');
    triggerToast("🎮 Konami Code Activated! You're a legend!");
    
    // Add foil tint effect
    document.body.classList.add('foil-effect');
    
    // Create and play Mario star power-up music (10 seconds)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const duration = 10; // 10 seconds
    const startTime = audioContext.currentTime;
    
    // Create oscillators for the iconic Mario star theme melody
    const playNote = (frequency: number, startOffset: number, noteLength: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'square'; // 8-bit sound
      oscillator.frequency.value = frequency;
      
      gainNode.gain.setValueAtTime(0.15, startTime + startOffset);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + startOffset + noteLength);
      
      oscillator.start(startTime + startOffset);
      oscillator.stop(startTime + startOffset + noteLength);
    };
    
    // Mario star power-up theme notes (simplified version, looped)
    const starTheme = [
      { note: 587.33, time: 0, length: 0.15 },    // D5
      { note: 659.25, time: 0.15, length: 0.15 }, // E5
      { note: 783.99, time: 0.3, length: 0.15 },  // G5
      { note: 1046.5, time: 0.45, length: 0.15 }, // C6
      { note: 783.99, time: 0.6, length: 0.15 },  // G5
      { note: 1046.5, time: 0.75, length: 0.3 },  // C6
      { note: 987.77, time: 1.05, length: 0.15 }, // B5
      { note: 880.00, time: 1.2, length: 0.15 },  // A5
      { note: 783.99, time: 1.35, length: 0.15 }, // G5
      { note: 659.25, time: 1.5, length: 0.15 },  // E5
      { note: 783.99, time: 1.65, length: 0.3 },  // G5
    ];
    
    // Loop the theme for 10 seconds
    const themeLength = 1.95;
    const loops = Math.ceil(duration / themeLength);
    
    for (let i = 0; i < loops; i++) {
      const loopOffset = i * themeLength;
      if (loopOffset < duration) {
        starTheme.forEach(({ note, time, length }) => {
          if (loopOffset + time < duration) {
            playNote(note, loopOffset + time, Math.min(length, duration - loopOffset - time));
          }
        });
      }
    }
    
    // Remove effect after 10 seconds
    setTimeout(() => {
      document.body.classList.remove('foil-effect');
    }, 10000);
  });

  // Track tab visits for achievements
  useEffect(() => {
    const newVisited = new Set(visitedTabs);
    newVisited.add(activeTab);
    setVisitedTabs(newVisited);
    
    // Track visit time for speed run achievement
    const now = Date.now();
    setTabVisitTimes(prev => [...prev, now]);
    
    // Check if all main tabs visited
    const mainTabs = ['summary', 'projects', 'about', 'experience', 'skills', 'qualifications', 'help'];
    const allVisited = mainTabs.every(tab => newVisited.has(tab));
    if (allVisited) {
      unlockAchievement('explorer');
    }
    
    // Check speed run (5 tabs in 30 seconds)
    const recentVisits = tabVisitTimes.filter(time => now - time < 30000);
    if (recentVisits.length >= 5) {
      unlockAchievement('speedrun');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, unlockAchievement]);

  // Expose generatePDF function to parent
  useEffect(() => {
    if (onGeneratePDF && generatePDF) {
      onGeneratePDF(generatePDF);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handlePrintAction = () => {
    if (activeTab !== 'printable') {
        triggerToast("Preparing printable version...");
        onTabChange('printable');
        // Automatically trigger PDF generation after the tab changes
        setTimeout(() => {
          unlockAchievement('printer');
          generatePDF();
        }, 300); // Give time for the view to render
    } else {
        unlockAchievement('printer');
        generatePDF();
    }
  };

  const generatePDF = () => {
    setIsGeneratingPDF(true);
    triggerToast("Generating PDF...");
    
    // Wait a bit for the DOM to be ready
    setTimeout(() => {
      const element = document.getElementById('printable-resume');
      if (!element) {
        triggerToast("Error: Resume element not found");
        setIsGeneratingPDF(false);
        return;
      }

      // Check if html2pdf is available
      const html2pdfLib = (window as any).html2pdf;
      if (typeof html2pdfLib === 'undefined') {
        triggerToast("PDF library not loaded, using print dialog...");
        setIsGeneratingPDF(false);
        onPrint();
        return;
      }

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Bruno_Maciel_Servulo_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdfLib()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          setIsGeneratingPDF(false);
          triggerToast("PDF downloaded successfully!");
        })
        .catch((error: Error) => {
          console.error('PDF generation error:', error);
          setIsGeneratingPDF(false);
          triggerToast("PDF generation failed. Please try again.");
        });
    }, 100);
  };

  const handleEmail = () => {
    window.location.href = "mailto:bruno.m.servulo@gmail.com?subject=Dynamics 365 Opportunity";
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      unlockAchievement('sharer');
      triggerToast("Link copied to clipboard");
    });
  };

  const handleExportJson = () => {
    if (data) {
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(`
                <html>
                    <head><title>Resume Data JSON</title></head>
                    <body style="background-color: #1e1e1e; color: #d4d4d4; font-family: monospace; padding: 20px;">
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    </body>
                </html>
            `);
            newWindow.document.close();
        } else {
            triggerToast("Pop-up blocked. Allow pop-ups to view JSON.");
        }
    }
  };

  const handleProfileClickInternal = () => {
    unlockAchievement('clippy');
    if (onProfileClick) {
      onProfileClick();
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!data || !searchQuery || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const results: SearchResult[] = [];
    
    // Helper function for better matching (partial word matching)
    const matches = (text: string, searchTerm: string): boolean => {
      const lowerText = text.toLowerCase();
      // Check for exact match, starts with, or word boundary match
      return lowerText.includes(searchTerm) || 
             lowerText.split(/\s+/).some(word => word.startsWith(searchTerm));
    };

    // 1. Search Summary
    if (matches(data.summary, query)) {
      results.push({
        id: 'summary',
        category: 'General',
        title: 'Professional Summary',
        subtitle: 'Overview',
        tab: 'summary',
        icon: <HomeIcon className="w-4 h-4 text-blue-600" />
      });
    }

    // 2. Search My Story (About Me)
    if (data.aboutMe?.some((p) => matches(p, query))) {
      results.push({
        id: 'about',
        category: 'General',
        title: 'My Story',
        subtitle: 'Biography',
        tab: 'about',
        icon: <BookIcon className="w-4 h-4 text-orange-600" />
      });
    }

    // 3. Search Projects (Brag Doc)
    if (data.projects) {
        data.projects.forEach((proj, idx) => {
            const matchesProject = matches(proj.title, query) || 
                                  matches(proj.description, query) ||
                                  matches(proj.role, query) ||
                                  (proj.customer && matches(proj.customer, query)) ||
                                  proj.technologies.some(t => matches(t, query)) ||
                                  proj.impact.some(i => matches(i, query));
            
            if (matchesProject) {
                results.push({
                    id: `proj-${idx}`,
                    category: 'Projects',
                    title: proj.title,
                    subtitle: 'Brag Doc',
                    tab: 'projects',
                    icon: <RocketIcon className="w-4 h-4 text-pink-600" />
                });
            }
        });
    }

    // 4. Search Experience
    data.experience.forEach((job, idx) => {
      const matchesJob = matches(job.title, query) || 
                        matches(job.company, query) ||
                        job.responsibilities.some(r => matches(r, query)) ||
                        (job.intro && matches(job.intro, query)) ||
                        (job.location && matches(job.location, query));
      
      if (matchesJob) {
        results.push({
          id: `exp-${idx}`,
          category: 'Experience',
          title: job.title,
          subtitle: job.company,
          tab: 'experience',
          icon: <ClockIcon className="w-4 h-4 text-green-600" />
        });
      }
    });

    // 5. Search Skills
    data.skills.forEach((cat, cIdx) => {
      cat.skills.forEach((skill, sIdx) => {
        if (matches(skill, query)) {
          results.push({
            id: `skill-${cIdx}-${sIdx}`,
            category: 'Skills',
            title: skill,
            subtitle: cat.category,
            tab: 'skills',
            icon: <CodeIcon className="w-4 h-4 text-purple-600" />
          });
        }
      });
    });

    // 6. Search Achievements
    data.achievements.forEach((ach, idx) => {
        if (matches(ach.title, query) || matches(ach.description, query)) {
            results.push({
                id: `ach-${idx}`,
                category: 'Achievements',
                title: ach.title,
                tab: 'summary', // Achievements are on the summary tab
                icon: <CheckMarkIcon className="w-4 h-4 text-yellow-600" />
            });
        }
    });

    // 7. Search Certifications
    data.certifications.forEach((cert, idx) => {
        if (matches(cert, query)) {
            results.push({
                id: `cert-${idx}`,
                category: 'Qualifications',
                title: cert,
                subtitle: 'Certification',
                tab: 'qualifications',
                icon: <EducationIcon className="w-4 h-4 text-red-600" />
            });
        }
    });

    // 8. Search Education
    data.education.forEach((edu, idx) => {
        if (matches(edu.institution, query) || matches(edu.degree, query)) {
            results.push({
                id: `edu-${idx}`,
                category: 'Qualifications',
                title: edu.institution,
                subtitle: edu.degree,
                tab: 'qualifications',
                icon: <EducationIcon className="w-4 h-4 text-red-600" />
            });
        }
    });

    return results;
  }, [data, searchQuery]);

  const handleSearchResultClick = (tab: string) => {
      onTabChange(tab);
      setIsSearchOpen(false);
      setSearchQuery("");
      unlockAchievement('searcher');
  };

  const navItems = [
    { id: 'summary', label: 'Summary', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects (Brag Doc)', icon: <RocketIcon className="w-4 h-4" /> },
    { id: 'hire', label: 'Hire Me', icon: <BriefcaseIcon className="w-4 h-4" /> },
    { id: 'about', label: 'My Story', icon: <BookIcon className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <ClockIcon className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <CodeIcon className="w-4 h-4" /> },
    { id: 'qualifications', label: 'Qualifications', icon: <EducationIcon className="w-4 h-4" /> },
    { id: 'help', label: 'Help', icon: <HelpIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#f3f2f1] relative overflow-hidden text-[14px]">
      
      {/* 1. Universal Header (Office 365 / Dynamics Style) */}
      <div className="h-[48px] bg-[#000000] text-white flex items-center justify-between px-2 flex-shrink-0 no-print z-50">
        <div className="flex items-center">
            {/* Mobile Menu Button - Shown only on mobile */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-[48px] h-[48px] flex items-center justify-center hover:bg-[#333333] transition-colors lg:hidden"
            >
                {isMobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
            
            {/* Waffle Button - Hidden on mobile */}
            <button className="w-[48px] h-[48px] hidden lg:flex items-center justify-center hover:bg-[#333333] transition-colors">
                <WaffleIcon className="w-5 h-5" />
            </button>
            <div className="px-2 font-semibold text-[16px] hidden sm:block">Dynamics 365</div>
            <div className="mx-2 text-gray-400 hidden sm:block">|</div>
            <div className="px-2 text-[14px] hidden md:block">Resume Entity</div>
        </div>
        
        {/* Center Search - Dynamics Unified Interface style */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block z-50" ref={searchRef}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-4 h-4 text-[#0078d4]" />
                </div>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-full bg-[#f3f2f1] text-black border-none rounded-md py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0078d4] focus:bg-white transition-all placeholder-gray-500" 
                    placeholder="Search data..." 
                />
                
                {/* Search Results Dropdown */}
                {isSearchOpen && searchQuery.length > 1 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-fluent-hover rounded-sm border border-[#edebe9] max-h-[400px] overflow-y-auto animate-fade-in">
                        {searchResults.length > 0 ? (
                            <div>
                                <div className="px-3 py-2 text-xs text-gray-500 bg-[#f3f2f1] border-b border-[#edebe9]">
                                    Top Results for &ldquo;{searchQuery}&rdquo;
                                </div>
                                {searchResults.map((result) => (
                                    <button
                                        key={result.id}
                                        onClick={() => handleSearchResultClick(result.tab)}
                                        className="w-full text-left px-3 py-2 hover:bg-[#eff6fc] border-b border-[#f3f2f1] last:border-0 flex items-center gap-3 transition-colors group"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#f3f2f1] rounded-full group-hover:bg-white transition-colors">
                                            {result.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-[#323130] truncate group-hover:text-[#0078d4]">
                                                {result.title}
                                            </div>
                                            {result.subtitle && (
                                                <div className="text-xs text-[#605e5c] truncate">
                                                    {result.subtitle}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-[10px] uppercase tracking-wider font-semibold text-[#a19f9d] bg-[#f3f2f1] px-1.5 py-0.5 rounded">
                                            {result.category}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                No records found matching &ldquo;{searchQuery}&rdquo;
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        <div className="flex items-center gap-1">
             <button 
                onClick={() => onTabChange('help')}
                className="w-[48px] h-[48px] flex items-center justify-center hover:bg-[#333333] transition-colors"
                title="Help & Tips"
             >
                <HelpIcon className="w-5 h-5" />
             </button>
             <button 
                onClick={handleProfileClickInternal}
                className="w-[48px] h-[48px] flex items-center justify-center hover:bg-[#333333] transition-colors"
                title="Click for a surprise! 📎"
             >
                 {/* Navigation User Icon: Uses Smart Crop */}
                 <img 
                    src={localProfileImage}
                    className="w-8 h-8 rounded-full border border-gray-600 bg-teal-600 object-cover object-[center_25%]"
                    alt="User"
                    onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.includes('profile.jpg')) {
                            target.src = fallbackProfileImage;
                        } else {
                            target.style.display = 'none';
                            target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                        }
                    }} 
                 />
                 <UserIcon className="w-8 h-8 p-1 bg-teal-600 rounded-full hidden fallback-icon" />
             </button>
        </div>
      </div>

      {/* 2. Command Bar (Ribbon) - Hidden on mobile */}
      <div className="h-[44px] bg-white border-b border-[#edebe9] hidden md:flex items-center px-2 shadow-sm flex-shrink-0 no-print z-40 overflow-x-auto whitespace-nowrap">
         <div className="flex items-center gap-1">
            <CommandButton icon={<AddIcon className="w-4 h-4 text-[#0078d4]" />} label="New" onClick={() => triggerToast("Create privileges required")} />
            <div className="h-5 w-px bg-gray-300 mx-1"></div>
            <CommandButton icon={<DeleteIcon className="w-4 h-4 text-gray-500" />} label="Delete" onClick={() => triggerToast("System Administrator role required")} />
            <div className="h-5 w-px bg-gray-300 mx-1"></div>
            <CommandButton icon={<SaveIcon className="w-4 h-4 text-[#0078d4]" />} label="Save" onClick={() => triggerToast("Changes saved to local session")} />
            <CommandButton icon={<CheckMarkIcon className="w-4 h-4 text-[#0078d4]" />} label="Mark Complete" onClick={() => triggerToast("Application marked as reviewed")} />
            <div className="h-5 w-px bg-gray-300 mx-1"></div>
            <CommandButton icon={<MailIcon className="w-4 h-4 text-gray-600" />} label="Email a Link" onClick={handleEmail} />
            <CommandButton icon={<ShareIcon className="w-4 h-4 text-gray-600" />} label="Share" onClick={handleShare} />
            <CommandButton icon={<CodeIcon className="w-4 h-4 text-gray-600" />} label="Export Data" onClick={handleExportJson} />
            <div className="h-5 w-px bg-gray-300 mx-1"></div>
            <CommandButton icon={<DownloadIcon className="w-4 h-4 text-[#0078d4]" />} label="Export to PDF" onClick={handlePrintAction} />
         </div>
      </div>

      {/* 3. Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* Left Navigation (Sitemap) - Responsive with mobile drawer */}
        <div className={`
          w-[260px] bg-[#f3f2f1] border-r border-[#edebe9] flex flex-col flex-shrink-0 no-print overflow-y-auto
          lg:relative lg:translate-x-0
          fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
           
           <div className="flex-1">
                {/* Area Switcher */}
                <div className="h-[48px] flex items-center px-4 hover:bg-[#edebe9] cursor-pointer mb-2">
                    <span className="font-semibold text-[14px]">My Work</span>
                    <ChevronDownIcon className="w-3 h-3 ml-auto text-gray-600" />
                </div>

                <div className="flex flex-col pb-4">
                    <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">General</div>
                    {navItems.map(item => (
                        <button 
                            key={item.id}
                            onClick={() => {
                                onTabChange(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-1.5 text-sm transition-colors ${activeTab === item.id ? 'bg-white font-semibold border-l-2 border-[#0078d4]' : 'hover:bg-[#edebe9] text-[#242424] border-l-2 border-transparent'}`}
                        >
                            <span className="text-gray-600">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}

                    <div className="px-4 py-1.5 mt-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Related</div>
                    
                    {/* Printable Version in Nav */}
                    <button 
                        onClick={() => {
                            onTabChange('printable');
                            setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-1.5 text-sm transition-colors ${activeTab === 'printable' ? 'bg-white font-semibold border-l-2 border-[#0078d4]' : 'hover:bg-[#edebe9] text-[#242424] border-l-2 border-transparent'}`}
                    >
                        <span className="text-gray-600"><DownloadIcon className="w-4 h-4" /></span>
                        Printable Version
                    </button>
                </div>
           </div>

           {/* Footer Text with Analytics Disclaimer */}
           <div className="p-4 text-xs text-gray-400 border-t border-[#edebe9] bg-[#f3f2f1] mt-auto space-y-2">
                <p className="text-center">Microsoft Dynamics 365 look-alike interface built with React &amp; Tailwind.</p>
                <p className="text-center text-[10px]">We use Google Analytics and Microsoft Clarity to understand how you use our website. By using our site, you agree that we and our analytics partners can collect and use this data.</p>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#faf9f8]">
           
           {/* Form Header */}
           <div className="px-3 sm:px-5 pt-4 pb-2 border-b border-[#edebe9] bg-white no-print">
               <div className="flex items-center text-xs text-gray-500 mb-1">
                   <span>Resume</span>
                   <span className="mx-2">&gt;</span>
                   <span className="hidden sm:inline">Bruno Maciel Servulo</span>
               </div>
               <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4">
                   <div className="flex items-center gap-3 sm:gap-4">
                        {/* Entity Image - Dynamics Style - Smart Crop */}
                        <div className="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] rounded-full shadow-sm border border-[#edebe9] overflow-hidden flex-shrink-0 bg-white flex items-center justify-center group relative">
                            <img 
                                src={localProfileImage} 
                                alt="Bruno Maciel Servulo"
                                title="Bruno Maciel Servulo"
                                className="w-full h-full object-cover object-[center_25%]" // Smart crop: 25% from top
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    // Robust check for local file failure
                                    if (target.src.includes('profile.jpg')) {
                                        target.src = fallbackProfileImage;
                                    } else {
                                        target.style.display = 'none';
                                        target.parentElement?.querySelector('.fallback-initials')?.classList.remove('hidden');
                                    }
                                }} 
                            />
                            <div className="fallback-initials hidden text-xl font-light text-white bg-teal-600 w-full h-full flex items-center justify-center">BS</div>
                        </div>

                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-[#242424] tracking-tight">{title}</h1>
                            <div className="text-xs sm:text-sm text-gray-500">Dynamics 365 Technical Specialist</div>
                        </div>
                   </div>

                   <div className="hidden lg:flex gap-8 mr-8">
                        <HeaderField label="Status" value="Active" />
                        <HeaderField label="Availability" value="Immediate" />
                        <HeaderField label="Location" value="Brazil" />
                        <HeaderField label="Owner" value="System" />
                   </div>
               </div>
           </div>

           {/* Scrollable Canvas - Updated padding to mimic Dynamics behavior better */}
           <div className="flex-1 overflow-y-auto p-1 sm:p-2 scroll-smooth relative" id="main-scroll">
                {/* Toast Notification */}
                {showToast && (
                    <div 
                      onClick={() => !isGeneratingPDF && setShowToast(false)}
                      className={`absolute top-3 right-3 sm:top-5 sm:right-5 bg-black text-white px-3 py-2 sm:px-4 rounded shadow-lg z-50 text-xs sm:text-sm animate-fade-in-down flex items-center gap-2 no-print ${isGeneratingPDF ? '' : 'cursor-pointer hover:bg-gray-800'} transition-colors`}
                      role="button"
                      aria-label={isGeneratingPDF ? "Generating PDF" : "Click to dismiss"}
                    >
                        {isGeneratingPDF ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <CheckMarkIcon className="w-4 h-4 text-green-400" />
                        )}
                        {toastMessage}
                    </div>
                )}

                {/* Resume Content Wrapper - Responsive card styling */}
                <div className={`max-w-[1200px] mx-auto min-h-[500px] bg-white lg:border border-[#edebe9] lg:shadow-sm rounded-sm p-3 sm:p-4 lg:p-6 print:w-full print:max-w-none print:border-none print:shadow-none print:p-0 mb-4`}>
                    {children}
                </div>
           </div>
        </div>
      </div>

      {/* Easter Eggs */}
      {showClippy && (
        <Clippy 
          onClose={onClippyClose || (() => {})} 
          skill={clippySkill}
          projects={data?.projects || []}
        />
      )}
      {currentAchievement && (
        <AchievementNotification 
          achievement={currentAchievement} 
          onDismiss={() => setCurrentAchievement(null)} 
        />
      )}
    </div>
  );
};

const CommandButton: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
    <button 
        onClick={onClick}
        className="flex flex-col items-center justify-center px-2 py-1 min-w-[60px] hover:bg-[#f3f2f1] rounded-sm transition-colors group gap-0.5"
    >
        <div className="group-hover:scale-105 transition-transform">{icon}</div>
        <span className="text-[11px] font-medium text-[#242424]">{label}</span>
    </button>
);

const HeaderField: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-[11px] text-gray-500">{label}</span>
        <span className="text-[14px] font-semibold text-[#333]">{value}</span>
    </div>
);

export default DynamicsShell;