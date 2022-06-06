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
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class JpaAvailablePeriodService implements AvailablePeriodService {

    @Autowired
    private AvailablePeriodRepository repository;

    @Override
    public AvailablePeriod save(AvailablePeriod period) {
        if(isPeriodFree(period.getRentingEntity(), period.getStart().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), period.getEnd().toInstant().atZone(ZoneId.systemDefault()).toLocalDate())){
            return repository.save(period);
        }
        return null;
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

                splitReservationPeriod(period, startDate, endDate);

                return false;
            }
        }
        return true;
    }

    public void splitReservationPeriod(AvailablePeriod period, LocalDate start, LocalDate end){
        Timestamp timestampStart = Timestamp.valueOf(start.atStartOfDay());
        Timestamp timestampEnd = Timestamp.valueOf(end.atStartOfDay());
        if(period.getStart().toInstant().equals(timestampStart) && period.getEnd().toInstant().equals(timestampEnd)){

            repository.delete(period);

        }else if(period.getStart().toInstant().equals(timestampStart) && period.getEnd().toInstant().isAfter(timestampEnd.toInstant())){

            period.setStart(java.sql.Date.valueOf(end));
            repository.save(period);

        }else if(period.getStart().toInstant().isBefore(timestampStart.toInstant()) && period.getEnd().toInstant().equals(timestampEnd)){
            period.setEnd(java.sql.Date.valueOf(start));
        }else if(period.getStart().toInstant().isBefore(timestampStart.toInstant()) && period.getEnd().toInstant().isAfter(timestampEnd.toInstant())){

            repository.delete(period);

            AvailablePeriod period2 = new AvailablePeriod();
            period2.setStart(period.getStart());
            period2.setEnd(java.sql.Date.valueOf(start));
            period2.setRentingEntity(period.getRentingEntity());
            period2.setSpecialOffer(period.isSpecialOffer());
            period2.setSpecialPrice(period.getSpecialPrice());
            repository.save(period2);

            AvailablePeriod period1 = new AvailablePeriod();
            period1.setStart(java.sql.Date.valueOf(end));
            period1.setEnd(period.getEnd());
            period1.setRentingEntity(period.getRentingEntity());
            period1.setSpecialOffer(period.isSpecialOffer());
            period1.setSpecialPrice(period.getSpecialPrice());
            repository.save(period1);
        }
    }
}
