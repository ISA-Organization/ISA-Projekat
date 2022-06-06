package com.example.isaprojekat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LoyaltyProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private double pointsForBronze;
    @Column
    private double percentForBronze;
    @Column
    private double pointsForSilver;
    @Column
    private double percentForSilver;
    @Column
    private double pointsForGold;
    @Column
    private double percentForGold;
    @Column
    private double pointsForUser;
    @Column
    private double pointsForOwner;
    @Column
    private double percentageForApp;
}
