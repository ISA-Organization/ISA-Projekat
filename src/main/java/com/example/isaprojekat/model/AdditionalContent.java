package com.example.isaprojekat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdditionalContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private Double price;
    @ManyToMany(mappedBy = "additionalContents", fetch = FetchType.EAGER)
    private Set<Reservation> reservations = new HashSet<>();
    @ManyToMany(mappedBy = "additionalContents", fetch = FetchType.EAGER)
    private Set<QuickActionReservation> quickActionReservations = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rentingEntity_id")
    private RentingEntity rentingEntity;

}
