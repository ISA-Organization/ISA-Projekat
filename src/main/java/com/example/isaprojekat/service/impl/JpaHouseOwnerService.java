package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.HouseOwner;
import com.example.isaprojekat.repository.HouseOwnerRepository;
import com.example.isaprojekat.service.HouseOwnerService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class JpaHouseOwnerService implements HouseOwnerService {

    @Autowired
    private HouseOwnerRepository houseOwnerRepository;

    @Override
    public Optional<HouseOwner> findOne(Long id) {
        return houseOwnerRepository.findById(id);
    }

    @Override
    public List<HouseOwner> findAll() {
        return houseOwnerRepository.findAll();
    }

    @Override
    public HouseOwner save(HouseOwner houseOwner) {
        return houseOwnerRepository.save(houseOwner);
    }

    @Override
    public Boolean delete(Long id) {
        houseOwnerRepository.deleteById(id);
        return true;
    }
}
