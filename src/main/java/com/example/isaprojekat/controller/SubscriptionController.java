package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.BoatDTO;
import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.model.Client;
import com.example.isaprojekat.model.Picture;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.service.ClientService;
import com.example.isaprojekat.service.RentingEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/subscriptions", produces = MediaType.APPLICATION_JSON_VALUE)
public class SubscriptionController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private RentingEntityService entityService;

    @PreAuthorize("hasAuthority('CLIENT')")
    @GetMapping("/{id}/{entityId}")
    public ResponseEntity<Client> subscribe(@PathVariable Long id, @PathVariable Long entityId){
        Optional<Client> client = clientService.findOne(id);
        Optional<RentingEntity> entity = entityService.findOne(entityId);

        client.get().getSubscriptions().add(entity.get());
        clientService.save(client.get());

        if(client.isPresent()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAuthority('CLIENT')")
    @DeleteMapping("/{id}/{entityId}")
    public ResponseEntity<Client> unsubscribe(@PathVariable Long id, @PathVariable Long entityId){
        Optional<Client> client = clientService.findOne(id);
        Optional<RentingEntity> entity = entityService.findOne(entityId);

        client.get().getSubscriptions().remove(entity.get());
        clientService.save(client.get());

        if(client.isPresent()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAuthority('CLIENT')")
    @GetMapping("/check/{id}/{entityId}")
    public ResponseEntity<Client> check(@PathVariable Long id, @PathVariable Long entityId){
        Optional<Client> client = clientService.findOne(id);
        Optional<RentingEntity> entity = entityService.findOne(entityId);

        if(client.get().getSubscriptions().contains(entity.get())) {
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
