package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.AvailablePeriodDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.AvailablePeriodToDTO;
import com.example.isaprojekat.dto.mapper.DTOToHouse;
import com.example.isaprojekat.dto.mapper.HouseToDTO;
import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/houses", produces = MediaType.APPLICATION_JSON_VALUE)
public class HouseController {

    @Autowired
    private HouseService houseService;

    @Autowired
    private DTOToHouse toHouse;

    @Autowired
    private HouseToDTO toHouseDTO;
    @Autowired
    private AvailablePeriodToDTO toAvialablePeriodDTO;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HouseDTO> create(@Valid @RequestBody HouseDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        House saved = houseService.save(toHouse.convert(dto));

        return new ResponseEntity<>(toHouseDTO.convert(saved), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HouseDTO> update(@PathVariable Long id, @Valid @RequestBody HouseDTO dto){

        if(!id.equals(dto.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        House h = toHouse.convert(dto);
        House saved = houseService.update(h);

        return new ResponseEntity<>(toHouseDTO.convert(saved),HttpStatus.OK);
    }

    @GetMapping("/freeDate/{id}")
    public ResponseEntity<List<AvailablePeriodDTO>> getFreePeriods(@PathVariable Long id){
        Optional<House> h = houseService.findOne(id);
        List<AvailablePeriod> availablePeriods = new ArrayList<>();
        availablePeriods.addAll(h.get().getAvailablePeriods());

        List<AvailablePeriodDTO> dtos = toAvialablePeriodDTO.convert(availablePeriods);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HouseDTO> delete(@PathVariable Long id){
        House deleted = houseService.delete(id);

        if(deleted != null) {
            return new ResponseEntity<>(toHouseDTO.convert(deleted), HttpStatus.NO_CONTENT);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/housetorent/{id}")
    public ResponseEntity<HouseDTO> getForRes(@PathVariable Long id){
        Optional<House> h = houseService.findOne(id);

        if(h.isPresent()){
            return new ResponseEntity<>(toHouseDTO.convert(h.get()), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<HouseDTO> getOne(@PathVariable Long id){

        Optional<House> h = houseService.findOne(id);

        if(h.isPresent()) {
            return new ResponseEntity<>(toHouseDTO.convert(h.get()), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    //@PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<HouseDTO>> getAll(
            @RequestParam(required = false) Long ownerId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) Double price){

        List<House> houses;

        if(name != null || address != null || price != null || ownerId != null) {
            houses = houseService.find(name, address, price, ownerId);
        }
        else {
            houses = houseService.findAll();
        }

        List<HouseDTO> houseDTOS = toHouseDTO.convert(houses);

        return new ResponseEntity<>(houseDTOS, HttpStatus.OK);
    }
}
