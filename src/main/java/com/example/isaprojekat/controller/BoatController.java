package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.BoatDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.BoatToDTO;
import com.example.isaprojekat.dto.mapper.DTOToBoat;
import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.service.BoatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BoatDTO> create(@Valid @RequestBody BoatDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Boat saved = boatService.save(toBoat.convert(dto));

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
    public ResponseEntity<BoatDTO> delete(@PathVariable Long id){
        Boat deleted = boatService.delete(id);

        if(deleted != null) {
            return new ResponseEntity<>(toDTO.convert(deleted), HttpStatus.NO_CONTENT);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<BoatDTO> getOne(@PathVariable Long id){

        Optional<Boat> b = boatService.findOne(id);

        if(b.isPresent()) {
            return new ResponseEntity<>(toDTO.convert(b.get()), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //    //@PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
//    @GetMapping
//    public ResponseEntity<List<HouseDTO>> getAll(
//            @RequestParam(required = false) String name,
//            @RequestParam(required = false) String address,
//            @RequestParam(required = false) Double price,
//            @RequestParam(required = false) Long ownerId){
//
//        List<House> houses;
//
//        if(name != null || address != null || price != null) {
//            houses = houseService.find(name, address, price);
//        }
//        else {
//            houses = houseService.findAll();
//        }
//
//        List<HouseDTO> houseDTOS = toHouseDTO.convert(houses);
//
//        return new ResponseEntity<>(houseDTOS, HttpStatus.OK);
//    }
}
