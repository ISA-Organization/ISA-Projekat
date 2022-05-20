package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Instructor;
import com.example.isaprojekat.repository.InstructorRepository;
import com.example.isaprojekat.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

public class JpaInstructorService implements InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;
    @Override
    public Optional<Instructor> findOne(Long id) {
        return instructorRepository.findById(id);
    }

    @Override
    public List<Instructor> findAll() {
        return instructorRepository.findAll();
    }

    @Override
    public Instructor save(Instructor instructor) {
        return instructorRepository.save(instructor);
    }

    @Override
    public Boolean delete(Long id) {

        instructorRepository.deleteById(id);
        return true;
    }
}
