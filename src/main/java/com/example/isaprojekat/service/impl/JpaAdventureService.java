package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Adventure;
import com.example.isaprojekat.model.Instructor;
import com.example.isaprojekat.repository.AdventureRepository;
import com.example.isaprojekat.repository.InstructorRepository;
import com.example.isaprojekat.service.AdventureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class JpaAdventureService implements AdventureService {

    @Autowired
    InstructorRepository instructorRepository;
    @Autowired
    AdventureRepository adventureRepository;

    @Override
    public Optional<Adventure> findOne(Long id) {


        return adventureRepository.findById(id);
    }


    @Override
    public List<Adventure> findAll() {
        return adventureRepository.findAll();
    }

    @Override
    public Adventure save(Adventure adventure) {
        return adventureRepository.save(adventure);
    }

    @Override
    public Boolean delete(Long id) {
        adventureRepository.deleteById(id);
        return true;
    }

    @Override
    public List<Adventure> findByInstructor(Long id) {
        if(!instructorRepository.findById(id).isPresent()){
            return new ArrayList<>();
        }

        Instructor instructor = instructorRepository.findById(id).get();
        List<Adventure> instructorAdventures = new ArrayList<>();
        for(Adventure a: findAll()){
            if(a.getInstructor().getId().equals(instructor.getId())){
                instructorAdventures.add(a);
            }
        }

        return instructorAdventures;
    }
}
