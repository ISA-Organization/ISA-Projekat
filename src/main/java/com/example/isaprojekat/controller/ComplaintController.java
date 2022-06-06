package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.ComplaintDTO;
import com.example.isaprojekat.dto.mapper.ComplaintToDTO;
import com.example.isaprojekat.dto.mapper.DTOToComplaint;
import com.example.isaprojekat.model.Complaint;
import com.example.isaprojekat.model.Rating;
import com.example.isaprojekat.model.User;
import com.example.isaprojekat.service.ComplaintService;
import com.example.isaprojekat.service.RentingEntityService;
import com.example.isaprojekat.service.UserService;
import com.example.isaprojekat.service.impl.JpaEmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/complaints", produces = MediaType.APPLICATION_JSON_VALUE)
public class ComplaintController {
    @Autowired
    UserService userService;
    @Autowired
    RentingEntityService rentingEntityService;
    @Autowired
    ComplaintService complaintService;
    @Autowired
    ComplaintToDTO complaintToDTO;
    @Autowired
    DTOToComplaint dtoToComplaint;
    @Autowired
    JpaEmailSender emailSender;

    @PostMapping
    public ResponseEntity<ComplaintDTO> create(@Validated @RequestBody ComplaintDTO dto){
        if(dto.getId() != null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Complaint r = complaintService.save(dtoToComplaint.convert(dto));
        return new ResponseEntity<>(complaintToDTO.convert(complaintService.save(r)), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<ComplaintDTO>> getAll(){
        List<Complaint> r = complaintService.findAll();
        return new ResponseEntity<>(complaintToDTO.convert(r), HttpStatus.OK);
    }
    @PostMapping(value="/approve/{id}")
    public ResponseEntity<Void> approve(@PathVariable Long id, @RequestBody ComplaintDTO dto){
        Optional<Complaint> r = complaintService.findOne(id);
        Optional<User> u = userService.findOne(r.get().getUser().getId());
        emailSender.sendSimpleMessage("isaprojekat3@gmail.com", "You have recieved a new complaint.", "User " + u.get().getFirstName()
                + " said: " + r.get().getDescription());
        emailSender.sendSimpleMessage("isaprojekat3@gmail.com", "You have recieved a new complaint response.",dto.getResponse());
        r.get().setApproved(true);
        r.get().setResponse(dto.getResponse());
        complaintService.save(r.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    }









