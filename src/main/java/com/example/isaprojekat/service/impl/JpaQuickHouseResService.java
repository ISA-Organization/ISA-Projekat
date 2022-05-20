package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.HouseReservation;
import com.example.isaprojekat.repository.QuickHouseReservationRepository;
import com.example.isaprojekat.service.QuickHouseResService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JpaQuickHouseResService implements QuickHouseResService {
    @Autowired
    private QuickHouseReservationRepository repository;

    @Override
    public Optional<HouseReservation> findAllByOwner(Long ownerId) {
        return repository.findByHouseOwnerId(ownerId);
    }

    @Override
    public List<HouseReservation> findAll() {
        return repository.findAll();
    }

    @Override
    public HouseReservation save(HouseReservation h) {
        return repository.save(h);
    }

    @Override
    public HouseReservation update(HouseReservation h) {
        return repository.save(h);
    }
}
