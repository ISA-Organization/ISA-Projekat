package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.AdditionalContentDTO;
import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.service.AdditionalContentService;
import com.example.isaprojekat.service.RentingEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DTOToAdditionalContent {

    @Autowired
    private AdditionalContentService contentService;

    @Autowired
    private RentingEntityService rentingEntityService;

    public AdditionalContent convert(AdditionalContentDTO dto){
        AdditionalContent content = null;
        if(dto.getId() != null){
            content = contentService.findOne(dto.getId()).get();
        }
        if(content == null){
            content = new AdditionalContent();
        }
        content.setName(dto.getName());
        content.setPrice(dto.getPrice());
        content.setRentingEntity(rentingEntityService.findOne(dto.getEntityId()).get());


        return content;
    }
}
