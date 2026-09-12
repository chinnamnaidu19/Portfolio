package com.portfolio.backend.repository;

import com.portfolio.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findBySlug(String slug);
    boolean existsBySlug(String slug);

    List<Project> findAllByOrderByDisplayOrderAsc();
    List<Project> findByCategoryOrderByDisplayOrderAsc(String category);
    List<Project> findByIsFeaturedTrueOrderByDisplayOrderAsc();

    @Query("SELECT p FROM Project p JOIN p.technologies t WHERE LOWER(t) = LOWER(:tech)")
    List<Project> findByTechnology(@Param("tech") String tech);
}
