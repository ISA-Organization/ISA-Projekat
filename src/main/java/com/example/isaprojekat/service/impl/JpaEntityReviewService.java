package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntityReview;
import com.example.isaprojekat.repository.HouseRepository;
import com.example.isaprojekat.repository.EntityReviewRepository;
import com.example.isaprojekat.service.RentingEntityReviewService;
import com.example.isaprojekat.service.RentingEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JpaEntityReviewService implements RentingEntityReviewService {

    @Autowired
    private EntityReviewRepository repository;

    @Override
    public RentingEntityReview save(RentingEntityReview h) {
        return repository.save(h);
    }

    @Override
    public RentingEntityReview findOne(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<RentingEntityReview> findAll() {
        return repository.findAll();
    }
}
