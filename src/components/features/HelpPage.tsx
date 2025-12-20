import React, { useState } from 'react';
import { Section } from '../common';
import { ACHIEVEMENTS } from './Achievements';
import {
  RocketIcon,
  CheckMarkIcon,
  ClockIcon,
  CodeIcon,
  DownloadIcon,
  SearchIcon,
  HelpIcon,
  BriefcaseIcon,
  ServerIcon,
  CubeIcon,
  CloudIcon,
} from '../common/Icons';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#edebe9] rounded-sm overflow-hidden bg-white hover:shadow-fluent transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 flex items-center justify-between hover:bg-[#f3f2f1] transition-colors"
      >
        <span className="font-semibold text-[#201f1e] text-[14px]">{question}</span>
        <svg
          className={`w-5 h-5 text-[#605e5c] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-[13px] text-[#323130] leading-relaxed border-t border-[#edebe9] bg-[#faf9f8]">
          {answer}
        </div>
      )}
    </div>
  );
};

const HelpPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0078d4] rounded-full mb-4">
          <HelpIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-light text-[#201f1e] mb-2">Help & Tips</h1>
        <p className="text-[14px] text-[#605e5c]">
          Discover hidden features, Easter eggs, and tips for the best experience
        </p>
      </div>

      {/* Easter Eggs & Secrets Section */}
      <Section title="🎮 Easter Eggs & Secrets">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-3xl">🎮</div>
              <div>
                <h3 className="font-bold text-[15px] text-[#201f1e] mb-2">Konami Code</h3>
                <p className="text-[13px] text-[#323130] mb-2">
                  Enter the classic Konami Code to activate rainbow mode!
                </p>
                <div className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded border border-purple-300 font-mono text-[12px]">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">↑</kbd>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">↑</kbd>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">↓</kbd>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">↓</kbd>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">←</kbd>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">→</kbd>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">←</kbd>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">→</kbd>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">B</kbd>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">A</kbd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📎</div>
              <div>
                <h3 className="font-bold text-[15px] text-[#201f1e] mb-2">Clippy the Assistant</h3>
                <p className="text-[13px] text-[#323130] mb-2">
                  Click on your profile picture in the top-right corner to summon Clippy, the nostalgic
                  office assistant! He&apos;ll share fun facts and tips about this resume.
                </p>
                <p className="text-[13px] text-[#323130]">
                  <strong>New:</strong> Click on any skill&apos;s project count badge in the Skills tab to have Clippy
                  explain the technology, show how many projects use it, and provide a link to learn more!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-3xl">🏆</div>
              <div>
                <h3 className="font-bold text-[15px] text-[#201f1e] mb-2">Achievement System</h3>
                <p className="text-[13px] text-[#323130]">
                  Unlock achievements by exploring different features! Notifications appear in the
                  top-right when you earn them. Can you unlock all 8 achievements?
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Achievements Gallery */}
      <Section title="🏆 Achievements Gallery">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={achievement.id}
              className={`border rounded-lg p-4 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-400 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-4xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[14px] text-[#201f1e]">{achievement.title}</h3>
                    {achievement.unlocked && (
                      <CheckMarkIcon className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-[12px] text-[#605e5c] mb-2">{achievement.description}</p>
                  {!achievement.unlocked && (
                    <div className="text-[11px] text-[#0078d4] font-semibold">
                      {achievement.id === 'explorer' && '💡 Visit all tabs in the navigation'}
                      {achievement.id === 'konami' && '💡 Try the Konami Code (see above)'}
                      {achievement.id === 'clippy' && '💡 Click your profile picture'}
                      {achievement.id === 'searcher' && '💡 Use the search bar to find content'}
                      {achievement.id === 'printer' && '💡 Export this resume to PDF'}
                      {achievement.id === 'sharer' && '💡 Click the Share button'}
                      {achievement.id === 'speedrun' && '💡 Visit 5 tabs in under 30 seconds'}
                      {achievement.id === 'completionist' && '💡 Unlock all other achievements'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Keyboard Shortcuts */}
      <Section title="⌨️ Keyboard Shortcuts">
        <div className="bg-white border border-[#edebe9] rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f3f2f1]">
              <tr>
                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#605e5c] uppercase tracking-wide">
                  Shortcut
                </th>
                <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#605e5c] uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#edebe9] hover:bg-[#f3f2f1] transition-colors">
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded font-mono text-[12px]">
                    /
                  </kbd>{' '}
                  or{' '}
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded font-mono text-[12px]">
                    Ctrl+K
                  </kbd>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#323130]">Open search</td>
              </tr>
              <tr className="border-t border-[#edebe9] hover:bg-[#f3f2f1] transition-colors">
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded font-mono text-[12px]">
                    Ctrl+P
                  </kbd>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#323130]">Print / Export to PDF</td>
              </tr>
              <tr className="border-t border-[#edebe9] hover:bg-[#f3f2f1] transition-colors">
                <td className="px-4 py-3">
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded font-mono text-[12px]">
                    ?
                  </kbd>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#323130]">Open Help page</td>
              </tr>
              <tr className="border-t border-[#edebe9] hover:bg-[#f3f2f1] transition-colors">
                <td className="px-4 py-3">
                  <span className="text-[12px] font-mono">Konami Code</span>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#323130]">Activate rainbow mode</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* PDF Export Tips */}
      <Section title="📄 PDF Export Tips">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <div className="flex items-start gap-4">
            <DownloadIcon className="w-8 h-8 text-[#0078d4] flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="font-bold text-[15px] text-[#201f1e]">
                Getting a Clean PDF Export
              </h3>
              <ul className="space-y-2 text-[13px] text-[#323130]">
                <li className="flex items-start gap-2">
                  <CheckMarkIcon className="w-4 h-4 text-[#0078d4] mt-0.5 flex-shrink-0" />
                  <span>
                    Use the <strong>&quot;Printable Version&quot;</strong> tab for an ATS-friendly,
                    clean resume format
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckMarkIcon className="w-4 h-4 text-[#0078d4] mt-0.5 flex-shrink-0" />
                  <span>
                    Click <strong>&quot;Export to PDF&quot;</strong> in the command bar or press{' '}
                    <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[11px] font-mono">
                      Ctrl+P
                    </kbd>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckMarkIcon className="w-4 h-4 text-[#0078d4] mt-0.5 flex-shrink-0" />
                  <span>
                    Clippy, achievements, and toasters are automatically hidden in print view
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckMarkIcon className="w-4 h-4 text-[#0078d4] mt-0.5 flex-shrink-0" />
                  <span>In the print dialog, ensure &quot;Background graphics&quot; is enabled</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* About This Site */}
      <Section title="🔧 About This Site">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-5">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-[15px] text-[#201f1e] mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['React 19', 'TypeScript', 'Tailwind CSS', 'Vite 6'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white border border-indigo-300 rounded-full text-[12px] font-semibold text-[#0078d4]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#201f1e] mb-2">
                Why Dynamics 365 Design?
              </h3>
              <p className="text-[13px] text-[#323130] leading-relaxed">
                This resume is styled to look like Microsoft Dynamics 365 to showcase familiarity
                with the platform while demonstrating React and TypeScript skills. It&apos;s a fun way to
                combine technical expertise with creative presentation!
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#201f1e] mb-2">Open Source</h3>
              <p className="text-[13px] text-[#323130] leading-relaxed mb-3">
                This project is open source! Check out the code, fork it, and build your own
                interactive resume.
              </p>
              <a
                href="https://github.com/bmsrk/bmsrk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0078d4] text-white rounded hover:bg-[#005a9e] transition-colors text-[13px] font-semibold"
              >
                <CodeIcon className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Solution Documentation Section */}
      <Section title="📋 Solution Documentation">
        <div className="space-y-6">
          <div className="p-4 bg-[#eff6fc] border border-[#c7e0f4] rounded-sm text-sm text-[#333]">
            <h3 className="font-bold text-[#0078d4] mb-2 flex items-center gap-2">
              <ServerIcon className="w-4 h-4" />
              Solution Technical Documentation
            </h3>
            <p className="mb-2">
              This document outlines the technical architecture, design choices, and data flow of the <strong>Dynamics 365 Interactive Resume</strong> application.
            </p>
            <p>
              The solution was engineered to demonstrate high-fidelity UI replication of the Microsoft Dynamics 365 Unified Interface (UCI) using modern web technologies.
            </p>
          </div>

          {/* System Architecture */}
          <div>
            <h3 className="font-bold text-[15px] text-[#201f1e] mb-3">System Architecture</h3>
            <div className="bg-white p-6 border border-[#edebe9] rounded-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-[#201f1e] mb-3 flex items-center gap-2">
                    <CodeIcon className="w-4 h-4 text-purple-600" />
                    Frontend Stack
                  </h4>
                  <ul className="list-disc ml-5 space-y-2 text-sm text-[#323130]">
                    <li><strong>Core Framework:</strong> React 19+ (Functional Components & Hooks)</li>
                    <li><strong>Build Tooling:</strong> Vite 6 with ES Modules</li>
                    <li><strong>Language:</strong> TypeScript (Strict Typing)</li>
                    <li><strong>Styling:</strong> Tailwind CSS (Utility-first framework configured with Microsoft Fluent UI color palette)</li>
                    <li><strong>Iconography:</strong> Custom SVG collection replicating Fluent UI System Icons</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#201f1e] mb-3 flex items-center gap-2">
                    <CloudIcon className="w-4 h-4 text-blue-600" />
                    Data & State Management
                  </h4>
                  <ul className="list-disc ml-5 space-y-2 text-sm text-[#323130]">
                    <li><strong>Data Source:</strong> Static JSON (<code>resume_data.json</code>) mimicking a Dataverse Web API response.</li>
                    <li><strong>State Strategy:</strong> React <code>useState</code> and <code>useMemo</code> for local UI state (tabs, search filtering, expansion).</li>
                    <li><strong>Search Logic:</strong> In-memory filtering across multiple entity arrays (Jobs, Skills, Projects).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* UI/UX Design Philosophy */}
          <div>
            <h3 className="font-bold text-[15px] text-[#201f1e] mb-3">UI/UX Design Philosophy</h3>
            <div className="bg-white p-4 border border-[#edebe9] rounded-sm flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <CubeIcon className="w-5 h-5 text-[#0078d4]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#201f1e] mb-1">Unified Interface Replication</h4>
                <p className="text-sm text-[#605e5c] leading-relaxed">
                  The layout strictly adheres to the Dynamics 365 UCI patterns:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-[#605e5c]">
                  <li>• <strong>Global Header:</strong> Office 365 Waffle, Environment selector, and User context.</li>
                  <li>• <strong>Command Bar (Ribbon):</strong> Contextual actions (New, Save, Email Link) with tooltips.</li>
                  <li>• <strong>Sitemap (Navigation):</strong> Collapsible left-hand navigation grouping entities by category.</li>
                  <li>• <strong>Form Header:</strong> High-level summary fields (Status, Owner) and entity image with smart cropping.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Component Library */}
          <div>
            <h3 className="font-bold text-[15px] text-[#201f1e] mb-3">Component Library</h3>
            <div className="overflow-x-auto border border-[#edebe9] rounded-sm">
              <table className="min-w-full text-sm text-left text-[#323130]">
                <thead className="bg-[#f3f2f1] text-[#605e5c] font-semibold border-b border-[#edebe9]">
                  <tr>
                    <th className="px-4 py-2">Component Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Key Props</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edebe9] bg-white">
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">DynamicsShell</td>
                    <td className="px-4 py-2">Main layout wrapper containing Header, Ribbon, Nav, and Content Area.</td>
                    <td className="px-4 py-2 font-mono text-xs">title, activeTab, data</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">HireMe</td>
                    <td className="px-4 py-2">Engagement models and rate card with "Inquire" call-to-actions.</td>
                    <td className="px-4 py-2 font-mono text-xs">-</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">PrintableResume</td>
                    <td className="px-4 py-2">ATS-optimized, print-ready linear layout. Automatically triggered on PDF export.</td>
                    <td className="px-4 py-2 font-mono text-xs">data</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">ProjectsGallery</td>
                    <td className="px-4 py-2">Card-based view with tag filtering logic for portfolio items.</td>
                    <td className="px-4 py-2 font-mono text-xs">projects[]</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">ExperienceItem</td>
                    <td className="px-4 py-2">Collapsible timeline card component with print-specific styles.</td>
                    <td className="px-4 py-2 font-mono text-xs">job, defaultExpanded</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">SkillsGrid</td>
                    <td className="px-4 py-2">Categorized grid view with pill-style badges and hover cards.</td>
                    <td className="px-4 py-2 font-mono text-xs">skills[]</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs">Clippy</td>
                    <td className="px-4 py-2">Interactive assistant that explains technologies and displays project counts.</td>
                    <td className="px-4 py-2 font-mono text-xs">skill, projects[], onClose</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section title="❓ Frequently Asked Questions">
        <div className="space-y-3">
          <FAQItem
            question="How do I export this resume to PDF?"
            answer="Click the 'Export to PDF' button in the command bar (ribbon) at the top, or press Ctrl+P. For the best results, use the 'Printable Version' tab which provides a clean, ATS-friendly format."
          />
          <FAQItem
            question="Can I use this template for my own resume?"
            answer="Absolutely! This project is open source and available on GitHub. Feel free to fork it, customize it, and make it your own. Just remember to update the content with your own information!"
          />
          <FAQItem
            question="What achievements can I unlock?"
            answer="There are 8 achievements total: Explorer (visit all tabs), Classic Gamer (Konami Code), Nostalgia Trip (meet Clippy), Detective (use search), Professional (export PDF), Networker (share link), Speed Reader (5 tabs in 30 seconds), and Completionist (unlock all achievements)."
          />
          <FAQItem
            question="Does this work on mobile devices?"
            answer="Yes! The interface is fully responsive and optimized for mobile, tablet, and desktop viewing. The navigation automatically adapts to smaller screens with a mobile-friendly menu."
          />
          <FAQItem
            question="How do I contact Bruno?"
            answer="You can reach out via email at bruno.m.servulo@gmail.com, connect on LinkedIn, or check out the contact details in the Summary tab. The 'Email a Link' button in the command bar will open your email client."
          />
          <FAQItem
            question="What is the Printable Version tab?"
            answer="The Printable Version tab provides a traditional, ATS-friendly resume format that's optimized for PDF export and applicant tracking systems. It includes all relevant information in a clean, linear layout."
          />
        </div>
      </Section>

      {/* Footer Fun Fact */}
      <div className="text-center mt-8 p-6 bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-200 rounded-lg">
        <div className="text-4xl mb-3">🎉</div>
        <p className="text-[14px] text-[#323130] font-semibold mb-2">
          Did you know?
        </p>
        <p className="text-[13px] text-[#605e5c]">
          This entire resume was built as a single-page React application with no backend!
          All data is loaded from a JSON file and rendered dynamically. Pretty cool, right?
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
