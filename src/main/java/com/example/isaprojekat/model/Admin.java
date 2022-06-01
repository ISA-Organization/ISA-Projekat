package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="admins")
@Getter
@Setter
public class Admin extends User{

    @Column
    private boolean isSuperOwner;

    public Admin(Long id, String name, String surname, String address, String city, String phoneNumber,
                 String email, String password, Boolean isApproved, boolean isSuperOwner) {
        super(id, name, surname, address, city, phoneNumber, email, password, isApproved, UserType.ADMIN);
    }



    public Admin() {
        super();
    }
}
