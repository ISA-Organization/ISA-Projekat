package com.example.isaprojekat.model;

import javax.persistence.*;
import java.util.List;
@Entity
@Table(name = "houseOwners")
public class HouseOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<House> houseList;
    @OneToMany(mappedBy = "houseOwner", cascade = CascadeType.ALL)
    private List<QuickHouseReservation> reservations;

    public HouseOwner(){}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<House> getHouseList() {
        return houseList;
    }

    public void setHouseList(List<House> houseList) {
        this.houseList = houseList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<QuickHouseReservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<QuickHouseReservation> reservations) {
        this.reservations = reservations;
    }
}
