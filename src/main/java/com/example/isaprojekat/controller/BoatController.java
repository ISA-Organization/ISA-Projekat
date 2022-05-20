package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.BoatDTO;
import com.example.isaprojekat.dto.mapper.BoatToDTO;
import com.example.isaprojekat.dto.mapper.DTOToBoat;
import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.service.BoatService;
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
@RequestMapping(value = "/api/boats", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatController {
    @Autowired
    private BoatService boatService;
    @Autowired
    private DTOToBoat toBoat;
    @Autowired
    private BoatToDTO toDTO;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BoatDTO> create(@Valid @RequestBody BoatDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Boat saved = boatService.save(toBoat.convert(dto));

        return new ResponseEntity<>(toDTO.convert(saved), HttpStatus.CREATED);
    }
}
