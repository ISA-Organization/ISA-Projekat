package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.AdditionalContentDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.House;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AdditionalContentToDTO {
    public AdditionalContentDTO convert(AdditionalContent c) {
        AdditionalContentDTO dto = new AdditionalContentDTO();

        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setPrice(c.getPrice());
        dto.setEntityId(c.getRentingEntity().getId());

        return dto;
    }

    public List<AdditionalContentDTO> convert(List<AdditionalContent> contents){
        List<AdditionalContentDTO> dtos = new ArrayList<>();

        for(AdditionalContent h : contents) {
            AdditionalContentDTO dto = convert(h);
            dtos.add(dto);
        }

        return dtos;
    }
}
