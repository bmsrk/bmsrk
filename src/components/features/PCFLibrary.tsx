import React, { useState, useEffect } from 'react';
import Section from '../common/Section';
import PCFWrapper from './PCFWrapper';

// --- CONTROL 1: LINEAR SLIDER INPUT ---
const LinearInputControl: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                 <label className="text-sm text-[#333]">Budget Allocation</label>
                 <span className="text-sm font-bold text-[#0078d4]">{value}%</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                    className="absolute h-full bg-[#0078d4] rounded-full transition-all duration-100" 
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                ></div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={value} 
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
};

const LINEAR_CODE = `export class LinearInputControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _value: number;
    private _notifyOutputChanged: () => void;
    private _container: HTMLDivElement;
    private _slider: HTMLInputElement;

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;
        
        // Render control
        this._slider = document.createElement("input");
        this._slider.type = "range";
        this._slider.addEventListener("input", this.onInput.bind(this));
        this._container.appendChild(this._slider);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._value = context.parameters.sampleProperty.raw;
        this._slider.value = this._value.toString();
    }

    private onInput(evt: Event): void {
        this._value = Number(this._slider.value);
        this._notifyOutputChanged();
    }

    public getOutputs(): IOutputs {
        return { sampleProperty: this._value };
    }
}`;

// --- CONTROL 2: TAG LIST INPUT ---
const TagListControl: React.FC<{ tags: string; onChange: (v: string) => void }> = ({ tags, onChange }) => {
    const [inputValue, setInputValue] = useState("");
    const tagArray = tags ? tags.split(',').filter(t => t.trim() !== '') : [];

    const addTag = () => {
        if (!inputValue.trim()) return;
        const newTags = [...tagArray, inputValue.trim()];
        onChange(newTags.join(','));
        setInputValue("");
    };

    const removeTag = (index: number) => {
        const newTags = tagArray.filter((_, i) => i !== index);
        onChange(newTags.join(','));
    };

    return (
        <div className="w-full font-sans">
             <div className="flex gap-2 mb-2">
                 <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add a skill..."
                    className="flex-1 border border-[#8a8886] px-2 py-1.5 text-sm rounded-sm focus:border-[#0078d4] outline-none"
                 />
                 <button 
                    onClick={addTag}
                    className="bg-[#0078d4] text-white px-3 py-1 text-sm rounded-sm hover:bg-[#106ebe]"
                 >
                    Add
                 </button>
             </div>
             <div className="flex flex-wrap gap-2">
                 {tagArray.map((tag, i) => (
                     <span key={i} className="bg-[#eff6fc] text-[#005a9e] text-xs font-semibold px-2 py-1 rounded-sm flex items-center gap-1 border border-[#c7e0f4]">
                         {tag}
                         <button onClick={() => removeTag(i)} className="hover:text-red-600 font-bold ml-1">×</button>
                     </span>
                 ))}
                 {tagArray.length === 0 && <span className="text-xs text-gray-400 italic">No tags added yet.</span>}
             </div>
        </div>
    );
};

const TAG_CODE = `export class TagListControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _value: string;
    private _notifyOutputChanged: () => void;
    private _reactRoot: ReactDOM.Root;

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._notifyOutputChanged = notifyOutputChanged;
        this._reactRoot = ReactDOM.createRoot(container);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._value = context.parameters.value.raw || "";
        // Render React Component inside PCF
        this._reactRoot.render(
            <TagListComponent 
                tags={this._value} 
                onChange={this.onChange.bind(this)} 
            />
        );
    }

    private onChange(newValue: string): void {
        this._value = newValue;
        this._notifyOutputChanged();
    }

    public getOutputs(): IOutputs {
        return { value: this._value };
    }
}`;


// --- MAIN LIBRARY COMPONENT ---
const PCFLibrary: React.FC = () => {
    const [linearValue, setLinearValue] = useState(45);
    const [tagValue, setTagValue] = useState("React,TypeScript,PCF");

    return (
        <div className="space-y-6">
            <div className="mb-6 p-4 bg-[#eff6fc] border border-[#c7e0f4] rounded-sm text-sm text-[#333]">
                <h3 className="font-bold text-[#0078d4] mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                    Component Playground
                </h3>
                <p className="mb-2">
                    This area demonstrates my ability to extend the Dynamics 365 / Power Platform UI using the <strong>Power Apps Component Framework (PCF)</strong>.
                </p>
                <p>
                    These components are built using <strong>TypeScript</strong> and <strong>React</strong>. The "Source Code" tab in each card shows the standard PCF class implementation structure I use in production environments.
                </p>
            </div>

            <Section title="Standard Controls">
                <PCFWrapper 
                    title="Linear Input Control" 
                    description="Custom slider for percentage fields"
                    codeSnippet={LINEAR_CODE}
                    properties={[
                        { name: "Value", type: "Whole.None", value: linearValue, onChange: setLinearValue }
                    ]}
                >
                    <LinearInputControl value={linearValue} onChange={setLinearValue} />
                </PCFWrapper>

                <PCFWrapper 
                    title="Tag List Input" 
                    description="Visual management for CSV strings"
                    codeSnippet={TAG_CODE}
                    properties={[
                        { name: "Tags (CSV)", type: "SingleLine.Text", value: tagValue, onChange: setTagValue }
                    ]}
                >
                    <TagListControl tags={tagValue} onChange={setTagValue} />
                </PCFWrapper>
            </Section>
        </div>
    );
};

export default PCFLibrary;