package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.EntityReviewDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntityReview;
import com.example.isaprojekat.model.RentingEntityType;
import com.example.isaprojekat.repository.EntityReviewRepository;
import com.example.isaprojekat.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DTOToEntityReview {

    @Autowired
    private RentingEntityReviewService service;
    @Autowired
    private ReservationService resService;

    public RentingEntityReview convert(EntityReviewDTO dto) {
        RentingEntityReview r = new RentingEntityReview();

       r.setContent(dto.getContent());
       r.setBadComment(dto.isBadComment());
       r.setOwnerId(dto.getOwnerId());
       r.setReservation(resService.findOne(dto.getReservationId()).get());

        return r;
    }
}
