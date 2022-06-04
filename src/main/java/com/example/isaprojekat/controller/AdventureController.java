package com.example.isaprojekat.controller;


import com.example.isaprojekat.dto.AdventureDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.AdventureToDTO;
import com.example.isaprojekat.model.Adventure;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.Instructor;
import com.example.isaprojekat.service.AdventureService;
import com.example.isaprojekat.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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

    @GetMapping(value={"/{id}"})
    public ResponseEntity<AdventureDTO> get(@PathVariable Long id){
        Optional<Adventure> adventure = adventureService.findOne(id);

        if(adventure.isPresent())
            return new ResponseEntity<>(modelMapper.map(adventure.get(), AdventureDTO.class), HttpStatus.OK);

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

        return new ResponseEntity<>(adventureDTOS, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AdventureDTO> save(@RequestBody @Validated AdventureDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        var adventure = modelMapper.map(dto, Adventure.class);
        return new ResponseEntity<AdventureDTO>(modelMapper.map(adventureService.save(adventure), AdventureDTO.class), HttpStatus.OK);
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

    @DeleteMapping(value = {"/id"})
    public ResponseEntity<Boolean> delete(@PathVariable Long id){
        if(adventureService.delete(id))
            return new ResponseEntity<>(true, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }
}
