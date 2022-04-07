package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name="adventures")
@Getter
@Setter
public class Adventure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String address;
    @Column
    private String description;
    @ManyToOne
    private Instructor instructor;
    @Column
    private Integer maxPeople;
    //private List<QuickHouseReservation> possibleReservations = new ArrayList<>();
    @Column
    private String rules;
    @Column
    private String fishingEquipment;
    @Column
    private Double price;
    @Column
    private String cancellationPolicy;

    public Adventure(Long id, String name, String address, String description, Instructor instructor,
                     Integer maxPeople, String rules, String fishingEquipment, Double price, String cancellationPolicy) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.description = description;
        this.instructor = instructor;
        this.maxPeople = maxPeople;
        this.rules = rules;
        this.fishingEquipment = fishingEquipment;
        this.price = price;
        this.cancellationPolicy = cancellationPolicy;
    }
    public Adventure(){

    }
}
