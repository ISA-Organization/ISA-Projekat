package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.UserAuthenticationDTO;
import com.example.isaprojekat.dto.UserDTO;
import com.example.isaprojekat.dto.UserRegistrationDTO;
import com.example.isaprojekat.dto.mapper.UserDTOToUser;
import com.example.isaprojekat.dto.mapper.UserToUserDTO;
import com.example.isaprojekat.model.User;
import com.example.isaprojekat.model.UserType;
import com.example.isaprojekat.security.TokenUtils;
import com.example.isaprojekat.service.UserService;
import com.example.isaprojekat.service.impl.JpaEmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDTOToUser toUser;

    @Autowired
    private UserToUserDTO toUserDTO;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private JpaEmailSender emailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody @Validated UserRegistrationDTO dto){

        if(dto.getId() != null || !dto.getPassword().equals(dto.getConfirmPassword())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = toUser.convert(dto);
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        user.setPassword(encodedPassword);

        return new ResponseEntity<>(toUserDTO.convert(userService.save(user)), HttpStatus.CREATED);
    }



    @DeleteMapping(value="/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id){
        var isRemoved = userService.delete(id);
        if(!isRemoved){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(id,HttpStatus.OK);
    }

    @PutMapping(value = "approve/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> approveUser(@PathVariable Long id, @Valid @RequestBody UserDTO dto){
        if(!id.equals(dto.getId())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User user = toUser.convert(dto);

        if(user.getType().equals(UserType.HOUSE_OWNER) ||
           user.getType().equals(UserType.BOAT_OWNER)  ||
           user.getType().equals(UserType.INSTRUCTOR)) {

            emailSender.sendSimpleMessage(user.getEmail(), "Registracija", "Uspesno ste registrovani");
        }
        user.setIs_approved(true);
        return new ResponseEntity<>(toUserDTO.convert(userService.save(user)),HttpStatus.OK);
    }

    @PutMapping(value = "decline/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> approveUser(@PathVariable Long id, @Valid @RequestBody String declineReason){
        if(!userService.findOne(id).isPresent()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User user = userService.findOne(id).get();

        if(user.getType().equals(UserType.HOUSE_OWNER) ||
                user.getType().equals(UserType.BOAT_OWNER)  ||
                user.getType().equals(UserType.INSTRUCTOR)) {

            emailSender.sendSimpleMessage(user.getEmail(), "Registracija odbijena", declineReason);
        }
        user.setIs_approved(false);
        return new ResponseEntity<>(toUserDTO.convert(userService.save(user)),HttpStatus.OK);
    }


    @PutMapping(value= "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserDTO dto){

        if(!id.equals(dto.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = toUser.convert(dto);

        return new ResponseEntity<>(toUserDTO.convert(userService.save(user)),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> get(@PathVariable Long id){
        var loggedInUser = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(loggedInUser);
        Optional<User> user = userService.findOne(id);

        if(user.isPresent()) {
            return new ResponseEntity<>(toUserDTO.convert(user.get()), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




    @GetMapping
    public ResponseEntity<List<UserDTO>> get(){
        List<User> users = userService.findAll();
        return new ResponseEntity<>(toUserDTO.convert(users), HttpStatus.OK);
    }

    @PreAuthorize("permitAll()")
    @RequestMapping(path = "/auth", method = RequestMethod.POST)
    public ResponseEntity authenticateUser(@RequestBody UserAuthenticationDTO dto) {
        // Perform the authentication
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        try {
            // Reload user details so we can generate token
            UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getEmail());
            return ResponseEntity.ok(tokenUtils.generateToken(userDetails));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}