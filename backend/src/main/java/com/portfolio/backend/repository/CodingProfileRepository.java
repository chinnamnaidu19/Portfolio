package com.portfolio.backend.repository;

import com.portfolio.backend.entity.CodingProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodingProfileRepository extends JpaRepository<CodingProfile, Long> {
    Optional<CodingProfile> findByPlatform(String platform);
    List<CodingProfile> findAllByOrderByDisplayOrderAsc();
}
