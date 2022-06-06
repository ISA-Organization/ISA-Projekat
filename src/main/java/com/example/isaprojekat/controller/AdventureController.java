package com.example.isaprojekat.controller;


import com.example.isaprojekat.dto.AdventureDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.AdventureToDTO;
import com.example.isaprojekat.dto.mapper.DTOToAdventure;
import com.example.isaprojekat.model.Adventure;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.Instructor;
import com.example.isaprojekat.model.Picture;
import com.example.isaprojekat.repository.PictureRepository;
import com.example.isaprojekat.service.AdventureService;
import com.example.isaprojekat.service.PictureService;
import com.example.isaprojekat.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/adventures", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdventureController {
    @Autowired
    UserService userService;
    @Autowired
    AdventureService adventureService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    AdventureToDTO toAdventureDTO;
    @Autowired
    DTOToAdventure toAdventure;
    @Autowired
    PictureService pictureService;
    @Autowired
    PictureRepository pictureRepository;

    @GetMapping(value={"/{id}"})
    public ResponseEntity<AdventureDTO> get(@PathVariable Long id){
        Optional<Adventure> adventure = adventureService.findOne(id);
        AdventureDTO dto = toAdventureDTO.convert(adventure.get());
        dto.pictures = new ArrayList<>();
        for(Picture p : pictureService.getImagesByEntity(id)){
            dto.pictures.add(Base64.getEncoder().encodeToString(p.getBytes()));
        }

        if(adventure.isPresent())
            return new ResponseEntity<>(dto, HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @GetMapping
    public ResponseEntity<List<AdventureDTO>> getAll(
            @RequestParam(required = false) Long ownerId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) Double price){

        List<Adventure> adventures;
//
        if(name != null || address != null || price != null || ownerId != null) {
            adventures = adventureService.find(name, address, price, ownerId);
        }
        else {
            adventures = adventureService.findAll();
        }
        List<AdventureDTO> adventureDTOS = toAdventureDTO.convert(adventures);
        for(AdventureDTO dto : adventureDTOS){

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

        return new ResponseEntity<>(adventureDTOS, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AdventureDTO> update(@PathVariable Long id, @Valid @RequestBody AdventureDTO dto){

        if(!id.equals(dto.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        dto.setType("ADVENTURE");
        Adventure h = toAdventure.convert(dto);
        Adventure saved = adventureService.update(h);

        return new ResponseEntity<>(toAdventureDTO.convert(saved),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<AdventureDTO> delete(@PathVariable Long id){
        for(Picture p : pictureService.getImagesByEntity(id)){
            pictureRepository.deleteById(p.getId());
        }
        Adventure deleted = adventureService.delete(id);

        if(deleted != null) {
            return new ResponseEntity<>(toAdventureDTO.convert(deleted), HttpStatus.NO_CONTENT);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AdventureDTO> save(@RequestBody @Validated AdventureDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Adventure saved = adventureService.save(toAdventure.convert(dto));
        for(String s : dto.getPictures()){
            pictureService.addPictureAdventure(saved, s);
        }

        return new ResponseEntity<>(toAdventureDTO.convert(saved), HttpStatus.CREATED);
    }

    @PutMapping(value= {"/edit"})
    public ResponseEntity<AdventureDTO> edit(@RequestBody @Validated AdventureDTO dto){
        if(adventureService.findOne(dto.getId()).isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Adventure adventure = adventureService.findOne(dto.getId()).get();
        adventure.setCancellationPolicy(dto.getCancellationPolicy());
        adventure.setFishingEquipment(dto.getFishingEquipment());
        adventure.setInstructor((Instructor) userService.findOne(dto.getInstructorId()).get());
        return new ResponseEntity<>(modelMapper.map(adventureService.save(adventure), AdventureDTO.class), HttpStatus.OK);
    }

    @GetMapping(value = {"/instructor/{id}"})
    public ResponseEntity<List<AdventureDTO>> getForInstructor(@PathVariable Long id){
        List<Adventure> adventures = adventureService.findByInstructor(id);
        if(adventures.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<AdventureDTO> dtos = adventures.stream().map(adventure -> modelMapper.map(adventure, AdventureDTO.class)).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);

    }


}
