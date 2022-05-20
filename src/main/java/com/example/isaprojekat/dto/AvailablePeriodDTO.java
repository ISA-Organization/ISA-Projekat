package com.example.isaprojekat.dto;

import com.example.isaprojekat.model.House;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.ManyToOne;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvailablePeriodDTO {
    private Long id;
    private Date start;
    private Date end;
    private Double specialPrice;
    private Boolean isSpecialOffer;
    private Long rentingEntityId;
    private String rentingEntityType;
}
