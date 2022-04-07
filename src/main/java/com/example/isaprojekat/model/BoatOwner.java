package com.example.isaprojekat.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="boatOwners")
@Getter
@Setter
public class BoatOwner extends  User{
    public BoatOwner(Long id, String firstname, String surname, String address, String city, String phoneNumber,
                     String email, String password, Boolean isApproved) {
        super(id, firstname, surname, address, city, phoneNumber, email, password, isApproved, UserType.BOAT_OWNER);
    }

    public BoatOwner() {
        super();
    }
}
