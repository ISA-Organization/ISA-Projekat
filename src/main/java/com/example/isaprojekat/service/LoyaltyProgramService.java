package com.example.isaprojekat.service;

import com.example.isaprojekat.model.Instructor;
import com.example.isaprojekat.model.LoyaltyProgram;

import java.util.List;
import java.util.Optional;

public interface LoyaltyProgramService {
    Optional<LoyaltyProgram> findOne(Long id);

    List<LoyaltyProgram> findAll();

    LoyaltyProgram save(LoyaltyProgram instructor);

    Boolean delete(Long id);
}
