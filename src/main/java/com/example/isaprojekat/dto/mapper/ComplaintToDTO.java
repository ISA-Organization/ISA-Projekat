package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.ComplaintDTO;
import com.example.isaprojekat.dto.RatingDTO;
import com.example.isaprojekat.model.Complaint;
import com.example.isaprojekat.model.Rating;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ComplaintToDTO {

    public ComplaintDTO convert(Complaint rating){
        ComplaintDTO dto = new ComplaintDTO();
        dto.setId(rating.getId());
        dto.setApproved(rating.isApproved());
        dto.setDescription(rating.getDescription());
        dto.setResponse(rating.getResponse());

        dto.setUserId(rating.getUser().getId());
        dto.setRentingEntityId(rating.getRentingEntity().getId());
        return dto;
    }
    public List<ComplaintDTO> convert(List<Complaint> ratings){
        List<ComplaintDTO> dtos = new ArrayList<>();
        for(Complaint r : ratings){
            ComplaintDTO dto = convert(r);
            dtos.add(dto);
        }
        return dtos;
    }
}
