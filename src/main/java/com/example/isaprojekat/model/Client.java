package com.example.isaprojekat.model;

import javax.persistence.*;
import java.util.List;
@Entity
@Table(name = "clients")
public class Client{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<QuickHouseReservation> quickHouseReservations;
//    private Double points;
//    private String benefits;
//    private Integer numberOfPenalties;


    public Client(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<QuickHouseReservation> getQuickReservations() {
        return quickHouseReservations;
    }

    public void setQuickReservations(List<QuickHouseReservation> quickHouseReservations) {
        this.quickHouseReservations = quickHouseReservations;
    }
}
