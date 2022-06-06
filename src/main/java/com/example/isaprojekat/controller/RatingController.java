package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.RatingDTO;
import com.example.isaprojekat.dto.mapper.DtoToRating;
import com.example.isaprojekat.dto.mapper.RatingToDTO;
import com.example.isaprojekat.model.Rating;
import com.example.isaprojekat.model.User;
import com.example.isaprojekat.service.RatingService;
import com.example.isaprojekat.service.UserService;
import com.example.isaprojekat.service.impl.JpaEmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/ratings", produces = MediaType.APPLICATION_JSON_VALUE)
public class RatingController {
    @Autowired
    RatingService ratingService;
    @Autowired
    RatingToDTO ratingToDTO;
    @Autowired
    DtoToRating dtoToRating;
    @Autowired
    UserService userService;
    @Autowired
    JpaEmailSender emailSender;

    @PostMapping
    public ResponseEntity<RatingDTO> create(@Validated @RequestBody RatingDTO dto){
        if(dto.getId() != null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Rating r = ratingService.save(dtoToRating.convert(dto));
        return new ResponseEntity<>(ratingToDTO.convert(ratingService.save(r)), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<RatingDTO>> getAll(){
        List<Rating> r = ratingService.findAll();
        return new ResponseEntity<>(ratingToDTO.convert(r), HttpStatus.OK);
    }
    @GetMapping(value="/approve/{id}")
    public ResponseEntity<Void> approve(@PathVariable Long id){
        Optional<Rating> r = ratingService.findOne(id);
        Optional<User> u = userService.findOne(r.get().getUser().getId());
        emailSender.sendSimpleMessage("isaprojekat3@gmail.com", "You have recieved a new rating.", "User " + u.get().getFirstName()
                + " said: " + r.get().getDescription() + " and rated their stay with a: " + r.get().getRating());
        r.get().setApproved(true);
        ratingService.save(r.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping(value="/decline/{id}")
    public ResponseEntity<Void> decline(@PathVariable Long id){
        Optional<Rating> r = ratingService.findOne(id);
        r.get().setApproved(false);

        ratingService.save(r.get());
        return new ResponseEntity<>(HttpStatus.OK);

    }

}
