package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.UserDTO;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HouseToHouseDTO {
    public HouseDTO convert(House h) {
        HouseDTO dto = new HouseDTO();

        dto.setHouseRules(h.getHouseRules());
        dto.setAddress(h.getAddress());
        dto.setAdditionalContent(h.getAdditionalContent());
        dto.setName(h.getName());
        dto.setDescription(h.getDescription());
        dto.setId(h.getId());
        dto.setPrice(h.getPrice());
        dto.setNumberOfRooms(h.getNumberOfRooms());
        dto.setNumberOfBeds(h.getNumberOfBeds());
        dto.setOwnerId(h.getOwner().getId());
        dto.setOwnerName(h.getOwner().getFirstName());

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
