package com.example.isaprojekat.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private Double latitude;
    private Double longitude;

}
