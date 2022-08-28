package com.example.isaprojekat.controller;

import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.service.RentingEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/rentingEntities", produces = MediaType.APPLICATION_JSON_VALUE)
public class RentingEntityController {

    @Autowired
    private RentingEntityService service;

    @GetMapping("/{id}")
    public ResponseEntity<String> getEntityType(@PathVariable Long id){

        Optional<RentingEntity> r = service.findOne(id);

        if(r.isPresent()) {
            return new ResponseEntity<>(r.get().getRentingEntityType().toString(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("name/{id}")
    public ResponseEntity<String> getEntity(@PathVariable Long id){

        Optional<RentingEntity> r = service.findOne(id);

        if(r.isPresent()) {
            return new ResponseEntity<>(r.get().getName(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
