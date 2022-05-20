package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.Admin;
import com.example.isaprojekat.model.User;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    Optional<Admin> findOne(Long id);

    List<Admin> findAll();

    Admin save(Admin admin);

    Boolean delete(Long id);
}
