package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.model.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface AvailablePeriodService {

    AvailablePeriod save(AvailablePeriod period);
    AvailablePeriod delete(Long id);
    AvailablePeriod findOne(Long id);
    List<AvailablePeriod> findAll();
    AvailablePeriod addFromCanceledReservation(Reservation reservation);
    Boolean isPeriodFree(RentingEntity rentingEntity, LocalDate startDate, LocalDate endDate);

}
