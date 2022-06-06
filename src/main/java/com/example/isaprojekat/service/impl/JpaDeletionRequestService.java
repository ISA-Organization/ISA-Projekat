package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.DeletionRequest;
import com.example.isaprojekat.repository.DeletionRequestRepository;
import com.example.isaprojekat.service.DeletionRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Service;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;
import java.util.Optional;
@Service
public class JpaDeletionRequestService implements DeletionRequestService {

    @Autowired
    DeletionRequestRepository repository;
    @Override
    public Optional<DeletionRequest> findOne(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<DeletionRequest> findAll() {
        return repository.findAll();
    }

    @Override
    public DeletionRequest save(DeletionRequest deletionRequest) {
        return repository.save(deletionRequest);
    }

    @Override

    public Boolean delete(Long id) {
        repository.deleteById(id);
        return true;
    }
}
