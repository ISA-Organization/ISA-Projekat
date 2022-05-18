package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "clients")
@Getter
@Setter
@NoArgsConstructor
public class Client extends  User{


    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private Set<Reservation> reservations = new HashSet<>();


    public Client(Long id, String firstName, String surname, String address, String city, String phoneNumber, String email, String password, Boolean is_approved) {
        super(id, firstName, surname, address, city, phoneNumber, email, password, is_approved, UserType.CLIENT);
        this.reservations = new HashSet<>();
    }
}
