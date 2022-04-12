package com.example.isaprojekat.model;

import java.util.ArrayList;
import java.util.List;

public class Boat {

    private String name;
    private String type;
    private Double length;
    private String engineNumber;
    private Double enginePower;
    private Double maxSpeed;
    private NavigationEquipment navigation;
    private String address;
    private String description;
    //boat images
    private Integer maxPeople;
    private List<HouseReservation> possibleReservations = new ArrayList<>();
    private String boatingRules;
    private String fishingEquipment;
    private Double price;
    private String cancellationPolicy;

}
