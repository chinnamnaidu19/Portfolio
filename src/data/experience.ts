import type { ExperienceItem } from '../types/portfolio';

/**
 * =====================================================================
 * PROJECT EXPERIENCE DATASET
 * =====================================================================
 * Showcases hands-on full-stack development and system engineering
 * through the candidate's real academic capstone project (TAME).
 * =====================================================================
 */
export const experiences: ExperienceItem[] = [
  {
    id: 'exp-tame-project',
    title: 'TAME — Timetable Allocation & Management Environment',
    project: 'TAME — Timetable Allocation & Management Environment',
    category: 'Full Stack / Java',
    type: 'Academic Full-Stack Project',
    summary: 'TAME (Timetable Allocation & Management Environment) is a full-stack academic scheduling platform designed to automate timetable generation, manage faculty and classroom allocation, and identify scheduling conflicts across subjects, sections, rooms, and time slots.',
    features: [
      'Automated timetable generation based on academic constraints',
      'Faculty availability and workload management',
      'Classroom and laboratory allocation',
      'Subject, section and time-slot scheduling',
      'Faculty and classroom conflict detection',
      'Constraint-based timetable validation',
      'Interactive timetable visualization',
      'Multiple department and section support',
      'REST API based frontend-backend integration'
    ],
    contributions: [
      'Designed the MySQL database structure for faculty, subjects, classrooms, sections, time slots and timetable allocations.',
      'Developed Spring Boot REST APIs for academic resource and timetable management.',
      'Implemented scheduling and constraint-validation logic.',
      'Developed the React and TypeScript timetable interface.',
      'Integrated frontend components with Spring Boot REST APIs.',
      'Implemented conflict detection for faculty, classroom and scheduling constraints.'
    ],
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
      'GitHub'
    ],
    projectSlug: 'tame-timetable-management',
    githubUrl: 'https://github.com/chinnamnaidu19/tame-timetable-management',
    liveUrl: ''
  }
];

export default experiences;
