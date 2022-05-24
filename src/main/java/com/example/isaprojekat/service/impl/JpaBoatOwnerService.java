package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.BoatOwner;
import com.example.isaprojekat.repository.BoatOwnerRepository;
import com.example.isaprojekat.service.BoatOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JpaBoatOwnerService implements BoatOwnerService {
    @Autowired
    private BoatOwnerRepository boatOwnerRepository;
    @Override
    public Optional<BoatOwner> findOne(Long id) {
        return boatOwnerRepository.findById(id);
    }

    @Override
    public List<BoatOwner> findAll() {
        return boatOwnerRepository.findAll();
    }

    @Override
    public BoatOwner save(BoatOwner boatOwner) {
        return boatOwnerRepository.save(boatOwner);
    }

    @Override
    public Boolean delete(Long id) {
        boatOwnerRepository.deleteById(id);
        return true;
    }
}
