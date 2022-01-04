package com.example.isaprojekat.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class AdditionalContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private Double price;
    @ManyToMany(mappedBy = "content")
    private List<QuickReservation> reservations;
    @ManyToMany(mappedBy = "houseContent")
    private List<House> houses;

    public AdditionalContent(){

    }
    public AdditionalContent(String name, Double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<QuickReservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<QuickReservation> reservations) {
        this.reservations = reservations;
    }
}
