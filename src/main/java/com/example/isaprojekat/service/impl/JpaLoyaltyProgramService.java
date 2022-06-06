package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.LoyaltyProgram;
import com.example.isaprojekat.repository.LoyaltyProgramRepository;
import com.example.isaprojekat.service.LoyaltyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class JpaLoyaltyProgramService implements LoyaltyProgramService {
    @Autowired
    LoyaltyProgramRepository repository;

    @Override
    public Optional<LoyaltyProgram> findOne(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<LoyaltyProgram> findAll() {
        return repository.findAll();
    }

    @Override
    public LoyaltyProgram save(LoyaltyProgram instructor) {
        return repository.save(instructor);
    }

    @Override
    public Boolean delete(Long id) {
        repository.deleteById(id);
        return true;
    }
}
