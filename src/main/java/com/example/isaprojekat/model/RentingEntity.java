package com.example.isaprojekat.model;

import org.hibernate.annotations.Cascade;

import javax.annotation.processing.Generated;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class RentingEntity {

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
    private int maxNumOfPeople;
    @Column
    private String address;
    @Column
    private double price;
    @Column
    private RentingEntityType rentingEntityType;

    @OneToMany(mappedBy = "rentingEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Reservation> reservations = new HashSet<>();
//
//    @OneToMany(mappedBy = "rentingEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private Set<QuickActionReservation> quickActionReservations = new HashSet<>();

    @OneToMany(mappedBy = "rentingEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<AdditionalContent> additionalContents = new HashSet<>();

}
