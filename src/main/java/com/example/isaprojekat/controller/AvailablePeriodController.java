package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.AvailablePeriodDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.SpecialOfferDTO;
import com.example.isaprojekat.dto.mapper.AvailablePeriodToDTO;
import com.example.isaprojekat.dto.mapper.DTOToAvailablePeriod;
import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.service.AvailablePeriodService;
import com.example.isaprojekat.service.ClientService;
import com.example.isaprojekat.service.RentingEntityService;
import com.example.isaprojekat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.ZoneId;
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
    @Autowired
    private ClientService clientService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AvailablePeriodDTO> create(@Valid @RequestBody AvailablePeriodDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        AvailablePeriod saved = service.save(toAvailablePeriod.convert(dto));

        if(saved.isSpecialOffer()){
            clientService.sendSubscribers(saved);
        }

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
    @GetMapping(value="/specialOffers/{id}")
    public ResponseEntity<List<SpecialOfferDTO>> getSpecialOffersForEntity(@PathVariable Long id){
        Optional<RentingEntity> entity = rentingEntityService.findOne(id);
        List<AvailablePeriod> periods = new ArrayList<>();
        periods.addAll(entity.get().getAvailablePeriods());
        periods.removeIf(p -> !p.isSpecialOffer());
        List<SpecialOfferDTO> dtos = new ArrayList<>();
        for (AvailablePeriod period : periods) {
            SpecialOfferDTO offerDTO = new SpecialOfferDTO(period.getId(), period.getStart().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                    period.getEnd().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), period.getSpecialPrice(), period.getRentingEntity().getId());

            dtos.add(offerDTO);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping(value="/{id}")
    public ResponseEntity<AvailablePeriodDTO> delete(@PathVariable Long id){
        AvailablePeriod deleted = service.delete(id);

        if(deleted != null) {
            return new ResponseEntity<>(toDTO.convert(deleted), HttpStatus.NO_CONTENT);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
