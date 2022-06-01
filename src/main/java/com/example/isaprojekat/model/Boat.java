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

    public Boat(){
        super();
    }

    public Boat(Long id, String name, String description, String rentingRules, String address, double price,
                RentingEntityType rentingEntityType, String type, Double length, String engineNumber,
                Double enginePower, Double maxSpeed, NavigationEquipment navigation, Integer maxNumOfPeople,
                String fishingEquipment, String cancellationPolicy, BoatOwner boatOwner) {

        super(id, name, description, rentingRules, address, price, rentingEntityType);
        this.type = type;
        this.length = length;
        this.engineNumber = engineNumber;
        this.enginePower = enginePower;
        this.maxSpeed = maxSpeed;
        this.navigation = navigation;
        this.maxNumOfPeople = maxNumOfPeople;
        this.fishingEquipment = fishingEquipment;
        this.cancellationPolicy = cancellationPolicy;
        this.boatOwner = boatOwner;
    }
}
