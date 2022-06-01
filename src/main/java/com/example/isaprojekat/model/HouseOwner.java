package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "houseOwners")
@Getter
@Setter
@NoArgsConstructor
public class HouseOwner extends User {

    @OneToMany(mappedBy = "houseOwner", cascade = CascadeType.ALL)
    private Set<House> houses = new HashSet<>();

    public HouseOwner(Long id, String firstname, String surname, String address, String city, String phoneNumber,
                      String email, String password, Boolean isApproved) {
        super(id, firstname, surname, address, city, phoneNumber, email, password, isApproved, UserType.HOUSE_OWNER);
        this.houses = new HashSet<>();
    }
}
