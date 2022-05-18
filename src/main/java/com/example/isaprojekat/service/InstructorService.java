package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.Instructor;
import com.example.isaprojekat.model.User;

import java.util.List;
import java.util.Optional;

public interface InstructorService {
    Optional<Instructor> findOne(Long id);

    List<Instructor> findAll();

    Instructor save(Instructor instructor);

    Boolean delete(Long id);
}
