//package com.example.isaprojekat.dto.mapper;
//
//import com.example.isaprojekat.dto.HouseDTO;
//import com.example.isaprojekat.dto.UserDTO;
//import com.example.isaprojekat.model.House;
//import com.example.isaprojekat.model.User;
//import com.example.isaprojekat.model.UserType;
//import com.example.isaprojekat.service.HouseService;
//import com.example.isaprojekat.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.stereotype.Component;
//
//@Component
//public class HouseDTOToHouse {
//    @Autowired
//    private HouseService houseService;
//    @Autowired
//    private UserService userService;
//
//    public House convert(HouseDTO dto) {
//        House house = null;
//        if(dto.getId() != null) {
//            house = houseService.findOne(dto.getId()).get();
//        }
//
//        if(house == null) {
//            house = new House();
//        }
//
//        house.setHouseRules(dto.getHouseRules());
//        house.setAddress(dto.getAddress());
//        house.setAdditionalContent(dto.getAdditionalContent());
//        house.setName(dto.getName());
//        house.setDescription(dto.getDescription());
//        house.setId(dto.getId());
//        house.setPrice(dto.getPrice());
//        house.setNumberOfRooms(dto.getNumberOfRooms());
//        house.setNumberOfBeds(dto.getNumberOfBeds());
//        house.setOwner(userService.findOne(dto.getOwnerId()).get());
//
//        return house;
//    }
//}
