package com.example.isaprojekat.dto;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.HouseOwner;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HouseDTO {

    private Long id;
    private String name;
    private String address;
    private String description;
    private HouseOwner houseOwner;
    private Integer numberOfRooms;
    private Integer numberOfBeds;
    private String rules;
    private Double price;

}
