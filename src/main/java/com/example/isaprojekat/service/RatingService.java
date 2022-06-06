package com.example.isaprojekat.service;

import com.example.isaprojekat.model.Rating;
import com.example.isaprojekat.model.RentingEntity;

import java.util.List;
import java.util.Optional;

public interface RatingService {

    Optional<Rating> findOne(Long id);

    List<Rating> findAll();

    Rating save(Rating rating);

    Boolean delete(Long id);
}
