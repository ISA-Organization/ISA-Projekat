package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.AvailablePeriodDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.AvailablePeriodToDTO;
import com.example.isaprojekat.dto.mapper.DTOToHouse;
import com.example.isaprojekat.dto.mapper.HouseToDTO;
import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.Picture;
import com.example.isaprojekat.repository.PictureRepository;
import com.example.isaprojekat.service.HouseService;
import com.example.isaprojekat.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

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
    @Autowired
    PictureService pictureService;
    @Autowired
    PictureRepository pictureRepository;
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HouseDTO> create(@Valid @RequestBody HouseDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        House saved = houseService.save(toHouse.convert(dto));
        for(String s : dto.getPictures()){
            pictureService.addPictureHome(saved, s);
        }

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
        for(Picture p : pictureService.getImagesByEntity(id)){
            pictureRepository.deleteById(p.getId());
        }
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
        HouseDTO dto = toHouseDTO.convert(h.get());
        dto.pictures = new ArrayList<>();
        for(Picture p : pictureService.getImagesByEntity(id)){
            dto.pictures.add(Base64.getEncoder().encodeToString(p.getBytes()));
        }
        if(h.isPresent()) {
            return new ResponseEntity<>(dto, HttpStatus.OK);
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
        for(HouseDTO dto : houseDTOS){
            List<Picture> pictures = pictureService.getImagesByEntity(dto.getId());
            List<String> pictureBase64 = new ArrayList<>();
            for(Picture p : pictures){
                if(p.getRentingEntityId().getId() == dto.getId()){
                    pictureBase64.add(Base64.getEncoder().encodeToString(p.getBytes()));
                    break;
                }
            }
            dto.setPictures(pictureBase64);
        }
        return new ResponseEntity<>(houseDTOS, HttpStatus.OK);
    }
}
