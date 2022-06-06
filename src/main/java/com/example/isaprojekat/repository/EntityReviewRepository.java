package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.RentingEntityReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntityReviewRepository extends JpaRepository<RentingEntityReview, Long> {
}
