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
public class Adventure extends RentingEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instructor_id")
    public Instructor instructor;
    @Column
    private String fishingEquipment;
    @Column
    private String cancellationPolicy;
    @Column
    private int maxNumberOfPeople;


}
