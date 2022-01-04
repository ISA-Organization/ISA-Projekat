package com.example.isaprojekat.model;

import javax.persistence.*;
import java.lang.ref.PhantomReference;
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
    private List<QuickReservation> quickReservations;
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

    public List<QuickReservation> getQuickReservations() {
        return quickReservations;
    }

    public void setQuickReservations(List<QuickReservation> quickReservations) {
        this.quickReservations = quickReservations;
    }
}
