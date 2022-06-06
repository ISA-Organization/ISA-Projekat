package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.DeletionRequestDTO;
import com.example.isaprojekat.model.DeletionRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component

public class DelRequestToDTO {

    public DeletionRequestDTO convert(DeletionRequest dr){
        DeletionRequestDTO dto = new DeletionRequestDTO();
        dto.setId(dr.getId());
        dto.setReason(dr.getReason());
        dto.setRequestedDate(dr.getRequestedDate());
        dto.setDenied(false);
        dto.setReviewed(false);
        dto.setDenialReason("");
        dto.setUserId(dr.getUser().getId());
        return dto;
    }

    public List<DeletionRequestDTO> convert(List<DeletionRequest> dr){
        List<DeletionRequestDTO> dtos = new ArrayList<>();
        for(DeletionRequest d : dr){
            DeletionRequestDTO dto = convert(d);
            dtos.add(dto);
        }
        return dtos;
    }

}
