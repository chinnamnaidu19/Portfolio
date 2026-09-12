export type SkillCategory = 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Cloud';

export interface SkillItem {
  name: string;
  level?: 'Expert' | 'Advanced' | 'Intermediate';
  highlight?: boolean;
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string | number;
  title: string;
  slug?: string;
  category: string;
  tagline?: string;
  shortDescription?: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  features: string[];
  problem?: string;
  problemStatement?: string;
  solution?: string;
  architecturePoints?: string[];
  challenges?: string[];
  contribution?: string[];
  results?: string[];
  screenshots?: string[];
  metrics?: Record<string, string>;
  githubUrl?: string;
  githubURL?: string;
  liveUrl?: string;
  liveDemoURL?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role?: string;
  title?: string;
  project?: string;
  company?: string;
  organization?: string;
  companyUrl?: string;
  location?: string;
  type: string;
  category?: string;
  period?: string;
  current?: boolean;
  summary: string;
  highlights?: string[];
  features?: string[];
  contributions?: string[];
  technologies: string[];
  projectSlug?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  coursework: string[];
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  organization: string;
  issuer?: string;
  date?: string;
  issuedDate?: string;
  issueDate?: string;
  credentialId?: string;
  category?: string;
  type?: string;
  status?: string;
  verified?: boolean;
  description?: string;
  skills: string[];
  certificateUrl?: string;
  credentialUrl?: string;
  badgeText?: string;
}

export interface ProfileSocial {
  linkedin: string;
  github: string;
  portfolioURL?: string;
}

export interface ProfileAbout {
  professionalSummary: string;
  technicalInterests: string[];
  softwareInterests: string[];
  careerObjective: string;
  personalIntroduction: string;
}

export interface ProfileEducation {
  degree: string;
  college: string;
  university?: string;
  startYear: string;
  endYear: string;
  cgpa: string;
}

export interface ProfileData {
  name: string;
  professionalTitle: string;
  shortBio: string;
  about: ProfileAbout;
  profilePhoto: string;
  resumeURL: string;
  email: string;
  mobileNumber: string;
  location: string;
  social: ProfileSocial;
  education: ProfileEducation;
}

export interface PersonalInfo {
  name: string;
  roleTitle: string;
  roles: string[];
  shortBio: string;
  fullBio: string[];
  careerObjective: string;
  email: string;
  mobileNumber?: string;
  location: string;
  status: string;
  avatarUrl: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}

