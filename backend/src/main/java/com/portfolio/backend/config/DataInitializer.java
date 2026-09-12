package com.portfolio.backend.config;

import com.portfolio.backend.entity.*;
import com.portfolio.backend.model.Article;
import com.portfolio.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final SkillCategoryRepository skillCategoryRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final CodingProfileRepository codingProfileRepository;
    private final ArticleRepository articleRepository;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Checking database tables for seed data initialization...");

        if (skillCategoryRepository.count() == 0) {
            seedSkills();
        }

        if (projectRepository.count() == 0) {
            seedProjects();
        }

        if (experienceRepository.count() == 0) {
            seedExperience();
        }

        if (educationRepository.count() == 0) {
            seedEducation();
        }

        if (certificationRepository.count() == 0) {
            seedCertifications();
        }

        if (codingProfileRepository.count() == 0) {
            seedCodingProfiles();
        }

        if (articleRepository.count() == 0) {
            seedArticles();
        }

        log.info("Database seed data verification complete.");
    }

    private void seedSkills() {
        // Programming
        SkillCategory prog = skillCategoryRepository.save(SkillCategory.builder()
                .name("Programming")
                .description("Core languages powering system logic, data structures, and algorithms")
                .displayOrder(1)
                .build());

        skillRepository.save(Skill.builder().category(prog).name("Java").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(1).build());
        skillRepository.save(Skill.builder().category(prog).name("Python").level(Skill.ProficiencyLevel.ADVANCED).isHighlighted(false).displayOrder(2).build());
        skillRepository.save(Skill.builder().category(prog).name("C").level(Skill.ProficiencyLevel.INTERMEDIATE).isHighlighted(false).displayOrder(3).build());
        skillRepository.save(Skill.builder().category(prog).name("C++").level(Skill.ProficiencyLevel.INTERMEDIATE).isHighlighted(false).displayOrder(4).build());
        skillRepository.save(Skill.builder().category(prog).name("JavaScript").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(5).build());
        skillRepository.save(Skill.builder().category(prog).name("SQL").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(6).build());

        // Frontend
        SkillCategory fe = skillCategoryRepository.save(SkillCategory.builder()
                .name("Frontend")
                .description("Responsive, accessible, and high-performance UI engineering")
                .displayOrder(2)
                .build());

        skillRepository.save(Skill.builder().category(fe).name("HTML").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(false).displayOrder(1).build());
        skillRepository.save(Skill.builder().category(fe).name("CSS").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(false).displayOrder(2).build());
        skillRepository.save(Skill.builder().category(fe).name("JavaScript (ES6+)").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(false).displayOrder(3).build());
        skillRepository.save(Skill.builder().category(fe).name("React").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(4).build());
        skillRepository.save(Skill.builder().category(fe).name("Bootstrap").level(Skill.ProficiencyLevel.ADVANCED).isHighlighted(false).displayOrder(5).build());
        skillRepository.save(Skill.builder().category(fe).name("Tailwind CSS").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(6).build());

        // Backend
        SkillCategory be = skillCategoryRepository.save(SkillCategory.builder()
                .name("Backend")
                .description("Scalable microservices, RESTful interfaces, and business logic layers")
                .displayOrder(3)
                .build());

        skillRepository.save(Skill.builder().category(be).name("Java").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(1).build());
        skillRepository.save(Skill.builder().category(be).name("Spring Boot").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(2).build());
        skillRepository.save(Skill.builder().category(be).name("REST APIs").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(3).build());
        skillRepository.save(Skill.builder().category(be).name("Flask").level(Skill.ProficiencyLevel.ADVANCED).isHighlighted(false).displayOrder(4).build());

        // Database
        SkillCategory db = skillCategoryRepository.save(SkillCategory.builder()
                .name("Database")
                .description("Relational data modeling, ACID transactions, and NoSQL storage")
                .displayOrder(4)
                .build());

        skillRepository.save(Skill.builder().category(db).name("MySQL").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(1).build());
        skillRepository.save(Skill.builder().category(db).name("PostgreSQL").level(Skill.ProficiencyLevel.ADVANCED).isHighlighted(true).displayOrder(2).build());
        skillRepository.save(Skill.builder().category(db).name("MongoDB").level(Skill.ProficiencyLevel.INTERMEDIATE).isHighlighted(false).displayOrder(3).build());

        // Tools
        SkillCategory tools = skillCategoryRepository.save(SkillCategory.builder()
                .name("Tools")
                .description("Build automation, testing, containerization, and version control")
                .displayOrder(5)
                .build());

        skillRepository.save(Skill.builder().category(tools).name("Git").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(true).displayOrder(1).build());
        skillRepository.save(Skill.builder().category(tools).name("GitHub").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(false).displayOrder(2).build());
        skillRepository.save(Skill.builder().category(tools).name("Maven").level(Skill.ProficiencyLevel.ADVANCED).isHighlighted(true).displayOrder(3).build());
        skillRepository.save(Skill.builder().category(tools).name("Postman").level(Skill.ProficiencyLevel.EXPERT).isHighlighted(false).displayOrder(4).build());
        skillRepository.save(Skill.builder().category(tools).name("Docker").level(Skill.ProficiencyLevel.ADVANCED).isHighlighted(true).displayOrder(5).build());

        // Cloud
        SkillCategory cloud = skillCategoryRepository.save(SkillCategory.builder()
                .name("Cloud")
                .description("Cloud deployment, managed services, and infrastructure basics")
                .displayOrder(6)
                .build());

        skillRepository.save(Skill.builder().category(cloud).name("AWS").level(Skill.ProficiencyLevel.ADVANCED).isHighlighted(true).displayOrder(1).build());
        skillRepository.save(Skill.builder().category(cloud).name("AWS EC2").level(Skill.ProficiencyLevel.ADVANCED).isHighlighted(false).displayOrder(2).build());
        skillRepository.save(Skill.builder().category(cloud).name("AWS S3").level(Skill.ProficiencyLevel.ADVANCED).isHighlighted(false).displayOrder(3).build());
        skillRepository.save(Skill.builder().category(cloud).name("AWS RDS").level(Skill.ProficiencyLevel.INTERMEDIATE).isHighlighted(false).displayOrder(4).build());

        log.info("Seeded Skill categories and skills.");
    }

    private void seedProjects() {
        Project p1 = Project.builder()
                .title("TAME — Timetable Allocation & Management Environment")
                .slug("tame-timetable-management")
                .category("Full Stack / Java")
                .tagline("Intelligent academic timetable generation and resource allocation platform for conflict-free university scheduling")
                .shortDescription("An intelligent academic timetable management platform that automates timetable generation, detects scheduling conflicts, and manages faculty, classroom, subject, section, and time-slot allocation.")
                .longDescription("Engineered a comprehensive academic timetable management environment that combines constraint-based validation, greedy scheduling heuristics, and optimization techniques to generate practical and conflict-free timetables. The platform provides centralized management of faculty availability, classroom capacity, laboratory requirements, subject assignments, and time-slot constraints.")
                .imageUrl("/images/projects/tame.png")
                .githubUrl("https://github.com/chinnamnaidu19/tame-timetable-management")
                .liveUrl("")
                .isFeatured(true)
                .displayOrder(1)
                .technologies(new HashSet<>(Arrays.asList("Java", "Spring Boot", "Spring Data JPA", "MySQL", "React", "TypeScript", "Tailwind CSS", "REST APIs", "Git", "GitHub", "Docker")))
                .features(Arrays.asList(
                        "Automated timetable generation based on faculty, classroom, subject, section, and time-slot constraints",
                        "Faculty availability management and scheduling preference tracking",
                        "Classroom and laboratory allocation based on room capacity and resource requirements",
                        "Subject and section scheduling with multi-department support",
                        "Faculty conflict detection preventing simultaneous overlapping assignments",
                        "Classroom conflict detection preventing duplicate room bookings",
                        "Constraint-based timetable validation with instant visual indicators",
                        "Faculty workload management and distribution analytics",
                        "Interactive timetable visualization grid for departments and sections",
                        "Support for multiple academic departments and curriculum sections",
                        "REST API based architecture connecting React frontend with Spring Boot backend",
                        "Responsive web interface optimized for desktop and mobile devices"
                ))
                .build();
        projectRepository.save(p1);

        Project p2 = Project.builder()
                .title("AI Resume Builder")
                .slug("ai-resume-builder")
                .category("AI / Full Stack")
                .tagline("AI-powered resume creation, intelligent content optimization, and ATS compatibility analysis platform")
                .shortDescription("An AI-powered resume builder that helps users create professional resumes, analyze existing resumes for ATS compatibility, and generate improved resume content using AI.")
                .longDescription("Developed an end-to-end resume creation and ATS optimization platform allowing candidates to craft professional, ATS-compliant resumes with real-time preview, job description keyword matching analysis, AI-assisted summary suggestions, custom formatting templates, and instant PDF downloads.")
                .imageUrl("/images/projects/ai-resume-builder.png")
                .githubUrl("https://github.com/chinnamnaidu19/ai-resume-builder")
                .liveUrl("")
                .isFeatured(true)
                .displayOrder(2)
                .technologies(new HashSet<>(Arrays.asList("Java", "Spring Boot", "React", "TypeScript", "MySQL", "REST APIs", "AI / NLP", "Tailwind CSS")))
                .features(Arrays.asList(
                        "User-friendly resume builder with intuitive multi-step form navigation",
                        "Resume upload and structured data parsing",
                        "ATS score analysis with keyword density comparison against target job postings",
                        "AI-powered resume generation and tailoring",
                        "AI-generated professional executive summaries tailored to user experience",
                        "AI-assisted skills and experience bullet point recommendations",
                        "Multiple clean corporate resume templates adhering to standard ATS guidelines",
                        "Interactive live resume editing and real-time canvas preview",
                        "High-fidelity vectorized PDF resume generation with selectable text",
                        "Instant one-click resume download",
                        "Responsive interface designed for desktop and mobile devices"
                ))
                .build();
        projectRepository.save(p2);

        log.info("Seeded Projects (TAME and AI Resume Builder).");
    }

    private void seedExperience() {
        Experience exp1 = Experience.builder()
                .role("TAME — Timetable Allocation & Management Environment")
                .company("Academic Full-Stack Project")
                .companyUrl("")
                .location("Hyderabad, India")
                .type("Full Stack / Java")
                .period("Academic Project")
                .isCurrent(false)
                .summary("TAME (Timetable Allocation & Management Environment) is a full-stack academic scheduling platform designed to automate timetable generation, manage faculty and classroom allocation, and identify scheduling conflicts across subjects, sections, rooms, and time slots.")
                .displayOrder(1)
                .highlights(Arrays.asList(
                        "Automated timetable generation based on academic constraints",
                        "Faculty availability and workload management",
                        "Classroom and laboratory allocation",
                        "Subject, section and time-slot scheduling",
                        "Faculty and classroom conflict detection",
                        "Constraint-based timetable validation",
                        "Interactive timetable visualization",
                        "Designed the MySQL database structure for faculty, subjects, classrooms, sections, time slots and timetable allocations",
                        "Developed Spring Boot REST APIs for academic resource and timetable management",
                        "Implemented scheduling and constraint-validation logic",
                        "Developed the React and TypeScript timetable interface"
                ))
                .technologies(new HashSet<>(Arrays.asList("Java", "Spring Boot", "Spring Data JPA", "MySQL", "React", "TypeScript", "Tailwind CSS", "REST APIs", "Git", "GitHub")))
                .build();
        experienceRepository.save(exp1);

        log.info("Seeded Project Experience (TAME).");
    }

    private void seedEducation() {
        Education edu1 = Education.builder()
                .degree("Bachelor of Technology (B.Tech)")
                .field("Computer Science and Engineering")
                .institution("MLR Institute of Technology")
                .location("Hyderabad, Telangana")
                .period("2024 — 2028")
                .grade("CGPA: 8.97 / 10.0")
                .displayOrder(1)
                .coursework(Arrays.asList(
                        "Data Structures & Algorithms",
                        "Object-Oriented Programming (Java)",
                        "Database Management Systems (SQL)",
                        "Operating Systems & Concurrency",
                        "Computer Networks",
                        "Software Engineering & System Design"
                ))
                .highlights(Arrays.asList(
                        "Maintaining an outstanding academic performance with an 8.97 CGPA.",
                        "Active participant in technical symposiums, software hackathons, and coding clubs."
                ))
                .build();
        educationRepository.save(edu1);

        Education edu2 = Education.builder()
                .degree("Senior Secondary (XII)")
                .field("Intermediate (MPC — Mathematics, Physics, Chemistry)")
                .institution("FIITJEE Junior College")
                .location("Visakhapatnam, Andhra Pradesh")
                .period("2022")
                .grade("93.50%")
                .displayOrder(2)
                .coursework(Arrays.asList(
                        "Mathematics",
                        "Physics",
                        "Chemistry"
                ))
                .highlights(Arrays.asList(
                        "Affiliated with Board of Intermediate Education, Andhra Pradesh (BIEAP).",
                        "Graduated with 93.50% distinction in competitive science stream."
                ))
                .build();
        educationRepository.save(edu2);

        Education edu3 = Education.builder()
                .degree("Secondary (X)")
                .field("Secondary School Certificate")
                .institution("Narayana High School, Visakhapatnam")
                .location("Visakhapatnam, Andhra Pradesh")
                .period("2022")
                .grade("90.00%")
                .displayOrder(3)
                .coursework(Arrays.asList(
                        "Mathematics",
                        "Science",
                        "Social Studies",
                        "English"
                ))
                .highlights(Arrays.asList(
                        "Affiliated with Central Board of Secondary Education (CBSE).",
                        "Secured 90.00% distinction with consistent academic excellence."
                ))
                .build();
        educationRepository.save(edu3);

        log.info("Seeded Education (B.Tech, XII, X).");
    }

    private void seedCertifications() {
        Certification c1 = Certification.builder()
                .title("Advanced Software Engineering Job Simulation")
                .issuer("Walmart Global Tech / Forage")
                .issueDate("August 8, 2026")
                .credentialId("")
                .credentialUrl("/certificates/walmart-advanced-software-engineering.pdf")
                .badgeText("Job Simulation")
                .displayOrder(1)
                .skills(Arrays.asList("Advanced Data Structures", "Software Architecture", "Relational Database Design", "Data Munging"))
                .build();
        certificationRepository.save(c1);

        Certification c2 = Certification.builder()
                .title("Cyber Job Simulation")
                .issuer("Deloitte / Forage")
                .issueDate("August 8, 2026")
                .credentialId("")
                .credentialUrl("/certificates/deloitte-cyber-job-simulation.pdf")
                .badgeText("Job Simulation")
                .displayOrder(2)
                .skills(Arrays.asList("Cybersecurity", "Security Analysis"))
                .build();
        certificationRepository.save(c2);

        Certification c3 = Certification.builder()
                .title("TCS iON Career Edge – Interview and Job Readiness")
                .issuer("Tata Consultancy Services")
                .issueDate("19 Mar 2026 – 02 Apr 2026")
                .credentialId("8749-30562042-1016")
                .credentialUrl("/certificates/tcs-ion-career-edge.pdf")
                .badgeText("Professional Program")
                .displayOrder(3)
                .skills(Arrays.asList("Communication Skills", "Resume Skills", "Interview Readiness", "Professional Etiquette", "Professional Writing", "MS Office", "Professional Branding", "Growth & Social Networking"))
                .build();
        certificationRepository.save(c3);

        log.info("Seeded Certifications (Walmart Global Tech, Deloitte, TCS iON).");
    }

    private void seedCodingProfiles() {
        CodingProfile cp1 = CodingProfile.builder()
                .platform("LeetCode")
                .username("alexandervance")
                .profileUrl("https://leetcode.com/alexandervance")
                .headline("Knight (1900+ Rating) · 600+ Problems Solved")
                .rankOrScore("Top 5.2% Globally")
                .solvedCount("600+ Solved")
                .accentColor("#FFA116")
                .displayOrder(1)
                .badges(Arrays.asList("Knight", "100 Days Badge", "Java Master"))
                .build();
        codingProfileRepository.save(cp1);

        CodingProfile cp2 = CodingProfile.builder()
                .platform("GitHub")
                .username("alexandervance-dev")
                .profileUrl("https://github.com/alexandervance-dev")
                .headline("50+ Repositories · 1,200+ Contributions in the last year")
                .rankOrScore("50+ Repos")
                .solvedCount("1.2k+ Commits")
                .accentColor("#10b981")
                .displayOrder(2)
                .badges(Arrays.asList("Arctic Code Vault", "Pull Shark", "Star Contributor"))
                .build();
        codingProfileRepository.save(cp2);

        CodingProfile cp3 = CodingProfile.builder()
                .platform("HackerRank")
                .username("alexandervance")
                .profileUrl("https://hackerrank.com/alexandervance")
                .headline("6 Stars in Java · 5 Stars in Problem Solving & SQL")
                .rankOrScore("6-Star Gold")
                .solvedCount("Gold Badges")
                .accentColor("#00EA64")
                .displayOrder(3)
                .badges(Arrays.asList("Java (6★)", "Problem Solving (5★)", "SQL (5★)"))
                .build();
        codingProfileRepository.save(cp3);

        CodingProfile cp4 = CodingProfile.builder()
                .platform("CodeChef")
                .username("alexandervance")
                .profileUrl("https://codechef.com/users/alexandervance")
                .headline("4-Star Coder (1850+ Max Rating) · Active Contest Participant")
                .rankOrScore("4-Star Coder")
                .solvedCount("1850+ Rating")
                .accentColor("#7B4425")
                .displayOrder(4)
                .badges(Arrays.asList("Division 2", "Cook-Off Finalist"))
                .build();
        codingProfileRepository.save(cp4);

        CodingProfile cp5 = CodingProfile.builder()
                .platform("GeeksforGeeks")
                .username("alexandervance")
                .profileUrl("https://auth.geeksforgeeks.org/user/alexandervance")
                .headline("Score 1400+ · Institute Rank #3 · 400+ DSA Problems Solved")
                .rankOrScore("Score: 1400+")
                .solvedCount("400+ Solved")
                .accentColor("#2F8D46")
                .displayOrder(5)
                .badges(Arrays.asList("Rank #3 Institute", "Master Coder"))
                .build();
        codingProfileRepository.save(cp5);

        log.info("Seeded Coding Profiles.");
    }

    private void seedArticles() {
        Article a1 = Article.builder()
                .title("Architecting Event-Driven Microservices with Spring Boot & Apache Kafka")
                .slug("architecting-event-driven-microservices-spring-boot-kafka")
                .description("A deep dive into distributed transactions, idempotency with the Outbox pattern, and sub-millisecond consumer scaling under high throughput.")
                .content("""
                        # Architecting Event-Driven Microservices with Spring Boot & Apache Kafka
                        
                        In high-throughput enterprise systems, synchronous REST communication between microservices often introduces latency amplification, cascading timeouts, and tight coupling. Adopting an **event-driven architecture (EDA)** with Apache Kafka enables autonomous service boundaries and resilient data pipelines.
                        
                        ## 1. Transactional Outbox Pattern
                        To prevent dual-write anomalies where a database commit succeeds but publishing a message to Kafka fails, we implement the **Transactional Outbox Pattern**:
                        - The business entity and the corresponding event payload are saved within the same ACID database transaction in MySQL.
                        - A Debezium CDC (Change Data Capture) connector or scheduled poll worker reads from the `outbox` table and streams events to Kafka with exactly-once delivery guarantees.
                        
                        ## 2. Idempotent Consumers
                        Consumers must handle network retries without causing duplicate state mutations. By storing processed `messageId` hashes in Redis with TTLs, consumer workers achieve idempotent execution:
                        
                        ```java
                        @KafkaListener(topics = "orders.created", groupId = "fulfillment-group")
                        public void handleOrderCreated(@Payload OrderEvent event, Acknowledgment ack) {
                            if (idempotencyService.hasProcessed(event.getEventId())) {
                                log.info("Duplicate event ignored: {}", event.getEventId());
                                ack.acknowledge();
                                return;
                            }
                            fulfillmentService.process(event);
                            idempotencyService.markProcessed(event.getEventId());
                            ack.acknowledge();
                        }
                        ```
                        
                        ## 3. Benchmark Results
                        Under a 15,000 req/sec benchmark with JMeter, decoupled asynchronous Kafka producers reduced p99 latency from 450ms down to 18ms compared to synchronous REST chains.
                        """)
                .readTime("5 min read")
                .coverImage("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80")
                .published(true)
                .tags(Arrays.asList("Java", "Spring Boot", "Kafka", "Microservices", "System Design"))
                .viewsCount(240)
                .build();
        articleRepository.save(a1);

        Article a2 = Article.builder()
                .title("High-Performance Java: Optimizing Garbage Collection & Virtual Threads")
                .slug("optimizing-java-garbage-collection-virtual-threads")
                .description("Practical guide to tuning ZGC, leveraging Java 21 Project Loom Virtual Threads, and eliminating memory leaks in concurrent applications.")
                .content("""
                        # High-Performance Java: Optimizing Garbage Collection & Virtual Threads
                        
                        Java 21 introduces groundbreaking concurrency paradigms with **Virtual Threads (Project Loom)** and ultra-low latency memory management via **Generational ZGC**.
                        
                        ## 1. The Power of Virtual Threads
                        Traditional Java platform threads map 1:1 to OS kernel threads, incurring ~1MB memory overhead per thread and substantial context switching overhead. Virtual Threads decouple application threads from carrier threads, allowing millions of concurrent tasks to execute seamlessly.
                        
                        ## 2. Tuning Generational ZGC
                        By enabling `-XX:+UseZGC -XX:+ZGenerational`, pause times are consistently maintained under **1 millisecond** even across 32GB heap allocations without throughput degradation.
                        
                        ## 3. Best Practices
                        - Avoid long-lived thread locals with virtual threads.
                        - Use `ReentrantLock` instead of synchronized blocks to prevent pinning carrier threads during I/O operations.
                        """)
                .readTime("4 min read")
                .coverImage("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80")
                .published(true)
                .tags(Arrays.asList("Java", "JVM", "Concurrency", "Performance", "Virtual Threads"))
                .viewsCount(185)
                .build();
        articleRepository.save(a2);

        log.info("Seeded Articles.");
    }
}
