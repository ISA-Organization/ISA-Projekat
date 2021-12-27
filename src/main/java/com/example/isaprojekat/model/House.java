package com.example.isaprojekat.model;

import javax.persistence.*;
import java.util.*;
@Entity
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String address;
    @Column
    private String description;
    //house images
    @Column
    private Integer numberOfRooms;
    @Column
    private Integer numberOfBeds;
    //
    @Column
    private String houseRules;
    @Column
    private Double price;
    @Column
    private String additionalContent;
    @ManyToOne
    private User owner;
    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL)
    private List<QuickReservation> quickReservations = new ArrayList<>(); //slobodni termini

    public House(){

    }

    public House(Long id, String name, String address, String description, Integer numberOfRooms, Integer numberOfBeds, String houseRules, Double price, String additionalContent) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.description = description;
        this.numberOfRooms = numberOfRooms;
        this.numberOfBeds = numberOfBeds;
        this.houseRules = houseRules;
        this.price = price;
        this.additionalContent = additionalContent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(Integer numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    public Integer getNumberOfBeds() {
        return numberOfBeds;
    }

    public void setNumberOfBeds(Integer numberOfBeds) {
        this.numberOfBeds = numberOfBeds;
    }

    public String getHouseRules() {
        return houseRules;
    }

    public void setHouseRules(String houseRules) {
        this.houseRules = houseRules;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getAdditionalContent() {
        return additionalContent;
    }

    public void setAdditionalContent(String additionalContent) {
        this.additionalContent = additionalContent;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<QuickReservation> getQuickReservations() {
        return quickReservations;
    }

    public void setQuickReservations(List<QuickReservation> quickReservations) {
        this.quickReservations = quickReservations;
    }
}
