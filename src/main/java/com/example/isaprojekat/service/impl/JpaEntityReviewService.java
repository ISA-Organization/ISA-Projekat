package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntityReview;
import com.example.isaprojekat.repository.HouseRepository;
import com.example.isaprojekat.repository.EntityReviewRepository;
import com.example.isaprojekat.service.RentingEntityService;

@Service
public class JpaEntityReviewService implements RentingEntityService {

    @Autowired
    private EntityReviewRepository repository;

    @Override
    public RentingEntityReview save(RentingEntityReview h) {
        return repository.save(h);
    }
}
