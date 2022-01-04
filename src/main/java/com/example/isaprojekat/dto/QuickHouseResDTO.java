package com.example.isaprojekat.dto;

public class QuickHouseResDTO {

    private Long id;
    private String start;
    private String end;
    private Integer maxPeople;
    private Double price;
    private Boolean booked;
    private Long houseId;
    private Long clientId;
    private Long houseOwnerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public Integer getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(Integer maxPeople) {
        this.maxPeople = maxPeople;
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

    public Long getHouseId() {
        return houseId;
    }

    public void setHouseId(Long houseId) {
        this.houseId = houseId;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getHouseOwnerId() {
        return houseOwnerId;
    }

    public void setHouseOwnerId(Long houseOwnerId) {
        this.houseOwnerId = houseOwnerId;
    }
}
