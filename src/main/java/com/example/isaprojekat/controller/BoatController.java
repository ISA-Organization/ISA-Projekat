package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.BoatDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.BoatToDTO;
import com.example.isaprojekat.dto.mapper.DTOToBoat;
import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.Picture;
import com.example.isaprojekat.repository.PictureRepository;
import com.example.isaprojekat.service.BoatService;
import com.example.isaprojekat.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/boats", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatController {
    @Autowired
    private BoatService boatService;
    @Autowired
    private DTOToBoat toBoat;
    @Autowired
    private BoatToDTO toDTO;
    @Autowired
    PictureService pictureService;
    @Autowired
    PictureRepository pictureRepository;


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BoatDTO> create(@Valid @RequestBody BoatDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Boat saved = boatService.save(toBoat.convert(dto));
        for(String s : dto.getPictures()){
            pictureService.addPictureBoat(saved, s);
        }
        return new ResponseEntity<>(toDTO.convert(saved), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BoatDTO> update(@PathVariable Long id, @Valid @RequestBody BoatDTO dto){

        if(!id.equals(dto.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Boat b = toBoat.convert(dto);
        Boat saved = boatService.update(b);

        return new ResponseEntity<>(toDTO.convert(saved),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id){
        for(Picture p : pictureService.getImagesByEntity(id)){
            pictureRepository.deleteById(p.getId());
        }
        if(boatService.delete(id))
            return new ResponseEntity<>(true, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }

    // @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<BoatDTO> getOne(@PathVariable Long id){

        Optional<Boat> b = boatService.findOne(id);
        BoatDTO dto = toDTO.convert(b.get());
        dto.pictures = new ArrayList<>();
                for(Picture p : pictureService.getImagesByEntity(id)){
                        dto.pictures.add(Base64.getEncoder().encodeToString(p.getBytes()));
                    }
        if(b.isPresent()) {
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

        //@PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<BoatDTO>> getAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) Double price){

        List<Boat> boats;

        if(name != null || address != null || price != null) {
            boats = boatService.find(name, address, price);
        }
        else {
            boats = boatService.findAll();
        }

        List<BoatDTO> boatDTOS = toDTO.convert(boats);
        for(BoatDTO dto : boatDTOS){
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

        return new ResponseEntity<>(boatDTOS, HttpStatus.OK);
    }
}
