package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.AvailablePeriodDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.House;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AvailablePeriodToDTO {

    public AvailablePeriodDTO convert(AvailablePeriod p) {
        AvailablePeriodDTO dto = new AvailablePeriodDTO();

        dto.setId(p.getId());
        dto.setStart(p.getStart());
        dto.setEnd(p.getEnd());
        dto.setSpecialPrice(p.getSpecialPrice());
        dto.setRentingEntityId(p.getRentingEntity().getId());
        dto.setIsSpecialOffer(p.isSpecialOffer());
        dto.setRentingEntityType(p.getRentingEntity().getRentingEntityType().toString());

        return dto;
    }

    public List<AvailablePeriodDTO> convert(List<AvailablePeriod> periods){
        List<AvailablePeriodDTO> dtos = new ArrayList<>();

        for(AvailablePeriod h : periods) {
            AvailablePeriodDTO dto = convert(h);
            dtos.add(dto);
        }

        return dtos;
    }
}
