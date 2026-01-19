import React, { useState } from 'react';

type PropertyValue = string | number | boolean;

interface PCFProperty {
    name: string;
    type: string;
    value: PropertyValue;
    onChange: (val: PropertyValue) => void;
}

interface PCFWrapperProps {
    title: string;
    description: string;
    codeSnippet: string;
    children: React.ReactNode;
    properties: PCFProperty[];
}

const PCFWrapper: React.FC<PCFWrapperProps> = ({ title, description, codeSnippet, children, properties }) => {
    const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

    return (
        <div className="border border-[#edebe9] rounded-sm bg-white overflow-hidden shadow-sm mb-8">
            {/* Control Header */}
            <div className="bg-[#f3f2f1] border-b border-[#edebe9] px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#333]">{title}</span>
                    <span className="text-xs text-gray-500 px-2 border-l border-gray-300">{description}</span>
                </div>
                <div className="flex text-xs border border-[#edebe9] rounded-sm overflow-hidden">
                    <button 
                        onClick={() => setViewMode('preview')}
                        className={`px-3 py-1 ${viewMode === 'preview' ? 'bg-white text-[#0078d4] font-semibold' : 'bg-[#f3f2f1] text-[#333] hover:bg-[#edebe9]'}`}
                    >
                        Preview
                    </button>
                    <button 
                        onClick={() => setViewMode('code')}
                        className={`px-3 py-1 border-l border-[#edebe9] ${viewMode === 'code' ? 'bg-white text-[#0078d4] font-semibold' : 'bg-[#f3f2f1] text-[#333] hover:bg-[#edebe9]'}`}
                    >
                        Source Code
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col md:flex-row h-[400px]">
                
                {viewMode === 'preview' ? (
                    <>
                         {/* Control Stage (Canvas) */}
                        <div className="flex-1 p-8 bg-[#faf9f8] flex items-center justify-center relative border-r border-[#edebe9]">
                            {/* Standard PCF Container Simulation */}
                            <div className="w-full max-w-md bg-white p-4 border border-dashed border-gray-300 rounded-sm relative">
                                <span className="absolute -top-2.5 left-2 text-[10px] bg-[#faf9f8] px-1 text-gray-400">Control Container</span>
                                {children}
                            </div>
                        </div>

                        {/* Property Bag (Right Side) */}
                        <div className="w-full md:w-[280px] bg-white p-4 border-l border-[#edebe9] flex flex-col">
                            <h4 className="text-xs font-bold text-[#333] uppercase mb-4 pb-2 border-b border-[#edebe9]">Property Set</h4>
                            <div className="space-y-4">
                                {properties.map((prop, idx) => (
                                    <div key={idx}>
                                        <label className="block text-xs font-semibold text-[#333] mb-1">{prop.name} <span className="text-gray-400 font-normal">({prop.type})</span></label>
                                        {prop.type === 'Whole.None' || prop.type === 'Decimal' ? (
                                            <input 
                                                type="number" 
                                                value={typeof prop.value === 'number' ? prop.value : Number(prop.value)} 
                                                onChange={(e) => prop.onChange(Number(e.target.value))}
                                                className="w-full border border-[#8a8886] p-1.5 text-sm rounded-sm focus:border-[#0078d4] outline-none"
                                            />
                                        ) : prop.type === 'TwoOptions' ? (
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="checkbox" 
                                                    checked={Boolean(prop.value)} 
                                                    onChange={(e) => prop.onChange(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm">{prop.value ? 'True' : 'False'}</span>
                                            </div>
                                        ) : (
                                            <input 
                                                type="text" 
                                                value={typeof prop.value === 'string' ? prop.value : String(prop.value)} 
                                                onChange={(e) => prop.onChange(e.target.value)}
                                                className="w-full border border-[#8a8886] p-1.5 text-sm rounded-sm focus:border-[#0078d4] outline-none"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-auto pt-4 border-t border-[#edebe9] text-[10px] text-gray-400 leading-tight">
                                This pane simulates the Power Apps maker portal properties sidebar. Changes here trigger the <code>updateView</code> method.
                            </div>
                        </div>
                    </>
                ) : (
                    /* Code View */
                    <div className="w-full h-full bg-[#1e1e1e] overflow-auto p-4 text-xs font-mono">
                        <pre className="text-[#d4d4d4]">
                            <code>{codeSnippet}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PCFWrapper;