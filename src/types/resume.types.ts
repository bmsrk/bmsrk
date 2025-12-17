export interface ContactInfo {
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Job {
  company: string;
  title: string;
  date: string;
  location: string;
  intro?: string;
  responsibilities: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  customer?: string;
  date: string;
  description: string;
  technologies: string[];
  impact: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  contact: ContactInfo;
  summary: string;
  aboutMe?: string[];
  skills: SkillCategory[];
  achievements: Achievement[];
  experience: Job[];
  education: Education[];
  certifications: string[];
  languages: string[];
  projects: Project[];
}
