package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}
