package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "available_periods")
public class AvailablePeriod {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    private Date start;
    private Date end;
    private double specialPrice;
    private boolean isSpecialOffer;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "renting_entity_id")
    private RentingEntity rentingEntity;
}
