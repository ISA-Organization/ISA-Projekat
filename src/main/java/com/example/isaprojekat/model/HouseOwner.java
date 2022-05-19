package com.example.isaprojekat.model;

import lombok.AllArgsConstructor;
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
    private List<House> houseList;



    public HouseOwner(Long id, String firstName, String surname, String address, String city, String phoneNumber, String email, String password, Boolean is_approved) {
        super(id, firstName, surname, address, city, phoneNumber, email, password, is_approved, UserType.INSTRUCTOR);
        this.houseList = new ArrayList<>();
    }
}
