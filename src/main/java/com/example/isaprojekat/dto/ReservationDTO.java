package com.example.isaprojekat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer numberOfPeople;
    private Double price;
    private Integer numberOfDays;
    private Boolean cancelled;
    private Long entityId;
    private Long clientId;
    private Long ownerId;
}
