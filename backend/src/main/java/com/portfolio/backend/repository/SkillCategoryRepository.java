package com.portfolio.backend.repository;

import com.portfolio.backend.entity.SkillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillCategoryRepository extends JpaRepository<SkillCategory, Long> {
    Optional<SkillCategory> findByName(String name);
    boolean existsByName(String name);

    @Query("SELECT sc FROM SkillCategory sc LEFT JOIN FETCH sc.skills s ORDER BY sc.displayOrder ASC, s.displayOrder ASC")
    List<SkillCategory> findAllWithSkillsOrdered();
}
