package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class RentingEntityReview {


    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    private String content;
    private Long ownerId;
    @OneToOne
    private Reservation reservation;
    private boolean isBadComment;

    public RentingEntityReview(Long id, String content, Long ownerId, Reservation reservation, boolean isBadComment) {
        this.id = id;
        this.content = content;
        this.ownerId = ownerId;
        this.reservation = reservation;
        this.isBadComment = isBadComment;
    }

    public RentingEntityReview(){}
}
