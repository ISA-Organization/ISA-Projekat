package com.example.isaprojekat.service;

import com.example.isaprojekat.model.Client;
import com.example.isaprojekat.model.DeletionRequest;

import java.util.List;
import java.util.Optional;

public interface DeletionRequestService {
    Optional<DeletionRequest> findOne(Long id);

    List<DeletionRequest> findAll();

    DeletionRequest save(DeletionRequest deletionRequest);

    Boolean delete(Long id);

}
