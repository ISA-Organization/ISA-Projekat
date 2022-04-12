package com.example.isaprojekat.service;

import com.example.isaprojekat.model.HouseReservation;

import java.util.List;
import java.util.Optional;

public interface QuickHouseResService {
    Optional<HouseReservation> findAllByOwner(Long ownerId);

    List<HouseReservation> findAll();

    HouseReservation save(HouseReservation h);

    HouseReservation update(HouseReservation h);
}
