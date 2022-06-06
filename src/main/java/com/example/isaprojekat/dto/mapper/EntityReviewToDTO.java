package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.EntityReviewDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntityReview;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EntityReviewToDTO {
    public EntityReviewDTO convert(RentingEntityReview dto) {
        EntityReviewDTO r = new EntityReviewDTO();
        r.setId(dto.getId());
        r.setContent(dto.getContent());
        r.setIsBadComment(dto.getIsBadComment());
        r.setOwnerId(dto.getOwnerId());
        r.setReservationId(dto.getReservation().getId());

        return r;
    }
    public List<EntityReviewDTO> convert(List<RentingEntityReview> reviews) {
        List<EntityReviewDTO> dtos = new ArrayList<>();

        for(RentingEntityReview h : reviews) {
            EntityReviewDTO dto = convert(h);
            dtos.add(dto);
        }

        return dtos;
    }
}
