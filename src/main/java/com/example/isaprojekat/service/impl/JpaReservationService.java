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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.time.chrono.ChronoLocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        if(LocalDateTime.now().plusDays(3).isBefore(ChronoLocalDateTime.from(reservation.getStartDate()))){
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
    public List<Reservation> getMyUpcomingReservations() {
        var loggedInUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Client client = clientService.findByEmail(loggedInUser).get();
        List<Reservation> reservations = reservationRepository.findAllByClient(client);
        reservations.removeIf(res -> res.getStartDate().isBefore(ChronoLocalDate.from(LocalDateTime.now())));
        return reservations;
    }

    @Override
    public List<Reservation> findAllByEntityId(Long id) {
        return reservationRepository.findAllByRentingEntityId(id);
    }

    @Override
    public List<Reservation> findAllUpcomingByEntityId(Long id) {
        List<Reservation> list = reservationRepository.findAllByRentingEntityId(id);
        list.removeIf(res -> res.getStartDate().isBefore(ChronoLocalDate.from(LocalDateTime.now())));
        return list;
    }

    private Boolean isPeriodFree(RentingEntity entity, LocalDate start, LocalDate end){
        if(availablePeriodService.isPeriodFree(entity, start, end)){
            List<Reservation> reservations = reservationRepository.findAllByRentingEntityId(entity.getId());
            for(Reservation reservation : reservations){

                if(reservation.isCancelled()) {
                    continue;
                }

                if ((start.isAfter(reservation.getStartDate()) && start.isBefore(reservation.getEndDate())) ||
                        (end.isAfter(reservation.getStartDate()) && end.isBefore(reservation.getEndDate()))){
                    return false;
                }

                if(start.isBefore(reservation.getStartDate()) && end.isAfter(reservation.getEndDate())){
                    return false;
                }
            }
            return true;
        }
        return false;
    }

}