package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Admin;
import com.example.isaprojekat.repository.AdminRepository;
import com.example.isaprojekat.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class JpaAdminService implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Optional<Admin> findOne(Long id) {
        return adminRepository.findById(id);
    }

    @Override
    public List<Admin> findAll() {
        return null;
    }

    @Override
    public Admin save(Admin admin) {
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        return null;
    }
}
