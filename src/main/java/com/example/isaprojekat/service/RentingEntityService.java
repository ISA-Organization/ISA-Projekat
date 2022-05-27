package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.model.Reservation;
import com.example.isaprojekat.model.User;

import java.util.List;
import java.util.Optional;

public interface RentingEntityService {
    Optional<RentingEntity> findOne(Long id);

    List<RentingEntity> findAll();

    RentingEntity save(RentingEntity rentingEntity);

    Boolean delete(Long id);
}
