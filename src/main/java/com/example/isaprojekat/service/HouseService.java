package com.example.isaprojekat.service;

import com.example.isaprojekat.model.House;

import java.util.List;
import java.util.Optional;

public interface HouseService {

    Optional<House> findOne(Long id);

    List<House> findAll();

    House save(House h);

    House delete(Long id);

    House update(House house);

    List<House> find(String name, String address, Double price, Long ownerId);
}
