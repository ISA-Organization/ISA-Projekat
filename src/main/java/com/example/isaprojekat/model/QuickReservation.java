package com.example.isaprojekat.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
@Entity
public class QuickReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private LocalDateTime start;
    @Column
    private LocalDateTime end;
    @Column
    private LocalDateTime saleLastDay;
    @Column
    private Integer maxPeople;
    @Column
    private String additionalContent;
    @Column
    private Double price;
    //private String place; //kad instruktor zakazuje avanturu
    //private List<SpecialOffer> offerList = new ArrayList<>();
    @Column
    private Boolean booked;

    @ManyToOne
    private House house;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public LocalDateTime getSaleLastDay() {
        return saleLastDay;
    }

    public void setSaleLastDay(LocalDateTime saleLastDay) {
        this.saleLastDay = saleLastDay;
    }

    public Integer getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(Integer maxPeople) {
        this.maxPeople = maxPeople;
    }

    public String getAdditionalContent() {
        return additionalContent;
    }

    public void setAdditionalContent(String additionalContent) {
        this.additionalContent = additionalContent;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getBooked() {
        return booked;
    }

    public void setBooked(Boolean booked) {
        this.booked = booked;
    }
}
