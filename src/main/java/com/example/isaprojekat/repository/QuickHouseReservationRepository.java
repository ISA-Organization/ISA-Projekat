package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.HouseReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuickHouseReservationRepository extends JpaRepository<HouseReservation, Long> {
    Optional<HouseReservation> findByHouseOwnerId(Long id);
}
