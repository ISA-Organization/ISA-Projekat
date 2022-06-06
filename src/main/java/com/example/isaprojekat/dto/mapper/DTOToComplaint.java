package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.ComplaintDTO;
import com.example.isaprojekat.model.Complaint;
import com.example.isaprojekat.service.RentingEntityService;
import com.example.isaprojekat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class DTOToComplaint {
    @Autowired
    UserService userService;
    @Autowired
    RentingEntityService rentingEntityService;
    public Complaint convert(ComplaintDTO rating){
        Complaint dto = new Complaint();
        dto.setId(rating.getId());
        dto.setApproved(rating.isApproved());
        dto.setDescription(rating.getDescription());
        dto.setResponse(rating.getResponse());

        dto.setUser(userService.findOne(rating.getUserId()).get());
        dto.setRentingEntity(rentingEntityService.findOne(rating.getRentingEntityId()).get());
        return dto;
    }
    public List<Complaint> convert(List<ComplaintDTO> ratings){
        List<Complaint> dtos = new ArrayList<>();
        for(ComplaintDTO r : ratings){
            Complaint dto = convert(r);
            dtos.add(dto);
        }
        return dtos;
    }
}
