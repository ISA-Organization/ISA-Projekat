package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.annotation.processing.Generated;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
public class RentingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String description;
    @Column
    private String rentingRules;
    @Column
    private String address;
    @Column
    private double price;

    @Column
    private double latitude;
    @Column
    private double longitude;
    @Column
    private String photos;
    @Enumerated(EnumType.STRING)
    private RentingEntityType rentingEntityType;

    @OneToMany(mappedBy = "rentingEntity", fetch = FetchType.EAGER)
    private Set<Reservation> reservations = new HashSet<>();

    @OneToMany(mappedBy = "rentingEntity", fetch = FetchType.EAGER)
    private Set<AdditionalContent> additionalContents = new HashSet<>();

    @OneToMany(mappedBy = "rentingEntity", fetch = FetchType.EAGER)
    private Set<AvailablePeriod> availablePeriods = new HashSet<>();

    @Version
    private  int version;

    public RentingEntity(){}

    public RentingEntity(Long id, String name, String description, String rentingRules, String address,
                         double price, RentingEntityType rentingEntityType) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rentingRules = rentingRules;
        this.address = address;
        this.price = price;
        this.rentingEntityType = rentingEntityType;
        this.reservations = new HashSet<>();
        this.additionalContents = new HashSet<>();
        this.availablePeriods = new HashSet<>();
    }
}
