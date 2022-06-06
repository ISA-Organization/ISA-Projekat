package com.example.isaprojekat.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HouseDTO {

    private Long id;
    private String name;
    private String description;
    private String rules;
    private String address;
    private Double price;
    private String type;
    private Integer numberOfRooms;
    private Integer numberOfBeds;
    private Long houseOwnerId;
    public List<String> pictures;
    private Double latitude;
    private Double longitude;

}
