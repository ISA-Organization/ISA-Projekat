package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.AvailablePeriodDTO;
import com.example.isaprojekat.dto.DeletionRequestDTO;
import com.example.isaprojekat.dto.HouseDTO;
import com.example.isaprojekat.dto.mapper.DTOToDelReq;
import com.example.isaprojekat.dto.mapper.DelRequestToDTO;
import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.DeletionRequest;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.User;
import com.example.isaprojekat.service.DeletionRequestService;
import com.example.isaprojekat.service.UserService;
import com.example.isaprojekat.service.impl.JpaEmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/delete/request", produces = MediaType.APPLICATION_JSON_VALUE)
public class DeletionRequestController {

    @Autowired
    DeletionRequestService deletionRequestService;
     @Autowired
    JpaEmailSender emailSender;
     @Autowired
    UserService userService;
     @Autowired
    DTOToDelReq dtoToDelReq;
     @Autowired
    DelRequestToDTO delRequestToDTO;


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DeletionRequestDTO> create(@Valid @RequestBody DeletionRequestDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        var user = userService.findOne(dto.getUserId());

        var request = deletionRequestService.save(dtoToDelReq.convert(dto));
        request.setUser(user.get());
        request.setRequestedDate(new Date());
        return new ResponseEntity<>(delRequestToDTO.convert(deletionRequestService.save(request)), HttpStatus.CREATED);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DeletionRequestDTO>> getAll(){
       List<DeletionRequest> reqs = deletionRequestService.findAll();
       List<DeletionRequestDTO> dtos = delRequestToDTO.convert(reqs);
       return new ResponseEntity<>(dtos, HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/approve/{id}")
    public ResponseEntity<Void> approve(@PathVariable Long id){
       Optional<DeletionRequest> req = deletionRequestService.findOne(id);
       Optional<User> u = userService.findOne(req.get().getId());
       if(!req.isPresent() || !u.isPresent()){
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }

       userService.delete(u.get().getId());
       deletionRequestService.delete(req.get().getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/decline/{id}")
    public ResponseEntity<Void> decline(@Valid @RequestBody DeletionRequestDTO dto){
        Optional<DeletionRequest> req = deletionRequestService.findOne(dto.getId());
        Optional<User> u = userService.findOne(req.get().getId());
        if(!req.isPresent() || !u.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        req.get().setDenialReason(dto.getDenialReason());
        req.get().setReviewed(true);
        req.get().setDenied(true);
        deletionRequestService.delete(req.get().getId());

        emailSender.sendSimpleMessage("isaprojekat3@gmail.com", "Your deletionRequest has been denied", req.get().getDenialReason());

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
