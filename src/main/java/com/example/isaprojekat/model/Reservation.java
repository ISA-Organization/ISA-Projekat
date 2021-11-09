package com.example.isaprojekat.model;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

public class Reservation {
    private Long id;
    private LocalDateTime start;
    private LocalDateTime end;
    private Period duration;
    private Integer maxPeople;
    private List<String> additionalFacilities = new ArrayList<>();
    private Double price;
    private String place; //kad instruktor zakazuje avanturu
    private List<SpecialOffer> offerList = new ArrayList<>();

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

    public Period getDuration() {
        return duration;
    }

    public void setDuration(Period duration) {
        this.duration = duration;
    }

    public Integer getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(Integer maxPeople) {
        this.maxPeople = maxPeople;
    }

    public List<String> getAdditionalFacilities() {
        return additionalFacilities;
    }

    public void setAdditionalFacilities(List<String> additionalFacilities) {
        this.additionalFacilities = additionalFacilities;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
