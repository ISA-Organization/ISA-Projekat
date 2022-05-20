package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntityType;
import com.example.isaprojekat.service.HouseOwnerService;
import com.example.isaprojekat.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DTOToHouse {
    @Autowired
    private HouseService houseService;
    @Autowired
    private HouseOwnerService houseOwnerService;

    public House convert(HouseDTO dto) {
        House house = null;
        if(dto.getId() != null) {
            house = houseService.findOne(dto.getId()).get();
        }

        if(house == null) {
            house = new House();
        }

        house.setName(dto.getName());
        house.setDescription(dto.getDescription());
        house.setRentingRules(dto.getRules());
        house.setAddress(dto.getAddress());
        house.setPrice(dto.getPrice());
        house.setHouseOwner(houseOwnerService.findOne(dto.getHouseOwnerId()).get());
        house.setRentingEntityType(RentingEntityType.valueOf(dto.getType()));
        house.setNumberOfBeds(dto.getNumberOfBeds());
        house.setNumberOfRooms(dto.getNumberOfRooms());

        return house;
    }
}
