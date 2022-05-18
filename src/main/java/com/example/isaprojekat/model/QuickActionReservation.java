package com.example.isaprojekat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "reservation_actions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuickActionReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate startTime;
    @Column
    private LocalDate endTime;
    @Column
    private int numberOfDays;
    @Column
    private double price;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable( name = "reservation_actions_additional_content",
                joinColumns = { @JoinColumn(name = "quick_action_reservation_id")},
                inverseJoinColumns = {@JoinColumn(name = "additional_content_id")})
    private Set<AdditionalContent> additionalContents = new HashSet<>();


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "renting_entity_id")
    private RentingEntity rentingEntity;



}
