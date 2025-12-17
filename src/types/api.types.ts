export interface PersonalApiResponse {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
}

export interface JobApiResponse {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationApiResponse {
  institution: string;
  degree: string;
  graduation_year: string;
}

export interface CertificationApiResponse {
  name: string;
  issuer?: string;
  date?: string;
}

export interface LanguageApiResponse {
  language: string;
  proficiency: string;
}

export interface ProjectApiResponse {
  project_name: string;
  role: string;
  client_industry: string;
  year: string;
  description: string;
  technologies: string[];
  key_results: string[];
}

export interface ResumeApiResponse {
  personal: PersonalApiResponse;
  professional_summary: string;
  core_competencies: string[];
  technical_skills: Record<string, string[]>;
  professional_experience: JobApiResponse[];
  education: EducationApiResponse[];
  certifications: CertificationApiResponse[];
  languages: LanguageApiResponse[];
  key_projects: ProjectApiResponse[];
}
