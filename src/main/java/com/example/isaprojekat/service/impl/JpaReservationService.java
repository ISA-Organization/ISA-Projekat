package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Reservation;
import com.example.isaprojekat.repository.ReservationRepository;
import com.example.isaprojekat.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class JpaReservationService implements ReservationService{

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public Optional<Reservation> findOne(Long id) {
        return reservationRepository.findById(id);
    }

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation save(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public Boolean delete(Long id) {
        reservationRepository.deleteById(id);
        return true;
    }
}