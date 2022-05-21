package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Getter
@Setter
public class House extends RentingEntity{


    //TODO: add house images
    @Column
    private Integer numberOfRooms;
    @Column
    private Integer numberOfBeds;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "house_owner_id")
    public HouseOwner houseOwner;

//    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private Set<HouseAvailablePeriod> availablePeriods = new HashSet<>();

//    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL)
//    private List<UnavailablePeriod> unavailablePeriods = new ArrayList<>();


    public House(Long id, String name, String description, String rentingRules, String address, double price,
                 Integer numberOfRooms, Integer numberOfBeds, HouseOwner houseOwner) {
        super( id,  name,  description,  rentingRules,  address, price, RentingEntityType.HOUSE);
        this.numberOfRooms = numberOfRooms;
        this.numberOfBeds = numberOfBeds;
        this.houseOwner = houseOwner;
    }

    public House() {
        super();
    }


}
