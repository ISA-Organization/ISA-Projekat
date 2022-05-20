package com.example.isaprojekat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;
@Entity
@Getter
@Setter
public class House extends RentingEntity{


    //TODO: add house images
    private Integer numberOfRooms;
    private Integer numberOfBeds;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "house_owner_id")
    public HouseOwner houseOwner;

//    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private Set<HouseAvailablePeriod> availablePeriods = new HashSet<>();

//    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL)
//    private List<UnavailablePeriod> unavailablePeriods = new ArrayList<>();

    public House(){}

    public House(Integer numberOfRooms, Integer numberOfBeds, HouseOwner houseOwner) {
        this.numberOfRooms = numberOfRooms;
        this.numberOfBeds = numberOfBeds;
        this.houseOwner = houseOwner;
    }
}
