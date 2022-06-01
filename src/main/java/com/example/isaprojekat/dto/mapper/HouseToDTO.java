package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.UserDTO;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HouseToDTO {
    public HouseDTO convert(House h) {
        HouseDTO dto = new HouseDTO();

        dto.setId(h.getId());
        dto.setName(h.getName());
        dto.setDescription(h.getDescription());
        dto.setRules(h.getRentingRules());
        dto.setAddress(h.getAddress());
        dto.setPrice(h.getPrice());
        dto.setHouseOwnerId(h.getHouseOwner().getId());
        dto.setNumberOfBeds(h.getNumberOfBeds());
        dto.setNumberOfRooms(h.getNumberOfRooms());
        dto.setType(h.getRentingEntityType().toString());

        dto.setLatitude(h.getLatitude());
        dto.setLongitude(h.getLongitude());

        return dto;
    }

    public List<HouseDTO> convert(List<House> houses){
        List<HouseDTO> dtos = new ArrayList<>();

        for(House h : houses) {
            HouseDTO dto = convert(h);
            dtos.add(dto);
        }

        return dtos;
    }
}
