package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.repository.AvailablePeriodRepository;
import com.example.isaprojekat.service.AvailablePeriodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JpaAvailablePeriodService implements AvailablePeriodService {

    @Autowired
    private AvailablePeriodRepository repository;

    @Override
    public AvailablePeriod save(AvailablePeriod period) {
        return repository.save(period);
    }

    @Override
    public AvailablePeriod delete(Long id) {
        Optional<AvailablePeriod> h = repository.findById(id);
        if(h.isPresent()) {
            repository.deleteById(id);
            return h.get();
        }
        return null;
    }

    @Override
    public AvailablePeriod findOne(Long id) {
        return repository.getById(id);
    }

    @Override
    public List<AvailablePeriod> findAll() {
        return repository.findAll();
    }
}
