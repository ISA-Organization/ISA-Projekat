package com.example.isaprojekat.service;

import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.QuickHouseReservation;

import java.util.List;
import java.util.Optional;

public interface QuickHouseResService {
    Optional<QuickHouseReservation> findAllByOwner(Long ownerId);

    List<QuickHouseReservation> findAll();

    QuickHouseReservation save(QuickHouseReservation h);

    QuickHouseReservation update(QuickHouseReservation h);
}
