import type {
  PersonalInfo,
  SkillGroup,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  CertificationItem
} from '../types/portfolio';

import { profile } from './profile';
import { certifications } from './certifications';

export { profile, certifications };

export const personalInfo: PersonalInfo = {
  name: profile.name,
  roleTitle: profile.professionalTitle,
  roles: [
    "Java Full Stack Developer",
    "Spring Boot & Microservices Specialist",
    "React & TypeScript Architect",
    "Cloud & Distributed Systems Builder"
  ],
  shortBio: profile.shortBio,
  fullBio: [
    profile.about.personalIntroduction,
    profile.about.professionalSummary
  ],
  careerObjective: profile.about.careerObjective,
  email: profile.email,
  mobileNumber: profile.mobileNumber,
  location: profile.location,
  status: "Open to New Opportunities",
  avatarUrl: profile.profilePhoto,
  resumeUrl: profile.resumeURL,
  socials: {
    github: profile.social.github,
    linkedin: profile.social.linkedin,
    email: `mailto:${profile.email}`
  }
};


export const skillsData: SkillGroup[] = [
  {
    category: 'Programming',
    description: 'Core languages powering system logic, data structures, and algorithms',
    skills: [
      { name: 'Java', level: 'Expert', highlight: true },
      { name: 'Python', level: 'Advanced' },
      { name: 'C', level: 'Intermediate' },
      { name: 'C++', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Expert', highlight: true },
      { name: 'SQL', level: 'Expert', highlight: true }
    ]
  },
  {
    category: 'Frontend',
    description: 'Responsive, accessible, and high-performance UI engineering',
    skills: [
      { name: 'HTML', level: 'Expert' },
      { name: 'CSS', level: 'Expert' },
      { name: 'JavaScript (ES6+)', level: 'Expert' },
      { name: 'React', level: 'Expert', highlight: true },
      { name: 'Bootstrap', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Expert', highlight: true }
    ]
  },
  {
    category: 'Backend',
    description: 'Scalable microservices, RESTful interfaces, and business logic layers',
    skills: [
      { name: 'Java', level: 'Expert', highlight: true },
      { name: 'Spring Boot', level: 'Expert', highlight: true },
      { name: 'REST APIs', level: 'Expert', highlight: true },
      { name: 'Flask', level: 'Advanced' }
    ]
  },
  {
    category: 'Database',
    description: 'Relational data modeling, ACID transactions, and NoSQL storage',
    skills: [
      { name: 'MySQL', level: 'Expert', highlight: true },
      { name: 'PostgreSQL', level: 'Advanced', highlight: true },
      { name: 'MongoDB', level: 'Intermediate' }
    ]
  },
  {
    category: 'Tools',
    description: 'Build automation, testing, containerization, and version control',
    skills: [
      { name: 'Git', level: 'Expert', highlight: true },
      { name: 'GitHub', level: 'Expert' },
      { name: 'Maven', level: 'Advanced', highlight: true },
      { name: 'Postman', level: 'Expert' },
      { name: 'Docker', level: 'Advanced', highlight: true }
    ]
  },
  {
    category: 'Cloud',
    description: 'Cloud deployment, managed services, and infrastructure basics',
    skills: [
      { name: 'AWS', level: 'Advanced', highlight: true },
      { name: 'AWS EC2', level: 'Advanced' },
      { name: 'AWS S3', level: 'Advanced' },
      { name: 'AWS RDS', level: 'Intermediate' }
    ]
  }
];

import { projects } from './projects';
export const projectsData: ProjectItem[] = projects;
export { projects };


import { experiences } from './experience';
export const experienceData: ExperienceItem[] = experiences;
export { experiences };

export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science and Engineering',
    institution: 'MLR Institute of Technology',
    location: 'Hyderabad, Telangana',
    period: '2024 — 2028',
    grade: 'CGPA: 8.97 / 10.0',
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java)',
      'Database Management Systems (SQL)',
      'Operating Systems & Concurrency',
      'Computer Networks',
      'Software Engineering & System Design'
    ],
    highlights: [
      'Maintaining an outstanding academic performance with an 8.97 CGPA.',
      'Active participant in technical symposiums, software hackathons, and coding clubs.'
    ]
  },
  {
    id: 'edu-2',
    degree: 'Senior Secondary (XII)',
    field: 'Intermediate (MPC — Mathematics, Physics, Chemistry)',
    institution: 'FIITJEE Junior College',
    location: 'Visakhapatnam, Andhra Pradesh',
    period: '2022',
    grade: '93.50%',
    coursework: [
      'Mathematics',
      'Physics',
      'Chemistry'
    ],
    highlights: [
      'Affiliated with Board of Intermediate Education, Andhra Pradesh (BIEAP).',
      'Graduated with 93.50% distinction in competitive science stream.'
    ]
  },
  {
    id: 'edu-3',
    degree: 'Secondary (X)',
    field: 'Secondary School Certificate',
    institution: 'Narayana High School, Visakhapatnam',
    location: 'Visakhapatnam, Andhra Pradesh',
    period: '2022',
    grade: '90.00%',
    coursework: [
      'Mathematics',
      'Science',
      'Social Studies',
      'English'
    ],
    highlights: [
      'Affiliated with Central Board of Secondary Education (CBSE).',
      'Secured 90.00% distinction with consistent academic excellence.'
    ]
  }
];


export const certificationsData: CertificationItem[] = certifications;

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' }
];
