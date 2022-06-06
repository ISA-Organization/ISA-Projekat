package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.AvailablePeriodDTO;
import com.example.isaprojekat.dto.mapper.AvailablePeriodToDTO;
import com.example.isaprojekat.dto.mapper.DTOToAvailablePeriod;
import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.service.AvailablePeriodService;
import com.example.isaprojekat.service.RentingEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/available/period", produces = MediaType.APPLICATION_JSON_VALUE)
public class AvailablePeriodController {

    @Autowired
    private AvailablePeriodService service;
    @Autowired
    RentingEntityService rentingEntityService;
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
    @GetMapping(value="/{id}")
    public ResponseEntity<List<AvailablePeriodDTO>> getPeriodsForEntity(@PathVariable Long id){
        Optional<RentingEntity> entity = rentingEntityService.findOne(id);
        List<AvailablePeriod> periods = new ArrayList<>();
        periods.addAll(entity.get().getAvailablePeriods());
        List<AvailablePeriodDTO> dtos = toDTO.convert(periods);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
