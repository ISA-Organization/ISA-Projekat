package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class House extends RentingEntity{


    //TODO: add house images
    private Integer numberOfRooms;
    private Integer numberOfBeds;
    @Column(nullable = true, length = 64)
    private String photos;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "house_owner_id")
    public HouseOwner houseOwner;

    public House(Long id, String name, String description, String rentingRules, String address, double price,
                 Integer numberOfRooms, Integer numberOfBeds, HouseOwner houseOwner, String photos) {
        super( id,  name,  description,  rentingRules,  address, price, RentingEntityType.HOUSE);
        this.numberOfRooms = numberOfRooms;
        this.numberOfBeds = numberOfBeds;
        this.houseOwner = houseOwner;
        this.photos = exteriorImage;
    }

    public House() {
        super();
    }


}
