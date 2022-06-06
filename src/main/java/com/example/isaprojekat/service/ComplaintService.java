package com.example.isaprojekat.service;

import com.example.isaprojekat.model.Complaint;
import com.example.isaprojekat.model.DeletionRequest;

import java.util.List;
import java.util.Optional;

public interface ComplaintService {
    Optional<Complaint> findOne(Long id);

    List<Complaint> findAll();

    Complaint save(Complaint complaint);

    Boolean delete(Long id);
}
