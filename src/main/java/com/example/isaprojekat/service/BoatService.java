package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.User;

import java.util.List;
import java.util.Optional;

public interface BoatService {
    Optional<Boat> findOne(Long id);

    List<Boat> findAll();

    Boat save(Boat boat);

    Boolean delete(Long id);

    Boat update(Boat boat);

    List<Boat> find(String name, String address, Double price);
}
