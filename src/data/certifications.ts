import type { CertificationItem } from '../types/portfolio';

/**
 * =====================================================================
 * PROFESSIONAL CERTIFICATIONS & INDUSTRY PROGRAM CREDENTIALS
 * =====================================================================
 * Only genuine candidate certificates and job simulations.
 * =====================================================================
 */
export const certifications: CertificationItem[] = [
  {
    id: 'walmart-advanced-software-engineering',
    title: 'Advanced Software Engineering Job Simulation',
    organization: 'Walmart Global Tech',
    issuer: 'Walmart Global Tech / Forage',
    date: 'August 8, 2026',
    issuedDate: 'August 8, 2026',
    issueDate: 'August 8, 2026',
    type: 'Job Simulation',
    category: 'Job Simulation',
    status: 'Completed',
    verified: true,
    description: 'Completed an Advanced Software Engineering Job Simulation with practical tasks covering advanced data structures, software architecture, relational database design, and data munging.',
    skills: [
      'Advanced Data Structures',
      'Software Architecture',
      'Relational Database Design',
      'Data Munging'
    ],
    certificateUrl: '/certificates/walmart-advanced-software-engineering.pdf',
    credentialUrl: '/certificates/walmart-advanced-software-engineering.pdf',
    badgeText: 'Job Simulation'
  },
  {
    id: 'deloitte-cyber-job-simulation',
    title: 'Cyber Job Simulation',
    organization: 'Deloitte',
    issuer: 'Deloitte / Forage',
    date: 'August 8, 2026',
    issuedDate: 'August 8, 2026',
    issueDate: 'August 8, 2026',
    type: 'Job Simulation',
    category: 'Job Simulation',
    status: 'Completed',
    verified: true,
    description: 'Completed the Deloitte Cyber Job Simulation with practical experience in cybersecurity-related tasks.',
    skills: [
      'Cybersecurity',
      'Security Analysis'
    ],
    certificateUrl: '/certificates/deloitte-cyber-job-simulation.pdf',
    credentialUrl: '/certificates/deloitte-cyber-job-simulation.pdf',
    badgeText: 'Job Simulation'
  },
  {
    id: 'tcs-ion-career-edge',
    title: 'TCS iON Career Edge – Interview and Job Readiness',
    organization: 'TCS iON',
    issuer: 'Tata Consultancy Services',
    date: '19 Mar 2026 – 02 Apr 2026',
    issuedDate: '19 Mar 2026 – 02 Apr 2026',
    issueDate: '19 Mar 2026 – 02 Apr 2026',
    type: 'Professional Development Program',
    category: 'Professional Development Program',
    status: 'Completed',
    verified: true,
    credentialId: '8749-30562042-1016',
    description: 'Successfully completed the TCS iON Career Edge – Interview and Job Readiness course covering foundational communication skills, resume skills, interview readiness and etiquette, professional writing and MS Office, professional branding, growth and social networking.',
    skills: [
      'Communication Skills',
      'Resume Skills',
      'Interview Readiness',
      'Professional Etiquette',
      'Professional Writing',
      'MS Office',
      'Professional Branding',
      'Growth & Social Networking'
    ],
    certificateUrl: '/certificates/tcs-ion-career-edge.pdf',
    credentialUrl: '/certificates/tcs-ion-career-edge.pdf',
    badgeText: 'Professional Program'
  }
];

export default certifications;
