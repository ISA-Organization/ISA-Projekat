package com.example.isaprojekat.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="boatOwners")
@Getter
@Setter
public class BoatOwner extends  User{

    @OneToMany(mappedBy = "boatOwner" , fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Boat> boats = new HashSet<>();


}
