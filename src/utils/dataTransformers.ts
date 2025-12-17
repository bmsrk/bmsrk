import { ResumeData } from '../types/resume.types';
import { ResumeApiResponse } from '../types/api.types';

export const transformApiResponse = (data: ResumeApiResponse): ResumeData => {
  return {
    name: data.personal.name,
    title: data.personal.title,
    contact: {
      location: data.personal.location,
      email: data.personal.email,
      phone: data.personal.phone,
      linkedin: data.personal.linkedin,
      portfolio: data.personal.portfolio,
    },
    summary: data.professional_summary,
    aboutMe: [data.professional_summary],
    achievements: data.core_competencies.map((c) => ({
      title: c,
      description: 'Core Competency',
    })),
    skills: Object.entries(data.technical_skills).map(([category, skills]) => ({
      category: category
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      skills: skills,
    })),
    experience: data.professional_experience.map((job) => ({
      company: job.company,
      title: job.position,
      date: `${job.start_date} - ${job.end_date}`,
      location: job.location,
      intro: job.description,
      responsibilities: job.achievements,
      technologies: job.technologies,
    })),
    education: data.education.map((edu) => ({
      institution: edu.institution,
      degree: edu.degree,
      year: edu.graduation_year,
    })),
    certifications: data.certifications.map((c) => c.name),
    languages: data.languages.map((l) => `${l.language} (${l.proficiency})`),
    projects: data.key_projects.map((p, index) => ({
      id: `proj-${index}`,
      title: p.project_name,
      role: p.role,
      customer: p.client_industry,
      date: p.year,
      description: p.description,
      technologies: p.technologies,
      impact: p.key_results,
    })),
  };
};
