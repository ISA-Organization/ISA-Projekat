package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.repository.RentingEntityRepository;
import com.example.isaprojekat.service.RentingEntityService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class JpaRentingEntityService implements RentingEntityService {
    @Autowired
    private RentingEntityRepository rentingEntityRepository;

    @Override
    public Optional<RentingEntity> findOne(Long id) {
        return rentingEntityRepository.findById(id);
    }

    @Override
    public List<RentingEntity> findAll() {
        return rentingEntityRepository.findAll();
    }

    @Override
    public RentingEntity save(RentingEntity rentingEntity) {
        return rentingEntityRepository.save(rentingEntity);
    }

    @Override
    public Boolean delete(Long id) {
        rentingEntityRepository.deleteById(id);
        return true;
    }
}
