package com.example.isaprojekat.model;

import java.util.*;

public class House {
    private String name;
    private String address;
    private String description;
    //house images
    private Integer numberOfRooms;
    private Integer numberOfBeds;
    private List<Reservation> possibleReservations = new ArrayList<>(); //slobodni termini
    private String houseRules;
    private Double price;

}
