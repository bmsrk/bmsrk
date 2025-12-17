import React from 'react';
import { TagCloud } from 'react-tagcloud';
import { SkillCategory } from '../../../types';
import { getSkillUrl } from '../../../constants';

interface SkillCloudProps {
  skills: SkillCategory[];
}

const SkillCloud: React.FC<SkillCloudProps> = ({ skills }) => {
  // Flatten skills into a single array for the cloud
  // Assign weights based on category or just random variance for visual interest
  const data = skills.flatMap(category => 
    category.skills.map(skill => ({
      value: skill,
      count: Math.floor(Math.random() * 20) + 15, // Random weight for size variation
      key: skill,
      category: category.category
    }))
  );

  const customRenderer = (tag: any, size: number, color: string) => {
    const fontSize = size + 'px';
    const key = tag.key || tag.value;
    const url = getSkillUrl(tag.value);
    
    // Determine color based on category roughly
    let tagColor = 'text-brand-600';
    if (tag.category === 'Azure Services') tagColor = 'text-sky-600';
    if (tag.category === 'Power Platform') tagColor = 'text-purple-600';
    if (tag.category === 'Development') tagColor = 'text-slate-700';

    return (
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        key={key}
        className={`tag-cloud-tag ${tagColor} cursor-pointer hover:underline hover:scale-110 transition-transform inline-block m-1`}
        style={{ fontSize }}
        title={`View ${tag.value} documentation on Microsoft Learn`}
      >
        {tag.value}
      </a>
    );
  };

  return (
    <div className="p-4 bg-white rounded-md border border-slate-200">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Technical Expertise Map</h3>
        <p className="text-xs text-slate-400">Click a skill to view documentation on Microsoft Learn</p>
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