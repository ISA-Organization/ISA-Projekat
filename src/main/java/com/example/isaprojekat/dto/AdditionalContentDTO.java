package com.example.isaprojekat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdditionalContentDTO {

    private Long id;
    private String name;
    private Double price;
    private Long entityId;
}
