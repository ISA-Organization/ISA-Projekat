package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.QuickHouseReservation;
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
    public Optional<QuickHouseReservation> findAllByOwner(Long ownerId) {
        return repository.findByHouseOwnerId(ownerId);
    }

    @Override
    public List<QuickHouseReservation> findAll() {
        return repository.findAll();
    }

    @Override
    public QuickHouseReservation save(QuickHouseReservation h) {
        return repository.save(h);
    }

    @Override
    public QuickHouseReservation update(QuickHouseReservation h) {
        return repository.save(h);
    }
}
