package com.example.isaprojekat.service;

import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntityReview;

import java.util.List;

public interface RentingEntityReviewService {
    RentingEntityReview save(RentingEntityReview h);
    RentingEntityReview findOne(Long id);
    void delete(Long id);
    List<RentingEntityReview> findAll();
}
