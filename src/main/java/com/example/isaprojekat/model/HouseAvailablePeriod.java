package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "house_available_periods")
public class HouseAvailablePeriod {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    private Date start;
    private Date end;
    private double specialPrice;
    private boolean isSpecialOffer;
    @ManyToOne
    private House house;
}
