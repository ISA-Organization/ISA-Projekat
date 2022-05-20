package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.HouseOwner;
import com.example.isaprojekat.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface HouseOwnerService {
    Optional<HouseOwner> findOne(Long id);

    List<HouseOwner> findAll();

    HouseOwner save(HouseOwner houseOwner);

    Boolean delete(Long id);
}
