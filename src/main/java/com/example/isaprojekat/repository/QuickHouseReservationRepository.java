package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.QuickHouseReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuickHouseReservationRepository extends JpaRepository<QuickHouseReservation, Long> {
    Optional<QuickHouseReservation> findByHouseOwnerId(Long id);
}
