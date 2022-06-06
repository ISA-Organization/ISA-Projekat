package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Rating;
import com.example.isaprojekat.repository.RatingRepository;
import com.example.isaprojekat.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class JpaRatingService implements RatingService {

    @Autowired
    RatingRepository ratingRepository;
    @Override
    public Optional<Rating> findOne(Long id) {
        return ratingRepository.findById(id);
    }

    @Override
    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    @Override
    public Rating save(Rating rating) {
        return ratingRepository.save(rating);
    }

    @Override
    public Boolean delete(Long id) {
        ratingRepository.deleteById(id);
        return true;
    }
}
