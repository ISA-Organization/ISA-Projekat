package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.AdditionalContentDTO;
import com.example.isaprojekat.dto.mapper.AdditionalContentToDTO;
import com.example.isaprojekat.dto.mapper.DTOToAdditionalContent;
import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.service.AdditionalContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/additionalContents", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdditionalContentController {

    @Autowired
    private AdditionalContentService contentService;
    @Autowired
    private DTOToAdditionalContent toAdditionalContent;
    @Autowired
    private AdditionalContentToDTO toDTO;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AdditionalContentDTO> create(@Valid @RequestBody AdditionalContentDTO dto){
        if(dto.getId() != null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        AdditionalContent saved = contentService.save(toAdditionalContent.convert(dto));

        return new ResponseEntity<>(toDTO.convert(saved), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<AdditionalContentDTO>> findAllByEntityId(@PathVariable Long id){
        List<AdditionalContent> contents = contentService.findAllByEntityId(id);

        return new ResponseEntity<>(toDTO.convert(contents), HttpStatus.OK);
    }
}
