package com.example.isaprojekat.dto;

import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintDTO {
    private Long id;

    private String description;
    private String response;
    private boolean isApproved;

    private Long userId;
    private Long rentingEntityId;
}
