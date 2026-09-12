import type { ProjectItem } from '../types/portfolio';

/**
 * =============================================================================
 * CENTRALIZED PROJECT PORTFOLIO DATASET
 * =============================================================================
 * Only real, verified candidate projects are included.
 * 1. TAME — Timetable Allocation & Management Environment
 * 2. AI Resume Builder
 * =============================================================================
 */
export const projects: ProjectItem[] = [
  {
    id: 'tame-timetable-management',
    title: 'TAME — Timetable Allocation & Management Environment',
    slug: 'tame-timetable-management',
    category: 'Full Stack / Java',
    tagline: 'Intelligent academic timetable generation and resource allocation platform for conflict-free university scheduling',
    shortDescription: 'An intelligent academic timetable management platform that automates timetable generation, detects scheduling conflicts, and manages faculty, classroom, subject, section, and time-slot allocation.',
    description: 'TAME (Timetable Allocation & Management Environment) is a full-stack academic scheduling platform designed to automate the complex process of university timetable generation. The system manages faculty schedules, subjects, classrooms, laboratories, student sections, and time slots while identifying and minimizing scheduling conflicts.',
    longDescription: 'Engineered a comprehensive academic timetable management environment that combines constraint-based validation, greedy scheduling heuristics, and optimization techniques to generate practical and conflict-free timetables. The platform provides centralized management of faculty availability, classroom capacity, laboratory requirements, subject assignments, and time-slot constraints. It also provides visual timetable management, conflict detection, workload analysis, classroom allocation, and schedule export capabilities through a responsive web interface.',
    problem: 'Traditional academic timetable preparation is largely manual and requires administrators to coordinate multiple constraints such as faculty availability, classroom capacity, laboratory requirements, subject credits, department schedules, working hours, and section requirements. Manual scheduling can result in faculty clashes, room conflicts, overlapping subjects, uneven workloads, and significant time spent repeatedly modifying schedules.',
    problemStatement: 'Traditional academic timetable preparation is largely manual and requires administrators to coordinate multiple constraints such as faculty availability, classroom capacity, laboratory requirements, subject credits, department schedules, working hours, and section requirements. Manual scheduling can result in faculty clashes, room conflicts, overlapping subjects, uneven workloads, and significant time spent repeatedly modifying schedules.',
    solution: 'Developed a Java Spring Boot based scheduling engine with constraint validation and optimization heuristics to automatically generate academic timetables. A React and TypeScript frontend provides an interactive interface for administrators and faculty to view schedules, identify conflicts, manage allocations, and make controlled timetable adjustments. MySQL is used for centralized storage of academic resources and scheduling information.',
    image: '/images/projects/tame.png',
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      'MySQL',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'REST APIs',
      'Git',
      'GitHub',
      'Docker'
    ],
    features: [
      'Automated timetable generation based on faculty, classroom, subject, section, and time-slot constraints',
      'Faculty availability management and scheduling preference tracking',
      'Classroom and laboratory allocation based on room capacity and resource requirements',
      'Subject and section scheduling with multi-department support',
      'Faculty conflict detection preventing simultaneous overlapping assignments',
      'Classroom conflict detection preventing duplicate room bookings',
      'Constraint-based timetable validation with instant visual indicators',
      'Faculty workload management and distribution analytics',
      'Interactive timetable visualization grid for departments and sections',
      'Support for multiple academic departments and curriculum sections',
      'REST API based architecture connecting React frontend with Spring Boot backend',
      'Responsive web interface optimized for desktop and mobile devices'
    ],
    architecturePoints: [
      'Multi-tier full-stack architecture with React and TypeScript presentation layer',
      'Spring Boot REST API layer responsible for handling timetable, faculty, subject, classroom, and scheduling operations',
      'Layered backend architecture following Controller-Service-Repository separation',
      'Service layer containing scheduling logic, constraint validation, conflict detection, and optimization operations',
      'Spring Data JPA and Hibernate used for database persistence and relational data management',
      'MySQL relational database for storing faculty, subjects, classrooms, departments, sections, time slots, and generated timetable data',
      'DTO-based API communication with request validation and structured JSON responses',
      'Algorithmic scheduling engine combining constraint validation, greedy heuristics, and optimization techniques'
    ],
    challenges: [
      'Handling multiple interdependent constraints such as faculty availability, classroom capacity, laboratory requirements, subject hours, and section schedules',
      'Designing an efficient scheduling approach for a computationally complex constraint-satisfaction problem',
      'Preventing simultaneous allocation of the same faculty member or classroom to multiple sessions',
      'Balancing faculty workload while satisfying mandatory departmental timetable constraints',
      'Maintaining real-time consistency between generated schedules and manual administrator modifications'
    ],
    contribution: [
      'Designed the overall architecture for the TAME academic timetable management platform',
      'Designed the MySQL relational database schema for faculty, departments, subjects, classrooms, sections, and allocations',
      'Implemented Spring Boot REST APIs for academic resource and timetable management',
      'Developed scheduling and constraint-validation logic for detecting faculty, classroom, subject, and section conflicts',
      'Built the interactive timetable matrix and conflict indicator in React with TypeScript and Tailwind CSS',
      'Integrated frontend components with Spring Boot REST APIs and tested API workflows'
    ],
    githubUrl: 'https://github.com/chinnamnaidu19/tame-timetable-management',
    githubURL: 'https://github.com/chinnamnaidu19/tame-timetable-management',
    liveUrl: '',
    liveDemoURL: '',
    featured: true
  },
  {
    id: 'ai-resume-builder',
    title: 'AI Resume Builder',
    slug: 'ai-resume-builder',
    category: 'AI / Full Stack',
    tagline: 'AI-powered resume creation, intelligent content optimization, and ATS compatibility analysis platform',
    shortDescription: 'An AI-powered resume builder that helps users create professional resumes, analyze existing resumes for ATS compatibility, and generate improved resume content using AI.',
    description: 'AI Resume Builder is a comprehensive full-stack application designed to help job seekers build recruiter-ready resumes, parse and analyze existing resumes against ATS guidelines, and generate optimized professional content with AI assistance.',
    longDescription: 'Developed an end-to-end resume creation and ATS optimization platform allowing candidates to craft professional, ATS-compliant resumes with real-time preview, job description keyword matching analysis, AI-assisted summary suggestions, custom formatting templates, and instant PDF downloads.',
    problem: 'Job seekers often face high ATS (Applicant Tracking System) rejection rates due to non-standard layout parsing, missing relevant keywords, and unstructured PDF exports. Additionally, tailoring resumes for each job application is time-consuming.',
    problemStatement: 'Job seekers often face high ATS (Applicant Tracking System) rejection rates due to non-standard layout parsing, missing relevant keywords, and unstructured PDF exports. Additionally, tailoring resumes for each job application is time-consuming.',
    solution: 'Engineered an ATS-first template builder with real-time keyword density comparison, AI-assisted content drafting for summaries and bullet points, semantic single-column formatting, and clean PDF vector exports.',
    image: '/images/projects/ai-resume-builder.png',
    technologies: [
      'Java',
      'Spring Boot',
      'React',
      'TypeScript',
      'MySQL',
      'REST APIs',
      'AI / NLP',
      'Tailwind CSS'
    ],
    features: [
      'User-friendly resume builder with intuitive multi-step form navigation',
      'Resume upload and structured data parsing',
      'ATS score analysis with keyword density comparison against target job postings',
      'AI-powered resume generation and tailoring',
      'AI-generated professional executive summaries tailored to user experience',
      'AI-assisted skills and experience bullet point recommendations',
      'Multiple clean corporate resume templates adhering to standard ATS guidelines',
      'Interactive live resume editing and real-time canvas preview',
      'High-fidelity vectorized PDF resume generation with selectable text',
      'Instant one-click resume download',
      'Responsive interface designed for desktop and mobile devices'
    ],
    architecturePoints: [
      'Modular component structure in React with state management for dynamic multi-step forms',
      'Spring Boot REST backend providing template validation and resume export endpoints',
      'Structured JSON schema for resume data representation and export pipelines',
      'MySQL database for secure user resume data and draft persistence'
    ],
    challenges: [
      'Ensuring generated PDFs preserve accurate font metrics, margins, and selectable text across all browser print engines',
      'Creating dynamic responsive form inputs for varied work histories and academic credentials',
      'Implementing reliable ATS compatibility scoring against unstructured job descriptions'
    ],
    contribution: [
      'Designed and engineered the complete user interface and live preview canvas in React, TypeScript, and Tailwind CSS',
      'Implemented structured JSON data schemas for resume entities and export pipelines',
      'Integrated ATS keyword matching heuristics and AI-assisted content generation workflows',
      'Built the PDF export rendering pipeline ensuring high-fidelity print output'
    ],
    githubUrl: 'https://github.com/chinnamnaidu19/ai-resume-builder',
    githubURL: 'https://github.com/chinnamnaidu19/ai-resume-builder',
    liveUrl: '',
    liveDemoURL: '',
    featured: true
  }
];

export default projects;
