package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.AvailablePeriodDTO;
import com.example.isaprojekat.dto.mapper.AvailablePeriodToDTO;
import com.example.isaprojekat.dto.mapper.DTOToAvailablePeriod;
import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.service.AvailablePeriodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/available/period", produces = MediaType.APPLICATION_JSON_VALUE)
public class AvailablePeriodController {

    @Autowired
    private AvailablePeriodService service;

    @Autowired
    private DTOToAvailablePeriod toAvailablePeriod;
    @Autowired
    private AvailablePeriodToDTO toDTO;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AvailablePeriodDTO> create(@Valid @RequestBody AvailablePeriodDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        AvailablePeriod saved = service.save(toAvailablePeriod.convert(dto));

        return new ResponseEntity<>(toDTO.convert(saved), HttpStatus.CREATED);
    }
}
