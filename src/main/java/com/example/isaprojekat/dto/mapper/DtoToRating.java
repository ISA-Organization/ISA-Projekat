package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.RatingDTO;
import com.example.isaprojekat.model.Rating;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.service.RentingEntityService;
import com.example.isaprojekat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DtoToRating {
    @Autowired
    UserService userService;
    @Autowired
    RentingEntityService rentingEntityService;
    public Rating convert(RatingDTO rating){
        Rating dto = new Rating();
        dto.setId(rating.getId());
        dto.setRating(rating.getRating());
        dto.setApproved(rating.isApproved());
        dto.setDescription(rating.getDescription());
        dto.setUser(userService.findOne(rating.getUserId()).get());
        dto.setRentingEntity(rentingEntityService.findOne(rating.getEntityId()).get());
        return dto;
    }
    public List<Rating> convert(List<RatingDTO> ratings){
        List<Rating> dtos = new ArrayList<>();
        for(RatingDTO r : ratings){
            Rating dto = convert(r);
            dtos.add(dto);
        }
        return dtos;
    }
}
