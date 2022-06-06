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

    @Override
    public List<Adventure> find(String name, String address, Double price, Long ownerId) {
        if(price == null){
            price = Double.MAX_VALUE;
        }

        if(name != null && address == null && ownerId == null){
            return adventureRepository.findByNameContainingAndPriceLessThanEqual(name, price);
        }
        else if(name != null && address != null && ownerId == null){
            return adventureRepository.findByNameAndAddressContainingAndPriceLessThanEqual(name, address, price);
        }
        else if (name ==null && address != null && ownerId == null){
            return adventureRepository.findByAddressContainingAndPriceLessThanEqual(address, price);
        }

        else if(name != null && address == null && ownerId != null){
            return adventureRepository.findByNameContainingAndPriceLessThanEqualAndInstructorId(name, price, ownerId);
        }
        else if(name != null && address != null && ownerId != null){
            return adventureRepository.findByNameAndAddressContainingAndPriceLessThanEqualAndInstructorId(name, address, price, ownerId);
        }
        else if (name ==null && address != null && ownerId != null){
            return adventureRepository.findByAddressContainingAndPriceLessThanEqualAndInstructorId(address, price, ownerId);
        }
        else if (name ==null && address == null && ownerId != null){
            return adventureRepository.findByInstructorIdAndPriceLessThanEqual(ownerId, price);
        }


        return adventureRepository.findByPriceLessThanEqual(price);    }
}
