package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Client;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.model.Reservation;
import com.example.isaprojekat.model.User;
import com.example.isaprojekat.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.isaprojekat.repository.ReservationRepository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.chrono.ChronoLocalDate;
import java.time.chrono.ChronoLocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static java.time.temporal.TemporalAdjusters.firstDayOfYear;
import static java.time.temporal.TemporalAdjusters.lastDayOfYear;

@Service
public class JpaReservationService implements ReservationService{

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private AvailablePeriodService availablePeriodService;

    @Override
    public Optional<Reservation> findOne(Long id) {
        return reservationRepository.findById(id);
    }

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    public Reservation save(Reservation reservation) {
        if(isPeriodFree(reservation.getRentingEntity(), reservation.getStartDate(), reservation.getEndDate())){
            return reservationRepository.save(reservation);
        }
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        reservationRepository.deleteById(id);
        return true;
    }

    @Override
    public Boolean cancel(Long id) {
        Reservation reservation = reservationRepository.getById(id);
        if(LocalDateTime.now().plusDays(3).toLocalDate().isBefore(reservation.getStartDate())){
            //availablePeriodService.addFromCanceledReservation(reservation);
            reservation.setCancelled(true);
            reservationRepository.save(reservation);
            return true;
        }

        return false;
    }

    @Override
    public List<Reservation> getMyUpcomingReservationsOwner(Long id) {

        List<Reservation> reservations = reservationRepository.findAllByOwnerId(id);
        reservations.removeIf(res -> res.getStartDate().isBefore(ChronoLocalDate.from(LocalDateTime.now())));
        return reservations;
    }

    @Override
    public List<Reservation> findAllInDateRange(LocalDate start, LocalDate end) {

        List<Reservation> reservations = reservationRepository.findAll();
        List<Reservation> res = new ArrayList<>();

        for(Reservation r : reservations){
            if(r.getStartDate().isAfter(start) && r.getStartDate().isBefore(end) && r.getEndDate().isAfter(start)
               && r.getEndDate().isBefore(end)){
                res.add(r);
            }
        }
        return res;
    }

    @Override
    public List<Reservation> findAllInProgressByClientId(Long id) {
        List<Reservation> res = reservationRepository.findAllByClientId(id);
        List<Reservation> reservations = new ArrayList<>();
        for(Reservation r : res){
            if(LocalDate.now().isBefore(r.getEndDate()) && LocalDate.now().isAfter(r.getStartDate())){
                reservations.add(r);
            }
        }
        return reservations;
    }

    @Override
    public List<Reservation> getMyReservationsClient(Long id) {
        List<Reservation> reservations = reservationRepository.findAllByClientId(id);
        reservations.removeIf(res -> res.getEndDate().isAfter(ChronoLocalDate.from(LocalDateTime.now())));
        return reservations;
    }

    @Override
    public List<Reservation> getMyUpcomingReservations() {
        var loggedInUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Client client = clientService.findByEmail(loggedInUser).get();
        List<Reservation> reservations = reservationRepository.findAllByClient(client);
        reservations.removeIf(res -> res.isCancelled());
        reservations.removeIf(res -> res.getStartDate().isBefore(ChronoLocalDate.from(LocalDateTime.now())));
        return reservations;
    }

    @Override
    public List<Reservation> findAllByEntityId(Long id) {
        return reservationRepository.findAllByRentingEntityId(id);
    }

    @Override
    public List<Reservation> findAllByOwnerId(Long id) {
        return reservationRepository.findAllByOwnerId(id);
    }

    @Override
    public List<Reservation> findAllUpcomingByEntityId(Long id) {
        List<Reservation> list = reservationRepository.findAllByRentingEntityId(id);
        list.removeIf(res -> res.getStartDate().isBefore(ChronoLocalDate.from(LocalDateTime.now())));
        return list;
    }

    @Override
    public List<Reservation> findAllForLastWeek(Long ownerId) {

        final ZonedDateTime input = ZonedDateTime.now();
        final ZonedDateTime startOfLastWeek = input.minusWeeks(1).with(DayOfWeek.MONDAY);
        final ZonedDateTime endOfLastWeek = startOfLastWeek.plusDays(6);

        LocalDate start = startOfLastWeek.toLocalDate();
        LocalDate end = endOfLastWeek.toLocalDate();

        List<Reservation> reservations = reservationRepository.findAllByOwnerId(ownerId);
        List<Reservation> res = new ArrayList<>();

        for(Reservation r : reservations){
            if((r.getStartDate().isAfter(start) && r.getStartDate().isBefore(end)) || r.getStartDate().equals(start)
            || r.getStartDate().equals(end)){
                res.add(r);
            }
        }
        return res;
    }

    @Override
    public List<Reservation> findAllForThisYear(Long ownerId) {
        LocalDate now = LocalDate.now();
        LocalDate firstDay = now.with(firstDayOfYear());
        LocalDate lastDay = now.with(lastDayOfYear());

        List<Reservation> reservations = reservationRepository.findAllByOwnerId(ownerId);
        List<Reservation> res = new ArrayList<>();

        for(Reservation r : reservations){
            if((r.getStartDate().isAfter(firstDay) && r.getStartDate().isBefore(lastDay)) || r.getStartDate().equals(firstDay)
                    || r.getStartDate().equals(lastDay)){
                res.add(r);
            }
        }
        return res;
    }

    @Override
    public List<Reservation> findAllForLastYears(Long ownerId) {
        LocalDate firstDay = LocalDate.of(2020, 1, 1);
        LocalDate lastDay = LocalDate.of(2022, 12, 1);
        List<Reservation> reservations = reservationRepository.findAllByOwnerId(ownerId);
        List<Reservation> res = new ArrayList<>();

        for(Reservation r : reservations){
            if((r.getStartDate().isAfter(firstDay) && r.getStartDate().isBefore(lastDay)) || r.getStartDate().equals(firstDay)
                    || r.getStartDate().equals(lastDay)){
                res.add(r);
            }
        }
        return res;
    }

    private Boolean isPeriodFree(RentingEntity entity, LocalDate start, LocalDate end){
        //if(availablePeriodService.isPeriodFree(entity, start, end)){
            List<Reservation> reservations = reservationRepository.findAllByRentingEntityId(entity.getId());
            for(Reservation reservation : reservations){

                if(reservation.isCancelled()) {
                    continue;
                }

                if(start.isAfter(reservation.getStartDate()) && start.isBefore(reservation.getEndDate())){
                    return false;
                }
                if(end.isAfter(reservation.getStartDate()) && end.isBefore(reservation.getEndDate())){
                    return false;
                }
                if(start.isEqual(reservation.getStartDate()) || end.isEqual(reservation.getEndDate())){
                    return false;
                }
                if(start.isBefore(reservation.getStartDate()) && end.isAfter(reservation.getEndDate())){
                    return false;
                }
            }
            return true;
        //}
        //return false;
    }

}