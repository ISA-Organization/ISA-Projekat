package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.AvailablePeriodDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntityType;
import com.example.isaprojekat.service.AdventureService;
import com.example.isaprojekat.service.AvailablePeriodService;
import com.example.isaprojekat.service.BoatService;
import com.example.isaprojekat.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DTOToAvailablePeriod {

    @Autowired
    private AvailablePeriodService periodService;

    @Autowired
    private HouseService houseService;

    @Autowired
    private BoatService boatService;

    @Autowired
    private AdventureService adventureService;

    public AvailablePeriod convert(AvailablePeriodDTO dto) {
        AvailablePeriod period = null;
        if(dto.getId() != null) {
            period = periodService.findOne(dto.getId());
        }

        if(period == null) {
            period = new AvailablePeriod();
        }

        period.setStart(dto.getStart());
        period.setEnd(dto.getEnd());
        period.setSpecialOffer(dto.getIsSpecialOffer());
        period.setSpecialPrice(dto.getSpecialPrice());

        switch (dto.getRentingEntityType()){
            case "HOUSE":
                period.setRentingEntity(houseService.findOne(dto.getRentingEntityId()).get());
                break;

            case "BOAT":
                period.setRentingEntity(boatService.findOne(dto.getRentingEntityId()).get());
                break;
            case "ADVENTURE":
                period.setRentingEntity(adventureService.findOne(dto.getRentingEntityId()).get());
                break;
        }
        return period;
    }
}
