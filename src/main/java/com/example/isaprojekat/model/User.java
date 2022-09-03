package com.example.isaprojekat.model;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.persistence.InheritanceType.JOINED;
@Inheritance(strategy=JOINED)
@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String firstName;
    @Column
    private String surname;
    @Column
    private String address;
    @Column
    private String city;
    @Column
    private String phoneNumber;
    @Column( unique = true, nullable = false)
    private String email;
    @Column( nullable = false)
    private String password;
    @Column
    private Boolean isApproved;
    @Enumerated(EnumType.STRING)
    private UserType type;
    @Column
    private Boolean isDeleted;

    @Version
    private  int version;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Set<Reservation> reservations = new HashSet<>();

    public User(Long id, String firstname, String surname, String address, String city, String phoneNumber,
                String email, String password, Boolean isApproved, UserType userType, Boolean isDeleted) {
        this.id = id;
        this.firstName = firstname;
        this.surname = surname;
        this.address = address;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.isApproved = isApproved;
        this.type = userType;
        this.isDeleted = isDeleted;
    }

    public User() {

    }
}
