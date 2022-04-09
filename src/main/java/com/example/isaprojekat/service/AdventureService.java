package com.example.isaprojekat.service;

import com.example.isaprojekat.model.Adventure;

import java.util.List;
import java.util.Optional;

public interface AdventureService {
    Optional<Adventure> findOne(Long id);

    List<Adventure> findAll();

    Adventure save(Adventure adventure);

    Boolean delete(Long id);

    List<Adventure> findByInstructor(Long id);

}
