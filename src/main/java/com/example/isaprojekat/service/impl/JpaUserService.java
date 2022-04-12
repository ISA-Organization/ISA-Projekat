package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.*;
import com.example.isaprojekat.repository.*;
import com.example.isaprojekat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JpaUserService implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private InstructorRepository instructorRepository;
    @Autowired
    private HouseOwnerRepository houseOwnerRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private BoatOwnerRepository boatOwnerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> findOne(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {

        return saveByUserType(user);
    }

    @Override
    public Boolean delete(Long id) {
        var deleted = deleteByUserType(id);
        if(!deleted){
            return false;
        }
        return true;
    }

    @Override
    public Optional<User> findbyEmail(String email) {
        return userRepository.findFirstByEmail(email);
    }

    private Boolean deleteByUserType(Long id) {
        switch (userRepository.findById(id).get().getType()) {
            case INSTRUCTOR:
                instructorRepository.deleteById(id);
                return  true;
            case ADMIN:
                adminRepository.deleteById(id);
                return  true;

            case CLIENT:
                clientRepository.deleteById(id);
                return  true;

            case BOAT_OWNER:
                boatOwnerRepository.deleteById(id);
                return  true;

            case HOUSE_OWNER:
                houseOwnerRepository.deleteById(id);
                return  true;
            default: return false;

        }
    }



    private User saveByUserType(User u){
        switch (u.getType()) {
            case INSTRUCTOR:
                Instructor instructor = new Instructor(u.getId(), u.getFirstName(), u.getSurname(), u.getAddress(),  u.getCity(),
                        u.getPhoneNumber(), u.getEmail(), u.getPassword(), u.getIs_approved(),  u.getType(), "debil");
                 return instructorRepository.save(instructor);
            case ADMIN:
                Admin admin = new Admin(u.getId(), u.getFirstName(), u.getSurname(), u.getAddress(),  u.getCity(),
                        u.getPhoneNumber(), u.getEmail(), u.getPassword(), u.getIs_approved());
                return adminRepository.save(admin);
            case CLIENT:
                Client client = new Client(u.getId(), u.getFirstName(), u.getSurname(), u.getAddress(),  u.getCity(),
                        u.getPhoneNumber(), u.getEmail(), u.getPassword(), u.getIs_approved());
                return clientRepository.save(client);
            case BOAT_OWNER:
                BoatOwner boatOwner = new BoatOwner(u.getId(), u.getFirstName(), u.getSurname(), u.getAddress(),  u.getCity(),
                        u.getPhoneNumber(), u.getEmail(), u.getPassword(), u.getIs_approved());
                return boatOwnerRepository.save(boatOwner);
            case HOUSE_OWNER:
                HouseOwner houseOwner = new HouseOwner(u.getId(), u.getFirstName(), u.getSurname(), u.getAddress(),  u.getCity(),
                        u.getPhoneNumber(), u.getEmail(), u.getPassword(), u.getIs_approved());
                return houseOwnerRepository.save(houseOwner);
            default: return null;
        }

    }
}