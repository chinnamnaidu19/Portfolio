# Yandrapu ChinnamNaidu — Software Engineer & Java Developer Portfolio

[![Java](https://img.shields.io/badge/Java-17%2F21-orange.svg?style=for-the-badge&logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.3-green.svg?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-00758F.svg?style=for-the-badge&logo=mysql)](https://www.mysql.com/)

A modern, high-performance Software Engineer & Java Full Stack Developer portfolio showcasing full-stack academic projects (**TAME — Timetable Allocation & Management Environment**, **AI Resume Builder**), verified credentials, education milestones, and clean corporate white/light design.

---

## 🏛️ System Architecture

```
[ Browser / Client ] (React 18 + TypeScript + Vite + Tailwind CSS)
        │
        ▼  REST APIs (/api/v1)
[ Spring Boot 3.3.3 Backend ] (Controllers, Services, Repositories)
        │
        ▼  Spring Data JPA / Hibernate
[ MySQL 8.0 / H2 Database ]
```

---

## 🚀 Key Sections & Features

1. **Hero & About Me**: Professional background, technical interests, and career objective.
2. **Technical Skills**: Programming (Java, Python, C, C++, JavaScript, SQL), Frontend, Backend, Database, Tools, and Cloud.
3. **Projects Showcase**: 
   - **TAME — Timetable Allocation & Management Environment**: Academic timetable generation platform with constraint validation and conflict detection.
   - **AI Resume Builder**: AI-powered resume builder, ATS compatibility analysis, and vectorized PDF generation.
4. **Project Experience**: Hands-on full-stack development showcase for TAME.
5. **Academic Background**: B.Tech CSE at MLR Institute of Technology (CGPA: 8.97), Intermediate (FIITJEE), and Secondary (Narayana High School).
6. **Credentials & Recognition**: Industry job simulations and development programs (Walmart Global Tech, Deloitte, TCS iON).
7. **Resume & Contact**: Resume viewer/downloader and real-time contact form connected to Spring Boot backend.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite |
| **Backend** | Java, Spring Boot 3.3.3, Spring Data JPA, Hibernate, Actuator |
| **Database** | MySQL 8.0 / H2 (Development) |
| **Tools & Version Control** | Git, GitHub, Maven, Postman, Docker |

---

## 🗄️ Database Normalization & Schema (16 Tables)

The database schema is defined in [`backend/src/main/resources/schema.sql`](file:///d:/Projects/Portfolio/backend/src/main/resources/schema.sql):

- `users` — Administrator credentials (BCrypt hashed) and public bio
- `skill_categories` — Technical skill groupings
- `skills` — Granular skills with proficiency levels (`EXPERT`, `ADVANCED`, etc.)
- `projects` — Project showcases with URLs, taglines, and display order
- `project_technologies` — Many-to-Many junction table
- `project_features` — Granular architectural feature list
- `experience` — Career timeline milestones
- `experience_highlights` — One-to-Many engineering accomplishments
- `education` — Academic history and degrees
- `certifications` — Verified industry credentials and badges
- `achievements` — Honors, hackathons, and algorithm ranking metrics
- `coding_profiles` — Platform statistics (LeetCode, GitHub, HackerRank)
- `contact_messages` — Inbound recruiter messages with status tracking (`UNREAD`, `READ`, `RESPONDED`)
- `articles` — Technical engineering guides with markdown content
- `article_tags` — Article taxonomy
- `analytics_events` — Privacy-preserving interaction events

---

## 📡 REST API Specification

All backend endpoints are prefixed with `/api/v1`:

### Public Endpoints
- `POST /api/v1/auth/login` — Authenticate admin user & receive JWT
- `GET /api/v1/projects` — Fetch all projects
- `GET /api/v1/projects/{id}` — Fetch project details by ID or Slug
- `GET /api/v1/skills/categories` — Fetch skills categorized
- `GET /api/v1/experience` — Fetch timeline experiences
- `GET /api/v1/education` — Fetch education records
- `GET /api/v1/certifications` — Fetch certifications
- `GET /api/v1/achievements` — Fetch achievements
- `GET /api/v1/coding-profiles` — Fetch coding platforms
- `GET /api/v1/articles` — Fetch published technical articles
- `GET /api/v1/articles/{slug}` — Fetch article by slug
- `GET /api/v1/portfolio` — Single-request aggregated public dataset
- `POST /api/v1/contact` — Submit recruiter contact inquiry
- `POST /api/v1/analytics/track` — Track anonymous visitor interaction
- `GET /api/v1/actuator/health` — System health status check

### Admin Protected Endpoints (Bearer JWT Required)
- `POST /api/v1/projects`, `PUT /api/v1/projects/{id}`, `DELETE /api/v1/projects/{id}`
- `POST /api/v1/skills`, `PUT /api/v1/skills/{id}`, `DELETE /api/v1/skills/{id}`
- `POST /api/v1/articles`, `PUT /api/v1/articles/{id}`, `DELETE /api/v1/articles/{id}`
- `GET /api/v1/contact` — View contact inbox
- `PATCH /api/v1/contact/{id}/status` — Update message status
- `GET /api/v1/analytics/stats` — Retrieve aggregated analytics report

---

## ⚙️ Environment Variables Reference

### Backend Configuration (`backend/.env` or Container Environment)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `8080` |
| `DB_URL` | MySQL JDBC connection string | `jdbc:mysql://localhost:3306/portfolio_db` |
| `DB_USERNAME` | MySQL database user | `root` |
| `DB_PASSWORD` | MySQL database password | `""` |
| `JWT_SECRET` | 256/512-bit encryption key | `404E63...` |
| `JWT_EXPIRATION_MS` | Token validity duration in milliseconds | `86400000` (24h) |
| `CORS_ALLOWED_ORIGINS` | Allowed client origins | `http://localhost:5173,http://127.0.0.1:5173` |
| `GITHUB_TOKEN` | Optional GitHub Personal Access Token | `""` |

### Frontend Configuration (`.env` or Vercel Environment)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_URL` | Backend REST API base URL | `http://localhost:8080/api/v1` |
| `VITE_GITHUB_USERNAME` | GitHub account handle | `alexandervance-dev` |

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- Java JDK 17 or 21
- MySQL 8.0 (or Docker)

### 1. Database Setup
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Backend Setup
```bash
cd backend
mvn clean spring-boot:run
```
*Backend runs on `http://localhost:8080/api/v1` with pre-seeded data initialized automatically.*

### 3. Frontend Setup
```bash
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173/`.*

---

## 🐳 Docker Compose Quickstart

Launch the entire stack (MySQL 8.0 + Spring Boot Backend) in a single command:

```bash
docker-compose up -d --build
```

Verify service status:
```bash
docker-compose ps
curl http://localhost:8080/api/v1/actuator/health
```

---

## 🚢 Cloud Deployment Guide

### Frontend on Vercel
1. Push repository to GitHub.
2. Import project into Vercel.
3. Set Environment Variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api/v1`
4. Deploy (Vercel automatically applies [`vercel.json`](file:///d:/Projects/Portfolio/vercel.json) rewrite rules).

### Backend on Render / Railway / AWS ECS
1. Connect GitHub repository and select Dockerfile deployment (`backend/Dockerfile`).
2. Supply environment variables (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`).
3. Set health check path to `/api/v1/actuator/health`.

---

## 🔒 Security & Performance Features

- **Stateless Authentication**: JJWT with 24-hour expiration and custom entry points.
- **Password Security**: BCrypt hashing with work factor 12.
- **SQL Injection Prevention**: Spring Data JPA parameterized queries.
- **XSS Sanitization & Error Masking**: Centralized `GlobalExceptionHandler` with sanitized output.
- **Code Splitting**: `React.lazy` bundles subpages into isolated async chunks.
- **Container Hardening**: Non-root container user and ZGC generational garbage collector tuning.
