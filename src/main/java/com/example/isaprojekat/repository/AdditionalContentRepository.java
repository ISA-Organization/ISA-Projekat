package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.AdditionalContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdditionalContentRepository extends JpaRepository<AdditionalContent, Long> {

    List<AdditionalContent> findAllByRentingEntityId(Long id);
}
