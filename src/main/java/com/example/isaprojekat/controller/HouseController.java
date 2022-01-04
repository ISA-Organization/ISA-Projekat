package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.HouseDTOToHouse;
import com.example.isaprojekat.dto.mapper.HouseToHouseDTO;
import com.example.isaprojekat.dto.mapper.UserDTOToUser;
import com.example.isaprojekat.dto.mapper.UserToUserDTO;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.service.HouseService;
import com.example.isaprojekat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/houses", produces = MediaType.APPLICATION_JSON_VALUE)
public class HouseController {

    @Autowired
    private HouseService houseService;

    @Autowired
    private HouseDTOToHouse toHouse;

    @Autowired
    private HouseToHouseDTO toHouseDTO;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HouseDTO> create(@Valid @RequestBody HouseDTO dto){
        House h = toHouse.convert(dto);
        House saved = houseService.save(h);

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

    @DeleteMapping("/{id}")
    public ResponseEntity<HouseDTO> delete(@PathVariable Long id){
        House deleted = houseService.delete(id);

        if(deleted != null) {
            return new ResponseEntity<>(toHouseDTO.convert(deleted), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<HouseDTO> getOne(@PathVariable Long id){
        House h = houseService.findOne(id).get();

        if(h != null) {
            return new ResponseEntity<>(toHouseDTO.convert(h), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    //@PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<HouseDTO>> getAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) Double price,
            @RequestParam(required = false) Long ownerId){

        List<House> houses;

        if(name != null || ownerId != null || address != null || price != null) {
            houses = houseService.find(name, address, price);
        }
        else {
            houses = houseService.findAll();
        }

        return new ResponseEntity<>(toHouseDTO.convert(houses), HttpStatus.OK);
    }
}