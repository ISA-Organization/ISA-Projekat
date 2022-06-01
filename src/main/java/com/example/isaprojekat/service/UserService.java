package com.example.isaprojekat.service;

import com.example.isaprojekat.dto.UserChangePasswordDTO;
import com.example.isaprojekat.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<User> findOne(Long id);

    List<User> findAll();

    User save(User user);

    Boolean delete(Long id);

    Optional<User> findbyEmail(String email);

    boolean changePassword(Long id, UserChangePasswordDTO userPasswordChangeDto);
}
