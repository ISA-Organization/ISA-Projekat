package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.ReservationDTO;
import com.example.isaprojekat.model.Client;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.Reservation;
import com.example.isaprojekat.service.ClientService;
import com.example.isaprojekat.service.RentingEntityService;
import com.example.isaprojekat.service.ReservationService;
import com.example.isaprojekat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DTOToReservation {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private UserService userService;

    @Autowired
    private RentingEntityService rentingEntityService;

    public Reservation convert(ReservationDTO dto){
        Reservation reservation = null;
        if (dto.getId() != null){
            reservation = reservationService.findOne(dto.getId()).get();
        }

        if(reservation == null) {
            reservation = new Reservation();
        }

        reservation.setStartDate(dto.getStartDate());
        reservation.setEndDate(dto.getEndDate());
        reservation.setNumberOfDays(dto.getNumberOfDays());
        reservation.setNumberOfPeople(dto.getNumberOfPeople());
        reservation.setCancelled(dto.getCancelled());
        reservation.setPrice(dto.getPrice());
        reservation.setClient(clientService.findOne(dto.getClientId()).get());
        reservation.setRentingEntity(rentingEntityService.findOne(dto.getEntityId()).get());
        reservation.setOwner(userService.findOne(dto.getOwnerId()).get());

        return reservation;
    }


}
