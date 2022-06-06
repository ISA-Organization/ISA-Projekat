package com.example.isaprojekat.service;

import com.example.isaprojekat.model.Adventure;

import java.util.List;
import java.util.Optional;

public interface AdventureService {
    Optional<Adventure> findOne(Long id);

    List<Adventure> findAll();

    Adventure save(Adventure adventure);

    Adventure delete(Long id);

    List<Adventure> findByInstructor(Long id);

    List<Adventure> find(String name, String address, Double price, Long ownerId);

    Adventure update(Adventure h);
}
