package com.example.isaprojekat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpecialOfferDTO {
    private Long id;
    private LocalDate start;
    private LocalDate end;
    private Double specialPrice;
    private Long rentingEntityId;
}
