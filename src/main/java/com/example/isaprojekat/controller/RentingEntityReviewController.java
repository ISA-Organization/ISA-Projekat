package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.EntityReviewDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.DTOToEntityReview;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.model.RentingEntityReview;
import com.example.isaprojekat.service.RentingEntityReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/reviews", produces = MediaType.APPLICATION_JSON_VALUE)
public class RentingEntityReviewController {
    @Autowired
    private RentingEntityReviewService service;
    @Autowired
    private DTOToEntityReview toEntityReview;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> create(@Valid @RequestBody EntityReviewDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        RentingEntityReview saved = service.save(toEntityReview.convert(dto));

        return new ResponseEntity<>("ok", HttpStatus.CREATED);
    }
}
