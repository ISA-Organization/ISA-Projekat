package com.example.isaprojekat.model;

import java.util.ArrayList;
import java.util.List;

public class Adventure {
    private String name;
    private String address;
    private String description;
    private Instructor instructor;
    //images
    private Integer maxPeople;
    private List<Reservation> possibleReservations = new ArrayList<>();
    private String rules;
    private String fishingEquipment;
    private Double price;
    private String cancellationPolicy;


}
