package com.example.isaprojekat.dto;

import com.example.isaprojekat.model.NavigationEquipment;
import com.example.isaprojekat.model.RentingEntityType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoatDTO {

    private Long id;
    private String name;
    private String description;
    private String rentingRules;
    private String address;
    private Double price;
    private String rentingEntityType;

    private String type;
    private Double length;
    private String engineNumber;
    private Double enginePower;
    private Double maxSpeed;
    private String navigation;
    private Integer maxNumOfPeople;
    private String fishingEquipment;
    private String cancellationPolicy;
    private Long boatOwnerId;
}
