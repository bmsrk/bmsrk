import React from 'react';
import Section from './Section';
import { ServerIcon, CodeIcon, CubeIcon, CloudIcon } from './Icons';

const SolutionDocs: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="mb-6 p-4 bg-[#eff6fc] border border-[#c7e0f4] rounded-sm text-sm text-[#333]">
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

            <Section title="1. System Architecture">
                <div className="bg-white p-6 border border-[#edebe9] rounded-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-sm font-bold text-[#201f1e] mb-3 flex items-center gap-2">
                                <CodeIcon className="w-4 h-4 text-purple-600" />
                                Frontend Stack
                            </h4>
                            <ul className="list-disc ml-5 space-y-2 text-sm text-[#323130]">
                                <li><strong>Core Framework:</strong> React 18+ (Functional Components & Hooks)</li>
                                <li><strong>Build Tooling:</strong> ES Modules via standard index import</li>
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
            </Section>

            <Section title="2. UI/UX Design Philosophy">
                <div className="space-y-4">
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
            </Section>

            <Section title="3. Component Library">
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
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="4. Future Roadmap">
                <div className="bg-[#fff4ce] border border-[#fde7e9] p-4 rounded-sm text-sm text-[#323130]">
                    <h4 className="font-bold mb-2">Planned Enhancements</h4>
                    <ul className="list-disc ml-5 space-y-1">
                        <li>Integration with live Dataverse environment via Azure Functions proxy.</li>
                        <li>Implementation of dark mode theme switching.</li>
                        <li>Export to Word capability using Power Automate flow logic simulation.</li>
                    </ul>
                </div>
            </Section>
        </div>
    );
};

export default SolutionDocs;