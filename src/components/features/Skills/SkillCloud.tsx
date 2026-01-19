import React from 'react';
import { TagCloud } from 'react-tagcloud';
import { SkillCategory } from '../../../types';

interface SkillCloudProps {
  skills: SkillCategory[];
  onSkillClick?: (skill: string) => void;
}

const SkillCloud: React.FC<SkillCloudProps> = ({ skills, onSkillClick }) => {
  // Create a simple hash function for consistent but varied weights
  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Flatten skills into a single array for the cloud
  // Assign weights based on skill name hash for consistent visual variance
  const data = skills.flatMap((category) =>
    category.skills.map((skill) => ({
      value: skill,
      count: 15 + (hashCode(skill) % 20), // Deterministic weight based on skill name (15-34)
      key: skill,
      category: category.category,
    }))
  );

  const customRenderer = (tag: { value: string; count: number; key?: string; category?: string }, size: number, _color: string) => {
    const fontSize = size + 'px';
    const key = tag.key || tag.value;
    
    // Determine color based on category roughly
    let tagColor = 'text-brand-600';
    if (tag.category === 'Azure Services') tagColor = 'text-sky-600';
    if (tag.category === 'Power Platform') tagColor = 'text-purple-600';
    if (tag.category === 'Development') tagColor = 'text-slate-700';

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onSkillClick) {
        onSkillClick(tag.value);
      }
    };

    return (
      <button 
        onClick={handleClick}
        key={key}
        className={`tag-cloud-tag ${tagColor} cursor-pointer hover:underline hover:scale-110 transition-transform inline-block m-1 bg-transparent border-none`}
        style={{ fontSize }}
        title={`Click to learn more about ${tag.value}`}
      >
        {tag.value}
      </button>
    );
  };

  return (
    <div className="p-4 bg-white rounded-md border border-slate-200">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Technical Expertise Map</h3>
        <p className="text-xs text-slate-400">Click a skill to learn more with Clippy&apos;s help!</p>
      </div>
      <TagCloud
        minSize={14}
        maxSize={32}
        tags={data}
        renderer={customRenderer}
        className="text-center leading-loose"
      />
    </div>
  );
};

export default SkillCloud;