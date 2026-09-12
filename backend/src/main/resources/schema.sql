-- =============================================================================
-- MySQL Relational Database Schema for Software Engineer Portfolio
-- Normalization: 3NF (Third Normal Form)
-- Engine: InnoDB (ACID compliant)
-- Charset: utf8mb4 / utf8mb4_unicode_ci
-- =============================================================================

-- 1. SKILL CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS skill_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_skill_cat_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. SKILLS TABLE (Many-to-One with skill_categories)
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') DEFAULT 'INTERMEDIATE' NOT NULL,
    is_highlighted BOOLEAN DEFAULT FALSE NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_skills_category FOREIGN KEY (category_id) 
        REFERENCES skill_categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_skill_category (category_id),
    INDEX idx_skill_highlight (is_highlighted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT,
    image_url VARCHAR(500),
    github_url VARCHAR(500) NOT NULL,
    live_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_project_slug (slug),
    INDEX idx_project_category (category),
    INDEX idx_project_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. PROJECT TECHNOLOGIES JOIN TABLE (Many-to-Many between projects and skills)
CREATE TABLE IF NOT EXISTS project_technologies (
    project_id BIGINT NOT NULL,
    technology_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (project_id, technology_name),
    CONSTRAINT fk_proj_tech_project FOREIGN KEY (project_id) 
        REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_proj_tech_name (technology_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. PROJECT FEATURES TABLE (One-to-Many with projects)
CREATE TABLE IF NOT EXISTS project_features (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    feature_text VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    CONSTRAINT fk_proj_feat_project FOREIGN KEY (project_id) 
        REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_proj_feat_project (project_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS experience (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_role VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    company_url VARCHAR(255),
    location VARCHAR(100) NOT NULL,
    employment_type VARCHAR(50) NOT NULL,
    period VARCHAR(100) NOT NULL,
    is_current BOOLEAN DEFAULT FALSE NOT NULL,
    summary TEXT NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_exp_company (company_name),
    INDEX idx_exp_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. EXPERIENCE HIGHLIGHTS TABLE (One-to-Many with experience)
CREATE TABLE IF NOT EXISTS experience_highlights (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    experience_id BIGINT NOT NULL,
    highlight_text TEXT NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    CONSTRAINT fk_exp_hl_experience FOREIGN KEY (experience_id) 
        REFERENCES experience(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_exp_hl_experience (experience_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    degree VARCHAR(150) NOT NULL,
    field_of_study VARCHAR(150) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    location VARCHAR(100) NOT NULL,
    period VARCHAR(100) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_edu_institution (institution)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    issuer VARCHAR(150) NOT NULL,
    issue_date VARCHAR(50) NOT NULL,
    expiry_date VARCHAR(50),
    credential_id VARCHAR(100),
    credential_url VARCHAR(500) NOT NULL,
    badge_text VARCHAR(100),
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_cert_issuer (issuer)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. CODING PROFILES TABLE
CREATE TABLE IF NOT EXISTS coding_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    profile_url VARCHAR(500) NOT NULL,
    headline VARCHAR(255) NOT NULL,
    rank_or_score VARCHAR(100),
    solved_count VARCHAR(100),
    accent_color VARCHAR(20) NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_cp_platform (platform)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    sender_email VARCHAR(150) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message_body TEXT NOT NULL,
    status ENUM('UNREAD', 'READ', 'RESPONDED', 'ARCHIVED') DEFAULT 'UNREAD' NOT NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_msg_status (status),
    INDEX idx_msg_created_at (created_at),
    INDEX idx_msg_email (sender_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. ARTICLES TABLE (Developer Blog / Technical Architecture Guides)
CREATE TABLE IF NOT EXISTS articles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    read_time VARCHAR(50),
    cover_image VARCHAR(500),
    published BOOLEAN DEFAULT TRUE NOT NULL,
    views_count BIGINT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_articles_slug (slug),
    INDEX idx_articles_published (published),
    INDEX idx_articles_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. ARTICLE TAGS TABLE
CREATE TABLE IF NOT EXISTS article_tags (
    article_id BIGINT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    PRIMARY KEY (article_id, tag),
    CONSTRAINT fk_article_tags_article FOREIGN KEY (article_id)
        REFERENCES articles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_article_tags_tag (tag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. PRIVACY-FRIENDLY ANALYTICS EVENTS TABLE
CREATE TABLE IF NOT EXISTS analytics_events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    resource_identifier VARCHAR(255),
    page_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    INDEX idx_analytics_event_type (event_type),
    INDEX idx_analytics_resource (resource_identifier),
    INDEX idx_analytics_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

