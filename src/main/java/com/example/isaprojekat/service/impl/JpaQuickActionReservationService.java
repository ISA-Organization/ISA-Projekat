package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.QuickActionReservation;
import com.example.isaprojekat.repository.QuickActionReservationRepository;
import com.example.isaprojekat.service.QuickActionReservationService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class JpaQuickActionReservationService implements QuickActionReservationService {

    @Autowired
    private QuickActionReservationRepository quickActionReservationRepository;
    @Override
    public Optional<QuickActionReservation> findOne(Long id) {
        return quickActionReservationRepository.findById(id);
    }

    @Override
    public List<QuickActionReservation> findAll() {
        return quickActionReservationRepository.findAll();
    }

    @Override
    public QuickActionReservation save(QuickActionReservation quickActionReservation) {
        return quickActionReservationRepository.save(quickActionReservation);
    }

    @Override
    public Boolean delete(Long id) {
        quickActionReservationRepository.deleteById(id);
        return true;
    }
}
