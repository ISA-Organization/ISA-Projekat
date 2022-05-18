package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.BoatOwner;
import com.example.isaprojekat.model.User;

import java.util.List;
import java.util.Optional;

public interface BoatOwnerService {
    Optional<BoatOwner> findOne(Long id);

    List<BoatOwner> findAll();

    BoatOwner save(BoatOwner boatOwner);

    Boolean delete(Long id);
}
