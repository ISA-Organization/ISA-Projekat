package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.LoyaltyProgramDTO;
import com.example.isaprojekat.model.LoyaltyProgram;
import com.example.isaprojekat.service.LoyaltyProgramService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/loyaltyprogram", produces = MediaType.APPLICATION_JSON_VALUE)
public class LoyaltyProgramController {
    @Autowired
    private LoyaltyProgramService loyaltyProgramService;
    @Autowired
    ModelMapper modelMapper;



    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateLoyalty(@RequestBody LoyaltyProgramDTO program){

        if(program.getPercentForBronze() < 0 || program.getPercentForBronze() > 100 ||
                program.getPercentForSilver() < 0 || program.getPercentForSilver() > 100 ||
                program.getPercentForGold() < 0 || program.getPercentForGold() > 100 ||
                program.getPointsForBronze() < 0 || program.getPointsForSilver() < 0 ||
                program.getPointsForGold() < 0 || program.getPercentageForApp() < 0 ||
                program.getPercentageForApp() > 100 || program.getPointsForOwner() < 0 ||
                program.getPointsForUser() < 0) {
            return new ResponseEntity<>("Loyalty program could not be updated!", HttpStatus.BAD_REQUEST);
        }
        loyaltyProgramService.save(modelMapper.map(program, LoyaltyProgram.class));
        return new ResponseEntity<>("Loyalty program updated!", HttpStatus.OK);
    }
}
