package com.example.isaprojekat.dto;

import com.example.isaprojekat.model.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntityReviewDTO {
    private Long id;
    private String content;
    private Long ownerId;
    private Long reservationId;
    private Boolean isBadComment;
}
