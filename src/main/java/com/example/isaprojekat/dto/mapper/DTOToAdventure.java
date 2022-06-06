package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.AdventureDTO;
import com.example.isaprojekat.model.Adventure;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.model.RentingEntityType;
import com.example.isaprojekat.service.InstructorService;
import com.example.isaprojekat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class DTOToAdventure {
    @Autowired
    InstructorService instructorService;
    public Adventure convert(AdventureDTO a) {
        Adventure dto = new Adventure();

        dto.setId(a.getId());
        dto.setName(a.getName());
        dto.setDescription(a.getDescription());
        dto.setRentingRules(a.getRules());
        dto.setAddress(a.getAddress());
        dto.setPrice(a.getPrice());
        dto.setInstructor(instructorService.findOne(a.getInstructorId()).get());
        dto.setMaxNumberOfPeople(a.getMaxNumberOfPeople());
        dto.setRentingEntityType((RentingEntityType.valueOf(a.getType())));
        dto.setFishingEquipment(a.getFishingEquipment());
        dto.setCancellationPolicy(a.getCancellationPolicy());

        dto.setLatitude(a.getLatitude());
        dto.setLongitude(a.getLongitude());

        return dto;
    }

    public List<Adventure> convert(List<AdventureDTO> adventures){

        List<Adventure> dtos = new ArrayList<>();

        for(AdventureDTO a : adventures) {
            Adventure dto = convert(a);
            dtos.add(dto);
        }

        return dtos;
    }
}
