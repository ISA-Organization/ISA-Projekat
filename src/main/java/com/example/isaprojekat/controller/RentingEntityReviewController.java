package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.EntityReviewDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.DTOToEntityReview;
import com.example.isaprojekat.dto.mapper.EntityReviewToDTO;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.model.RentingEntityReview;
import com.example.isaprojekat.service.ClientService;
import com.example.isaprojekat.service.RentingEntityReviewService;
import com.example.isaprojekat.service.ReservationService;
import com.example.isaprojekat.service.impl.JpaEmailSender;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/reviews", produces = MediaType.APPLICATION_JSON_VALUE)
public class RentingEntityReviewController {
    @Autowired
    private RentingEntityReviewService service;
    @Autowired
    private DTOToEntityReview toEntityReview;
    @Autowired
    private ClientService clientService;
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private JpaEmailSender emailSender;
    @Autowired
    EntityReviewToDTO entityReviewToDTO;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> create(@Valid @RequestBody EntityReviewDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        RentingEntityReview saved = service.save(toEntityReview.convert(dto));

        return new ResponseEntity<>("ok", HttpStatus.CREATED);
    }
    @GetMapping()
    public ResponseEntity<List<EntityReviewDTO>> getAll(){
        List<RentingEntityReview> entityReviews = service.findAll();

        return new ResponseEntity<>(entityReviewToDTO.convert(entityReviews), HttpStatus.OK);
    }
    @GetMapping(value = "/approve/{id}")
    public ResponseEntity<Void> approve(@PathVariable Long id){
        var comment = service.findOne(id);
        var res = reservationService.findOne(comment.getReservation().getId());
        var client = clientService.findOne(res.get().getClient().getId());
        client.get().setPenaltyNum(client.get().getPenaltyNum() + 1);
        clientService.save(client.get());
        emailSender.sendSimpleMessage("isaprojekat3@gmail.com", "You have recieved a penalty", "Sorry" + comment.getContent());
        emailSender.sendSimpleMessage("isaprojekat3@gmail.com", "Your penalty has been accepted", "Swag");
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping(value = "/decline/{id}")
    public ResponseEntity<Void> decline(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
