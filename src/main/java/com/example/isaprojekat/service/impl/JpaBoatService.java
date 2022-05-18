package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.repository.BoatRepository;
import com.example.isaprojekat.service.BoatService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class JpaBoatService implements BoatService {
    @Autowired
    private BoatRepository boatRepository;
    @Override
    public Optional<Boat> findOne(Long id) {
        return boatRepository.findById(id);
    }

    @Override
    public List<Boat> findAll() {
        return boatRepository.findAll();
    }

    @Override
    public Boat save(Boat boat) {
        return boatRepository.save(boat);
    }

    @Override
    public Boolean delete(Long id) {
        boatRepository.deleteById(id);
        return true;
    }
}
