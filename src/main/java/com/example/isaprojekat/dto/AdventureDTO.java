package com.example.isaprojekat.dto;

import com.example.isaprojekat.model.Instructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Base64;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdventureDTO {
    private Long id;
    private String name;
    private String address;
    private String description;
    private Long instructorId;
    private Integer maxNumberOfPeople;
    private String rules;
    private String fishingEquipment;
    private Double price;
    private String cancellationPolicy;
    private String type;
    private Double latitude;
    private Double longitude;
    public List<String> pictures;
}
