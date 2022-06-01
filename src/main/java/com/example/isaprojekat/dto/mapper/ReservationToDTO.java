package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.ReservationDTO;
import com.example.isaprojekat.model.Reservation;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReservationToDTO {
    public ReservationDTO convert(Reservation r) {
        ReservationDTO dto = new ReservationDTO();

        dto.setId(r.getId());
        dto.setStartDate(r.getStartDate());
        dto.setEndDate(r.getEndDate());
        dto.setNumberOfDays(r.getNumberOfDays());
        dto.setPrice(r.getPrice());
        dto.setNumberOfPeople(r.getNumberOfPeople());
        dto.setClientId(r.getClient().getId());
        dto.setEntityId(r.getRentingEntity().getId());
        dto.setCancelled(r.isCancelled());

        return dto;
    }

    public List<ReservationDTO> convert(List<Reservation> reservations){
        List<ReservationDTO> dtos = new ArrayList<>();

        for(Reservation r : reservations) {
            ReservationDTO dto = convert(r);
            dtos.add(dto);
        }

        return dtos;
    }
}
