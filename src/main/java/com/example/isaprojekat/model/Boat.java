package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Boat extends RentingEntity {

    private String type;
    private Double length;
    private String engineNumber;
    private Double enginePower;
    private Double maxSpeed;
    @Enumerated(EnumType.STRING)
    private NavigationEquipment navigation;
    private Integer maxNumOfPeople;
    private String fishingEquipment;
    private String cancellationPolicy;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "boat_owner_id")
    public BoatOwner boatOwner;
}
