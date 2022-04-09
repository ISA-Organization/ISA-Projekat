package com.example.isaprojekat.controller;


import com.example.isaprojekat.service.AdventureService;
import com.example.isaprojekat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/adventures", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdventureController {
    @Autowired
    UserService userService;
    @Autowired
    AdventureService adventureService;
}
