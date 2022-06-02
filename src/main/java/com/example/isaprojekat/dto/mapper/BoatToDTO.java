package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.BoatDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.NavigationEquipment;
import com.example.isaprojekat.model.RentingEntityType;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BoatToDTO {

    public BoatDTO convert(Boat b) {
        BoatDTO dto = new BoatDTO();

        dto.setId(b.getId());
        dto.setName(b.getName());
        dto.setDescription(b.getDescription());
        dto.setRentingRules(b.getRentingRules());
        dto.setAddress(b.getAddress());
        dto.setPrice(b.getPrice());
        dto.setBoatOwnerId(b.getBoatOwner().getId());

        dto.setRentingEntityType(b.getRentingEntityType().toString());
        dto.setCancellationPolicy(b.getCancellationPolicy());
        dto.setType(b.getType());
        dto.setFishingEquipment(b.getFishingEquipment());
        dto.setLength(b.getLength());
        dto.setEngineNumber(b.getEngineNumber());
        dto.setEnginePower(b.getEnginePower());
        dto.setNavigation(b.getNavigation().toString());
        dto.setMaxSpeed(b.getMaxSpeed());
        dto.setMaxNumOfPeople(b.getMaxNumOfPeople());

        dto.setLatitude(b.getLatitude());
        dto.setLongitude(b.getLongitude());

        return dto;
    }

    public List<BoatDTO> convert(List<Boat> boats){
        List<BoatDTO> dtos = new ArrayList<>();

        for(Boat b : boats) {
            BoatDTO dto = convert(b);
            dtos.add(dto);
        }

        return dtos;
    }
}
