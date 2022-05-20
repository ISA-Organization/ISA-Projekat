package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.UserDTO;
import com.example.isaprojekat.model.User;
import com.example.isaprojekat.model.UserType;
import com.example.isaprojekat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserDTOToUser {

    @Autowired
    private UserService userService;

    public User convert(UserDTO dto) {
        User user = null;
        if(dto.getId() != null) {
            user = userService.findOne(dto.getId()).get();
        }

        if(user == null) {
            user = new User();
        }

        user.setEmail(dto.getEmail());
        user.setAddress(dto.getAddress());
        user.setCity(dto.getCity());
        user.setFirstName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setType(UserType.valueOf(dto.getType()));
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setIsApproved(dto.getApproved());
        return user;
    }
}
