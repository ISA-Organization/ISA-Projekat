package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="boatOwners")
@Getter
@Setter
@NoArgsConstructor
public class BoatOwner extends  User{

    @OneToMany(mappedBy = "boatOwner" , cascade = CascadeType.ALL)
    private Set<Boat> boats = new HashSet<>();


    public BoatOwner(Long id, String firstName, String surname, String address, String city, String phoneNumber, String email,
                     String password, Boolean is_approved, Boolean isDeleted) {
        super(id, firstName, surname, address, city, phoneNumber, email, password, is_approved, UserType.BOAT_OWNER, isDeleted);
        this.boats = new HashSet<>();
    }
}
