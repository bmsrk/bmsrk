import { SkillMetadata } from '../types';

/**
 * Get skill description from metadata
 */
export const getSkillDescription = (
  skill: string,
  skillMetadata?: Record<string, SkillMetadata>
): string => {
  if (!skillMetadata || !skillMetadata[skill]) {
    return `Documentation and resources for ${skill}`;
  }
  return skillMetadata[skill].description;
};

/**
 * Get skill learn URL from metadata
 */
export const getSkillUrl = (
  skill: string,
  skillMetadata?: Record<string, SkillMetadata>
): string => {
  if (!skillMetadata || !skillMetadata[skill]) {
    return `https://learn.microsoft.com/en-us/search/?terms=${encodeURIComponent(skill)}`;
  }
  return skillMetadata[skill].learn_url;
};

/**
 * Get competency/skill description (unified function)
 * This replaces both getSkillDescription and getCompetencyDescription
 */
export const getCompetencyDescription = (
  title: string,
  skillMetadata?: Record<string, SkillMetadata>
): string => {
  return getSkillDescription(title, skillMetadata);
};
