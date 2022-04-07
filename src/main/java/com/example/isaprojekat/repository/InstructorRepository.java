package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
}
