package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.BoatDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.NavigationEquipment;
import com.example.isaprojekat.model.RentingEntityType;
import com.example.isaprojekat.service.BoatOwnerService;
import com.example.isaprojekat.service.BoatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DTOToBoat {

    @Autowired
    private BoatService boatService;
    @Autowired
    private BoatOwnerService boatOwnerService;

    public Boat convert(BoatDTO dto) {
        Boat boat = null;
        if(dto.getId() != null) {
            boat = boatService.findOne(dto.getId()).get();
        }

        if(boat == null) {
            boat = new Boat();
        }

        boat.setName(dto.getName());
        boat.setDescription(dto.getDescription());
        boat.setRentingRules(dto.getRentingRules());
        boat.setAddress(dto.getAddress());
        boat.setPrice(dto.getPrice());
        boat.setBoatOwner(boatOwnerService.findOne(dto.getBoatOwnerId()).get());

        boat.setRentingEntityType(RentingEntityType.valueOf(dto.getRentingEntityType()));
        boat.setCancellationPolicy(dto.getCancellationPolicy());
        boat.setType(dto.getType());
        boat.setFishingEquipment(dto.getFishingEquipment());
        boat.setLength(dto.getLength());
        boat.setEngineNumber(dto.getEngineNumber());
        boat.setEnginePower(dto.getEnginePower());
        boat.setNavigation(NavigationEquipment.valueOf(dto.getNavigation()));
        boat.setMaxSpeed(dto.getMaxSpeed());
        boat.setMaxNumOfPeople(dto.getMaxNumOfPeople());

        return boat;
    }
}
