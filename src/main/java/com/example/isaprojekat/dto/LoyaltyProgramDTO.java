package com.example.isaprojekat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoyaltyProgramDTO {
    private Long id;
    private double pointsForBronze;
    private double percentForBronze;
    private double pointsForSilver;
    private double percentForSilver;
    private double pointsForGold;
    private double percentForGold;
    private double pointsForUser;
    private double pointsForOwner;
    private double percentageForApp;
}
