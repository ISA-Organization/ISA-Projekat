package com.example.isaprojekat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] bytes;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="renting_entity_id")
    private RentingEntity rentingEntityId;
}
