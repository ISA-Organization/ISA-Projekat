package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.Reservation;
import com.example.isaprojekat.model.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservationService {
    Optional<Reservation> findOne(Long id);

    List<Reservation> findAll();

    Reservation save(Reservation reservation);

    Boolean delete(Long id);

    Boolean cancel(Long id);

    List<Reservation> getMyUpcomingReservationsOwner(Long id);

    List<Reservation> getMyUpcomingReservations();

    List<Reservation> findAllByEntityId(Long id);

    List<Reservation> findAllUpcomingByEntityId(Long id);

    List<Reservation> findAllInDateRange(LocalDate start, LocalDate end);
}
