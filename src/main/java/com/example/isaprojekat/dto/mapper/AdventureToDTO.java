package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.AdventureDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.model.Adventure;
import com.example.isaprojekat.model.House;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AdventureToDTO {

    public AdventureDTO convert(Adventure a) {
        AdventureDTO dto = new AdventureDTO();

        dto.setId(a.getId());
        dto.setName(a.getName());
        dto.setDescription(a.getDescription());
        dto.setRules(a.getRentingRules());
        dto.setAddress(a.getAddress());
        dto.setPrice(a.getPrice());
        dto.setInstructorId(a.getInstructor().getId());

        dto.setType(a.getRentingEntityType().toString());

        dto.setLatitude(a.getLatitude());
        dto.setLongitude(a.getLongitude());

        return dto;
    }

    public List<AdventureDTO> convert(List<Adventure> adventures){

        List<AdventureDTO> dtos = new ArrayList<>();

        for(Adventure a : adventures) {
            AdventureDTO dto = convert(a);
            dtos.add(dto);
        }

        return dtos;
    }
}
