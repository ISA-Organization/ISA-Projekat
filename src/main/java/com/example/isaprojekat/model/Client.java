package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "clients")
@Getter
@Setter
@NoArgsConstructor
public class Client extends  User{

    @Column
    private int penaltyNum;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private Set<Reservation> reservations = new HashSet<>();


    public Client(Long id, String firstName, String surname, String address, String city, String phoneNumber, String email, String password,
                  Boolean is_approved, Boolean isDeleted, int penaltyNum) {
        super(id, firstName, surname, address, city, phoneNumber, email, password, is_approved, UserType.CLIENT, isDeleted);
        this.reservations = new HashSet<>();
        this.penaltyNum = penaltyNum;
    }
}
