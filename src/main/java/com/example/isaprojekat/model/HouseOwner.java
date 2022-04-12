package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "houseOwners")
@Getter
@Setter
public class HouseOwner extends User {

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<House> houseList;
    @OneToMany(mappedBy = "houseOwner", cascade = CascadeType.ALL)
    private List<QuickHouseReservation> reservations;

    public HouseOwner(){
        super();
    }

    public HouseOwner(Long id, String name, String surname, String address, String city, String phoneNumber,
                      String email, String password, Boolean isApproved) {
        super(id, name, surname, address, city, phoneNumber, email, password, isApproved, UserType.HOUSE_OWNER);
        this.houseList = new ArrayList<House>();
        this.reservations =  new ArrayList<QuickHouseReservation>();
    }
}
