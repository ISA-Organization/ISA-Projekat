package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.repository.BoatRepository;
import com.example.isaprojekat.service.BoatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
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
    public Boat delete(Long id) {
        Optional<Boat> l = boatRepository.findById(id);
        if(l.isPresent()) {
            boatRepository.deleteById(id);
            return l.get();
        }
        return null;
    }

    @Override
    public Boat update(Boat boat) {
        return boatRepository.save(boat);
    }
}
