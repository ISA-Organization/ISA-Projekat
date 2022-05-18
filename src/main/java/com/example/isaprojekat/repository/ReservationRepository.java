package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
