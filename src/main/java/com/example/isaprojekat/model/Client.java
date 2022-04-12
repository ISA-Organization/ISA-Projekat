package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "clients")
@Getter
@Setter
public class Client extends  User{


    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<HouseReservation> quickHouseReservations;

    public Client(Long id, String name, String surname, String address, String city, String phoneNumber,
                  String email, String password, Boolean isApproved) {
        super(id, name, surname, address, city, phoneNumber, email, password, isApproved, UserType.CLIENT);
        this.quickHouseReservations = new ArrayList<HouseReservation>();
    }

    public Client(){
    super();

    }

}
