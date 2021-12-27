package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.House;
import com.example.isaprojekat.repository.HouseRepository;
import com.example.isaprojekat.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JpaHouseService implements HouseService {
    @Autowired
    private HouseRepository repository;

    @Override
    public Optional<House> findOne(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<House> findAll() {
        return repository.findAll();
    }

    @Override
    public House save(House h) {
        return repository.save(h);
    }

    @Override
    public House delete(Long id) {
        Optional<House> l = repository.findById(id);
        if(l.isPresent()) {
            repository.deleteById(id);
            return l.get();
        }
        return null;
    }
}
