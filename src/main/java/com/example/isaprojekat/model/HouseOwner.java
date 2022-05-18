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
@AllArgsConstructor
@NoArgsConstructor

public class HouseOwner extends User {

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<House> houseList;
    @OneToMany(mappedBy = "houseOwner", cascade = CascadeType.ALL)
    private Set<Reservation> reservations = new HashSet<>();


}
