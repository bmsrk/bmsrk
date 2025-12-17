import React from 'react';
import { SkillCategory } from '../../../types/types';

interface SkillGroupProps {
  category: SkillCategory;
}

const SkillGroup: React.FC<SkillGroupProps> = ({ category }) => {
  return (
    <div className="mb-3 break-inside-avoid">
      <span className="font-bold text-slate-900 mr-2">{category.category}:</span>
      <span className="text-slate-700">{category.skills.join(", ")}</span>
    </div>
  );
};

export default SkillGroup;