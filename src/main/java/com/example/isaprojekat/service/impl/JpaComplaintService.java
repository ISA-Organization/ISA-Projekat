package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Complaint;
import com.example.isaprojekat.repository.ComplaintRepository;
import com.example.isaprojekat.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JpaComplaintService implements ComplaintService {
    @Autowired
    ComplaintRepository complaintRepository;
    @Override
    public Optional<Complaint> findOne(Long id) {
        return complaintRepository.findById(id);
    }

    @Override
    public List<Complaint> findAll() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint save(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @Override
    public Boolean delete(Long id) {
        complaintRepository.deleteById(id);
        return true;
    }
}
