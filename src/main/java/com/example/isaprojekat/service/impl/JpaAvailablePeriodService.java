package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.model.Reservation;
import com.example.isaprojekat.repository.AvailablePeriodRepository;
import com.example.isaprojekat.service.AvailablePeriodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class JpaAvailablePeriodService implements AvailablePeriodService {

    @Autowired
    private AvailablePeriodRepository repository;

    @Override
    public AvailablePeriod save(AvailablePeriod period) {
        return repository.save(period);
    }

    @Override
    public AvailablePeriod delete(Long id) {
        Optional<AvailablePeriod> h = repository.findById(id);
        if(h.isPresent()) {
            repository.deleteById(id);
            return h.get();
        }
        return null;
    }

    @Override
    public AvailablePeriod findOne(Long id) {
        return repository.getById(id);
    }

    @Override
    public List<AvailablePeriod> findAll() {
        return repository.findAll();
    }

    @Override
    public AvailablePeriod addFromCanceledReservation(Reservation reservation) {
        AvailablePeriod period = new AvailablePeriod();

        period.setStart(Date.from(Instant.from(reservation.getStartDate())));
        period.setEnd(Date.from(Instant.from(reservation.getEndDate())));
        period.setRentingEntity(reservation.getRentingEntity());
        period.setSpecialOffer(false);

        return repository.save(period);
    }

    @Override
    public Boolean isPeriodFree(RentingEntity rentingEntity, LocalDate startDate, LocalDate endDate) {
        Timestamp timestampStart = Timestamp.valueOf(startDate.atStartOfDay());
        Timestamp timestampEnd = Timestamp.valueOf(endDate.atStartOfDay());
        for(AvailablePeriod period : rentingEntity.getAvailablePeriods()) {
            if ((period.getStart().toInstant().equals(timestampStart) || period.getStart().toInstant().isBefore(timestampStart.toInstant()))
            && (period.getEnd().toInstant().equals(timestampEnd) || period.getEnd().toInstant().isAfter(timestampEnd.toInstant()))){
                return true;
            }
        }
        return false;
    }
}
