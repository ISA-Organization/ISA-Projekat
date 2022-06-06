package com.example.isaprojekat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeletionRequestDTO {
    private Long id;
    private Date requestedDate;
    private String reason;
    private boolean isReviewed;
    private boolean isDenied;
    private String denialReason;
    private Long userId;
}
