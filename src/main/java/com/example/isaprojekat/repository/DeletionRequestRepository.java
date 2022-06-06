package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.DeletionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletionRequestRepository extends JpaRepository<DeletionRequest, Long> {
}
