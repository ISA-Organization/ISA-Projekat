package com.example.isaprojekat.model;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
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
    @Enumerated(EnumType.STRING)
    private UserType type;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Client> clientList;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<HouseOwner> houseOwnerList;

    public User(Long id, String name, String surname, String address, String city, String phoneNumber,
                String email, String password, UserType type) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public UserType getType() {
        return type;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setType(UserType type) {
        this.type = type;
    }
}
