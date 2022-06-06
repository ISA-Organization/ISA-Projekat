package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.DeletionRequestDTO;
import com.example.isaprojekat.model.DeletionRequest;
import com.example.isaprojekat.model.User;
import com.example.isaprojekat.service.DeletionRequestService;
import com.example.isaprojekat.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class DTOToDelReq {
    @Autowired
    UserService userService;
    @Autowired
    DeletionRequestService deletionRequestService;
    public DeletionRequest convert(DeletionRequestDTO dr){
        DeletionRequest dto = new DeletionRequest();
        dto.setId(dr.getId());
        dto.setReason(dr.getReason());
        dto.setRequestedDate(dr.getRequestedDate());
        dto.setDenied(false);
        dto.setReviewed(false);
        dto.setDenialReason("");
        dto.setUser(userService.findOne(dr.getUserId()).get());
        return dto;
    }

    public List<DeletionRequest> convert(List<DeletionRequestDTO> dr){
        List<DeletionRequest> dtos = new ArrayList<>();
        for(DeletionRequestDTO d : dr){
            DeletionRequest dto = convert(d);
            dtos.add(dto);
        }
        return dtos;
    }

}
