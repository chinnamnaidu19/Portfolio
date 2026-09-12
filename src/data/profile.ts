import type { ProfileData } from '../types/portfolio';

/**
 * =====================================================================
 * CENTRALIZED PERSONAL DATA & PROFILE CONFIGURATION
 * =====================================================================
 * All personal information for the portfolio is centralized in this file.
 * To update your details, simply edit the values below.
 * Components across the application dynamically render from this data.
 * =====================================================================
 */
export const profile: ProfileData = {
  // --- 1. My Name ---
  name: "Yandrapu ChinnamNaidu",

  // --- 2. Professional Title ---
  professionalTitle: "Software Engineer | Java Developer",

  // --- 3. Short Professional Bio (Shown in Hero Section) ---
  shortBio: "Computer Science Engineering student and aspiring Full Stack Developer & Software Engineer, skilled in building scalable web applications using modern technologies. Passionate about software development, problem-solving, AI, and creating intuitive user experiences.",

  // --- 4. Profile Photo & Resume ---
  // Place your photo at /public/images/profile.jpg
  profilePhoto: "/images/profile.jpg",
  // Place your resume at /public/resume/resume.pdf
  resumeURL: "/resume/resume.pdf",

  // --- 5. Contact Information & Location ---
  email: "chinnamnaiduyandrapu2005@gmail.com",
  mobileNumber: "+91 6305132868",
  location: "Hyderabad, India",

  // --- 6. Social & Coding Profiles ---
  // If you do not have a particular profile, leave it as an empty string ""
  social: {
    linkedin: "https://www.linkedin.com/in/chinnamnaidu",
    github: "https://github.com/chinnamnaidu19",
    portfolioURL: "https://yourportfolio.com"
  },

  // --- 7. Detailed About Me Information ---
  about: {
    personalIntroduction: "Hi, I am a Computer Science Engineering student and aspiring Software Engineer & Java Full Stack Developer. I am passionate about building reliable, scalable web applications and solving real-world problems through technology. I enjoy working across both frontend and backend development while continuously improving my programming, problem-solving, and software engineering skills.",
    professionalSummary: "Strong foundation in Java, Spring Boot, REST APIs, React.js, SQL, and modern web development. Experienced in developing academic and personal projects involving full-stack applications, database management, and AI-powered solutions. Interested in writing clean, maintainable code and building responsive, user-friendly applications using modern development practices.",
    technicalInterests: [
      "Java & Spring Boot – Backend Development and REST APIs",
      "Full Stack Web Development – Frontend, Backend & Database Integration",
      "React.js – Modern and Responsive User Interfaces",
      "Database Technologies – SQL, MySQL & Database Design",
      "Artificial Intelligence & Data Analytics – Intelligent and data-driven applications",
      "Software Engineering – Clean Code, Problem Solving & Scalable Application Design"
    ],
    softwareInterests: [
      "Full Stack Web Development",
      "Backend & REST API Development",
      "E-Commerce Applications",
      "AI-Powered Applications",
      "Database Management",
      "UI/UX & Responsive Design",
      "Problem Solving & DSA"
    ],
    careerObjective: "Seeking an opportunity as a Software Engineer or Java Full Stack Developer where I can apply my technical knowledge, contribute to real-world projects, strengthen my software engineering skills, and grow as part of a collaborative development team."
  },

  // --- 8. Education Details ---
  education: {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    college: "MLR Institute of Technology",
    startYear: "2024",
    endYear: "2028",
    cgpa: "8.97 / 10.0"
  }
};

export default profile;
