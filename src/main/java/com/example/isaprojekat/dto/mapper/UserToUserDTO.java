package com.example.isaprojekat.dto.mapper;

import com.example.isaprojekat.dto.UserDTO;
import com.example.isaprojekat.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserToUserDTO{

    public UserDTO convert(User user) {
        UserDTO dto = new UserDTO();

        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setName(user.getFirstName());
        dto.setSurname(user.getSurname());
        dto.setAddress(user.getAddress());
        dto.setCity(user.getCity());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setType(user.getType().toString());
        dto.setApproved(user.getIs_approved());
        return dto;
    }

    public List<UserDTO> convert(List<User> users){
        List<UserDTO> userDTOs = new ArrayList<>();

        for(User u : users) {
            UserDTO dto = convert(u);
            userDTOs.add(dto);
        }

        return userDTOs;
    }

}
