package com.example.isaprojekat.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Boat extends RentingEntity {


    private String type;
    private Double length;
    private String engineNumber;
    private Double enginePower;
    private Double maxSpeed;
    private NavigationEquipment navigation;


    private String fishingEquipment;
    private String cancellationPolicy;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "boat_owner_id")
    public BoatOwner boatOwner;
}
