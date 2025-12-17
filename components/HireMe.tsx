import React from 'react';
import Section from './Section';
import { CodeIcon, ServerIcon, CheckMarkIcon, MailIcon } from './Icons';

const HireMe: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white border border-[#edebe9] rounded-sm p-4 shadow-sm mb-6 flex items-start gap-4">
                <div className="bg-[#eff6fc] p-3 rounded-full hidden md:block">
                    <MailIcon className="w-6 h-6 text-[#0078d4]" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-[#201f1e] mb-1">Engage My Services</h2>
                    <p className="text-sm text-[#605e5c] leading-relaxed">
                        I am available for contract-based projects, focusing on high-impact Dynamics 365 and Power Platform solutions. 
                        Below are my standard engagement models for technical delivery and architectural leadership.
                    </p>
                </div>
            </div>

            <Section title="Engagement Models">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Development Card */}
                    <div className="bg-white border border-[#edebe9] rounded-sm shadow-sm hover:shadow-fluent transition-all flex flex-col h-full group">
                        <div className="p-5 border-b border-[#f3f2f1] bg-[#faf9f8] group-hover:bg-[#eff6fc] transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 bg-white rounded-md border border-[#edebe9]">
                                    <CodeIcon className="w-6 h-6 text-[#C71D7E]" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-[#201f1e]">$45 <span className="text-sm font-normal text-[#605e5c]">/ hr</span></div>
                                    <div className="text-[10px] uppercase font-bold text-[#0078d4] tracking-wide">USD</div>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#201f1e]">Dynamics 365 Development</h3>
                            <p className="text-xs text-[#605e5c] mt-1">Hands-on technical implementation & customization</p>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                            <ul className="space-y-3 mb-6 flex-1">
                                <ListItem text="Custom Plugin & Workflow Development (C#)" />
                                <ListItem text="PCF Control Creation (React/TypeScript)" />
                                <ListItem text="Azure Functions & Logic Apps Integration" />
                                <ListItem text="Power Automate Cloud Flows" />
                                <ListItem text="Client-side Scripting (JavaScript/TypeScript)" />
                                <ListItem text="Data Migration & ETL Scripting" />
                            </ul>
                            
                            <a 
                                href="mailto:bruno.m.servulo@gmail.com?subject=Inquiry: Development Engagement"
                                className="block w-full text-center py-2 px-4 bg-[#0078d4] hover:bg-[#106ebe] text-white font-semibold rounded-sm transition-colors text-sm"
                            >
                                Inquire Availability
                            </a>
                        </div>
                    </div>

                    {/* Architecture Card */}
                    <div className="bg-white border border-[#edebe9] rounded-sm shadow-sm hover:shadow-fluent transition-all flex flex-col h-full group">
                        <div className="p-5 border-b border-[#f3f2f1] bg-[#faf9f8] group-hover:bg-[#eff6fc] transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 bg-white rounded-md border border-[#edebe9]">
                                    <ServerIcon className="w-6 h-6 text-[#004578]" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-[#201f1e]">$60 <span className="text-sm font-normal text-[#605e5c]">/ hr</span></div>
                                    <div className="text-[10px] uppercase font-bold text-[#0078d4] tracking-wide">USD</div>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#201f1e]">Solution Architecture</h3>
                            <p className="text-xs text-[#605e5c] mt-1">Strategic design, governance & technical leadership</p>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                            <ul className="space-y-3 mb-6 flex-1">
                                <ListItem text="End-to-End Solution Design & Blueprinting" />
                                <ListItem text="Security Modeling & Compliance Review" />
                                <ListItem text="Integration Pattern Definition (Azure/Dataverse)" />
                                <ListItem text="Code Reviews & Technical Governance" />
                                <ListItem text="DevOps Strategy & CI/CD Pipeline Setup" />
                                <ListItem text="Performance Tuning & Scalability Planning" />
                            </ul>
                            
                            <a 
                                href="mailto:bruno.m.servulo@gmail.com?subject=Inquiry: Architecture Role"
                                className="block w-full text-center py-2 px-4 bg-[#0078d4] hover:bg-[#106ebe] text-white font-semibold rounded-sm transition-colors text-sm"
                            >
                                Inquire Availability
                            </a>
                        </div>
                    </div>
                </div>
            </Section>

            <div className="bg-[#f3f2f1] p-4 rounded-sm text-center border border-[#edebe9]">
                <p className="text-sm text-[#605e5c]">
                    For fixed-price projects or long-term retainer agreements, please contact me directly to discuss custom arrangements.
                </p>
            </div>
        </div>
    );
};

const ListItem: React.FC<{ text: string }> = ({ text }) => (
    <li className="flex items-start gap-3 text-sm text-[#333]">
        <CheckMarkIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
        <span className="leading-snug">{text}</span>
    </li>
);

export default HireMe;