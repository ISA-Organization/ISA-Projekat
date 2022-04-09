package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Adventure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdventureRepository extends JpaRepository<Adventure, Long> {
}
