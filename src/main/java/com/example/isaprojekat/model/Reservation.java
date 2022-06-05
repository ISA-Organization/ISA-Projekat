package com.example.isaprojekat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private LocalDate startDate;
    @Column
    private LocalDate endDate;
    @Column
    private int numberOfPeople;
    @Column
    private double price;
    @Column
    private int numberOfDays;
    @Column
    private boolean cancelled;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "renting_entity_id")
    private RentingEntity rentingEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
                name= "reservation_additional_content",
                joinColumns = {@JoinColumn(name = "reservation_id")},
                inverseJoinColumns = {@JoinColumn(name = "addtional_content_id")})
    private Set<AdditionalContent> additionalContents = new HashSet<>();

}
