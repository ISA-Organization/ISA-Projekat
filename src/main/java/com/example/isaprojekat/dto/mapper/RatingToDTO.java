package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.RatingDTO;
import com.example.isaprojekat.model.Rating;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RatingToDTO {
    public RatingDTO convert(Rating rating){
        RatingDTO dto = new RatingDTO();
        dto.setId(rating.getId());
        dto.setRating(rating.getRating());
        dto.setApproved(rating.isApproved());
        dto.setDescription(rating.getDescription());
        dto.setUserId(rating.getUser().getId());
        dto.setEntityId(rating.getRentingEntity().getId());
    return dto;
    }
    public List<RatingDTO> convert(List<Rating> ratings){
        List<RatingDTO> dtos = new ArrayList<>();
        for(Rating r : ratings){
            RatingDTO dto = convert(r);
            dtos.add(dto);
        }
        return dtos;
    }
}
